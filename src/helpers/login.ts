import { gql } from '@apollo/client/core';
import { apolloClient } from "../utils/apollo-client";
import { argsBespokeInit } from '../utils/config';
import { getAddressFromSigner, signText } from '../utils/ethers.service';
import { prettyJSON } from '../utils/helpers';
import { getAuthenticationToken, setAuthenticationToken } from '../utils/state';

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`;

export const generateChallenge = (address: string) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

const authenticate = (address: string, signature: string) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

 const login = async (address = getAddressFromSigner()) => {
  if (getAuthenticationToken()) {
    console.log('login: already logged in');
    return;
  }

  console.log('login: address', address);

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address);

  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text);

  const accessTokens = await authenticate(address, signature);
  prettyJSON('login: result', accessTokens.data);

  setAuthenticationToken(accessTokens.data.authenticate.accessToken);

  return accessTokens.data;
};

export default login;

// login();

// (async () => {
//   if (argsBespokeInit()) {
//     await login();
//   }
// })();
