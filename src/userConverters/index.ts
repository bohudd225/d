import {
  FacebookUser,
  GoogleUser,
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
