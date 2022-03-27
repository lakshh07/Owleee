import { gql } from '@apollo/client/core';
import { apolloClient } from '../utils/apollo-client';
import login from './login';
import { PROFILE_ID } from '../utils/config';
import { getAddressFromSigner } from '../utils/ethers.service';

const UPDATE_PROFILE = `
  mutation($request: UpdateProfileRequest!) { 
    updateProfile(request: $request) {
      id
  }
 }
`;

// TODO sort types!
const updateProfileRequest = (profileInfo: any) => {
  return apolloClient.mutate({
    mutation: gql(UPDATE_PROFILE),
    variables: {
      request: profileInfo,
    },
  });
};

export const updateProfile = async (name:string, bio:string, profilePic: string, coverPic: string, setChecker: any) => {
  const profileId = PROFILE_ID;
  if (!profileId) {
    throw new Error('Must define PROFILE_ID in the .env to run this');
  }

  const address = getAddressFromSigner();
  console.log('update profile: address', address);

  await login(address);

  await updateProfileRequest({
    profileId,
    name: name,
    bio: bio,
    location: 'UK',
    website: null,
    twitterUrl: profilePic,
    coverPicture: coverPic,
  });

  setChecker(true);

  // await profiles({ profileIds: [profileId] });
};
