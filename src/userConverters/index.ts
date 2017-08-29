import {
  FacebookUser,
  GoogleUser,
  LinkedInUser,
  User
} from '../models';

export function getUserFromFacebookUser(facebookUser: FacebookUser): User {
  return {
    id: facebookUser.id,
    base: {
      firstName: facebookUser.first_name,
      lastName: facebookUser.last_name,
      pictureUrl: facebookUser.picture,
      dob: facebookUser.birthday,
      gender: facebookUser.gender,
      socialProfile: {
        facebook: facebookUser.link
      }
    }
  }
}

export function getUserFromGoogleUser(googleUser: GoogleUser): User {
  return {
    id: googleUser.id,
    base: {
      firstName: googleUser.first_name,
      lastName: googleUser.last_name,
      pictureUrl: googleUser.picture,
      dob: googleUser.birthday,
      gender: googleUser.gender,
      socialProfile: {
        google: googleUser.url
      }
    }
  }
}

export function getUserFromLinkedInUser(linkedInUser: LinkedInUser): User {
  return {
    id: linkedInUser.id,
    base: {
      firstName: linkedInUser.firstName,
      lastName: linkedInUser.lastName,
      pictureUrl: linkedInUser.pictureUrl,
      dob: undefined, // not exposed by LinkedIn API
      gender: undefined, // not exposed by LinkedIn API
      socialProfile: {
        linkedin: linkedInUser.publicProfileUrl
      }
    }
  }
}
