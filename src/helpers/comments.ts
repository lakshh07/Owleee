import { gql } from '@apollo/client/core';
import { BigNumber, utils } from 'ethers';
import { apolloClient } from '../utils/apollo-client';
import login from './login';
import { PROFILE_ID } from '../utils/config';
import { getAddressFromSigner, signedTypeData, splitSignature } from '../utils/ethers.service';
import { pollUntilIndexed } from '../utils/indexer/has-transaction-been-indexed';
import { uploadIpfs } from '../utils/ipfs';
import { lensHub } from '../utils/lens-hub';
import { enabledCurrencies } from '../utils/module/enabled-modules-currencies';

const CREATE_COMMENT_TYPED_DATA = `
  mutation($request: CreatePublicCommentRequest!) { 
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        contentURI
        collectModule
        collectModuleData
        referenceModule
        referenceModuleData
      }
     }
   }
 }
`;

// TODO types
const createCommentTypedData = (createCommentTypedDataRequest: any) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest,
    },
  });
};

export const createComment = async () => {
  const profileId = PROFILE_ID;
  if (!profileId) {
    throw new Error('Must define PROFILE_ID in the .env to run this');
  }

  const address = getAddressFromSigner();
  console.log('create comment: address', address);

  await login(address);

  const currencies = await enabledCurrencies();

  const ipfsResult = await uploadIpfs("d","d");
  console.log('create comment: ipfs result', ipfsResult);

  // hard coded to make the code example clear
  const createCommentRequest = {
    profileId,
    // remember it has to be indexed and follow metadata standards to be traceable!
    publicationId: `0x13-0x3e`,
    contentURI: 'ipfs://' + ipfsResult.path,
    collectModule: {
      // timedFeeCollectModule: {
      //   amount: {
      //     currency: currencies.enabledModuleCurrencies.map((c: any) => c.address)[0],
      //     value: '0.01',
      //   },
      //   recipient: address,
      //   referralFee: 10.5,
      // },
      revertCollectModule: true,
    },
    referenceModule: {
      followerOnlyReferenceModule: false,
    },
  };

  const result = await createCommentTypedData(createCommentRequest);
  console.log('create comment: createCommentTypedData', result);

  const typedData = result.data.createCommentTypedData.typedData;
  console.log('create comment: typedData', typedData);

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  console.log('create comment: signature', signature);

  const { v, r, s } = splitSignature(signature);

  const tx = await lensHub.commentWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log('create comment: tx hash', tx.hash);

  console.log('create comment: poll until indexed');
  const indexedResult = await pollUntilIndexed(tx.hash);

  console.log('create comment: profile has been indexed', result);

  const logs = indexedResult.txReceipt.logs;

  console.log('create comment: logs', logs);

  const topicId = utils.id(
    'CommentCreated(uint256,uint256,string,uint256,uint256,address,bytes,address,bytes,uint256)'
  );
  console.log('topicid we care about', topicId);

  const profileCreatedLog = logs.find((l: any) => l.topics[0] === topicId);
  console.log('create comment: created log', profileCreatedLog);

  let profileCreatedEventLog = profileCreatedLog.topics;
  console.log('create comment: created event logs', profileCreatedEventLog);

  const publicationId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[2])[0];

  console.log(
    'create comment: contract publication id',
    BigNumber.from(publicationId).toHexString()
  );
  console.log(
    'create comment: internal publication id',
    profileId + '-' + BigNumber.from(publicationId).toHexString()
  );

  return result.data;
};

(async () => {
  await createComment();
})();
