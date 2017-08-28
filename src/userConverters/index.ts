import {
  FacebookUser,
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
