import FbGraphApi from './facebook-api';
import { CustomerData, ContactHubSDKBrowser } from './contacthub-sdk-browser';

export type SocialNetworksClientIds = {
  facebook?: string,
  google?: string,
  linkedin?: string
}

export type SocialNetworks = keyof SocialNetworksClientIds

export type FormOptions = {
  fields: {
    firstName?: string,
    lastName?: string,
    dateOfBirth?: string
  }
}

export type Options = {
  clientIds: SocialNetworksClientIds,
  contacthub: ContactHubSDKBrowser,
  form: FormOptions
}

export type User = CustomerData;

export interface HelloUser {
  first_name: string,
  last_name: string,
  name: string,
  picture: string,
  thumbnail: string,
  email: string
}

export type FacebookFields = 'id' | 'first_name' | 'last_name' | 'gender' | 'birthday' | 'link' | 'email';
export type FacebookUser = Pick<FbGraphApi.FbUser, FacebookFields> & HelloUser

// copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gapi.plus/index.d.ts
export interface GoogleUser extends HelloUser {
  kind: 'plus#person';
  etag: string;
  nickname: string;
  occupation: string;
  skills: string;
  birthday: string;
  gender: string;
  emails: {
    value: string;
    type: string;
  }[];
  urls: {
    value: string;
    type: string;
    label: string;
  }[];
  objectType: string;
  id: string;
  displayName: string;
  /* overwritten by hellojs (see HelloUser['name'] type) */
  // name: {
  //   formatted: string;
  //   familyName: string;
  //   givenName: string;
  //   middleName: string;
  //   honorificPrefix: string;
  //   honorificSuffix: string;
  // };
  tagline: string;
  braggingRights: string;
  aboutMe: string;
  relationshipStatus: string;
  url: string;
  image: {
    url: string;
  };
  organizations: {
    name: string;
    department: string;
    title: string;
    type: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string;
    primary: boolean;
  }[];
  placesLived: {
    value: string;
    primary: boolean;
  }[];
  isPlusUser: boolean;
  language: string;
  ageRange: {
    min: number;
    max: number;
  };
  plusOneCount: number;
  circledByCount: number;
  verified: boolean;
  cover: {
    layout: string;
    coverPhoto: {
      url: string;
      height: number;
      width: number;
    };
    coverInfo: {
      topImageOffset: number;
      leftImageOffset: number;
    }
  };
  domain: string;
}

/*
  cherry-picked the keys we use from docs here: https://developer.linkedin.com/docs/fields/basic-profile
  note: linkedin sdk (apparently) converts each key to camelCase
*/
export type LinkedInUser = {
  id: string,
  firstName: string,
  lastName: string,
  formattedName: string,
  pictureUrl: string,
  publicProfileUrl: string,
  emailAddress: string
}
