import * as t from 'tcomb';
import FbGraphApi from './facebook-api';
import { BaseProperties as CustomerBase, Social as CustomerSocial, Contacts as CustomerContacts, ContactHubSDKBrowser } from './contacthub-sdk-browser';

export type SocialNetworksClientIds = {
  facebook?: string,
  google?: string,
  linkedin?: string
}

export type SocialNetwork = keyof SocialNetworksClientIds

export type Fields = {
  firstName?: string,
  lastName?: string,
  dateOfBirth?: string,
  email?: string,
  gender?: string
}

export type Icons = {
  container: string
}

export type AutofillOptions = {
  icons?: Icons,
  fields: Fields
}

export type Scope = 'likes' | 'education_history' | 'work_history'

export type Options = {
  socialNetworks: {
    clientIds: SocialNetworksClientIds,
    scopes?: Scope[]
  },
  contacthub: ContactHubSDKBrowser,
  autofillOptions: AutofillOptions
}

// tcomb version of Options to validate at run-time
export const Options = t.interface({
  socialNetworks: t.interface({
    clientIds: t.interface({
      facebook: t.maybe(t.String),
      google: t.maybe(t.String),
      linkedin: t.maybe(t.String)
    }, { strict: true }),
    scopes: t.maybe(t.list(t.enums.of(['likes', 'education_history', 'work_history'])))
  }, { strict: true }),
  contacthub: t.Function,
  autofillOptions: t.interface({
    icons: t.maybe(t.interface({
      container: t.String
    })),
    fields: t.interface({
      firstName: t.maybe(t.String),
      lastName: t.maybe(t.String),
      dateOfBirth: t.maybe(t.String),
      email: t.maybe(t.String),
      gender: t.maybe(t.String)
    }, { strict: true })
  }, { strict: true })
}, { strict: true, name: '"ContacthubConnectSocial"' });

export type FacebookScope = 'email' | 'user_birthday' | 'user_likes' | 'user_education_history' | 'user_work_history'
export type GoogleScope = 'email' | 'birthday'

export type User = {
  base: CustomerBase & {
    contacts: CustomerContacts,
    socialProfile: CustomerSocial
  }
}

export interface HelloUser {
  first_name: string,
  last_name: string,
  name: string,
  picture: string,
  thumbnail: string,
  email: string
}

export type FacebookFields = 'id' | 'first_name' | 'last_name' | 'gender' | 'birthday' | 'link' | 'email' | 'education' | 'work';
export type FacebookUser = Pick<FbGraphApi.FbUser, FacebookFields> & HelloUser
export type FacebookLike = {
  created_time: string,
  id: string,
  name: string,
  pictures?: any[]
}

// copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gapi.plus/index.d.ts
// see https://developers.google.com/+/web/api/rest/latest/people for official docs from Google
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
    name?: string;
    department?: string;
    title?: string;
    type: 'school' | 'work';
    startDate?: string;
    endDate?: string;
    location?: string;
    description?: string;
    primary?: boolean;
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
  emailAddress: string,
  birthDate?: {
    day: number,
    month: number,
    year: number
  },
  educations?: {
    values: {
      id: number,
      activities?: never,
      degreeName?: never,
      endDate?: { year: number, month: number },
      startDate?: { year: number, month: number },
      fieldsOfStudy?: never,
      grade?: never,
      notes?: never,
      program?: never,
      richMediaAssociations?: never,
      school?: {
        name: string
      },
      schoolName?: never,
      isCurrent?: boolean
    }[]
  },
  positions?: {
    values: {
      id: number,
      company?: {
        id: number,
        name: string,
        industry: string
      },
      companyName?: never,
      description?: never,
      endDate?: { year: number, month: number },
      startDate?: { year: number, month: number },
      location?: never,
      locationName?: never,
      richMediaAssociations?: never,
      title?: string,
      isCurrent?: boolean
    }[]
  }

}
