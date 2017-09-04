import { FacebookUser, GoogleUser, LinkedInUser, User } from '../src/models';
import { getUserFromFacebookUser, getUserFromGoogleUser, getUserFromLinkedInUser } from '../src/userConverters';

const internalUser: User = {
  base: {
    firstName: 'Mario',
    lastName: 'Rossi',
    pictureUrl: 'https://mariorossi.com/picture.png',
    dob: '1991-06-04',
    gender: 'male',
    contacts: {
      email: 'mariorossi@gmail.com'
    },
    socialProfile: {
      // added in each test
    }
  }
}

describe('converters from API user to internal "User" structure', () => {

  it('getUserFromFacebookUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        socialProfile: {
          facebook: '123456789'
        }
      }
    };

    const facebookUser: Partial<FacebookUser> = {
      id: user.base.socialProfile.facebook,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: user.base.dob,
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email,
    };

    expect(getUserFromFacebookUser(facebookUser as FacebookUser)).toEqual(user);
  });

  it('getUserFromGoogleUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        socialProfile: {
          google: '123456789'
        }
      }
    };

    const googleUser: Partial<GoogleUser> = {
      id: user.base.socialProfile.google,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: user.base.dob,
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email
    };

    expect(getUserFromGoogleUser(googleUser as GoogleUser)).toEqual(user);
  });

  it('getUserFromLinkedInUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        dob: undefined, // "birthday" does not exist in LinkedInUser
        gender: undefined, // "gender" does not exist in LinkedInUser
        socialProfile: {
          linkedin: '123456789'
        }
      }
    };

    const linkedInUser: Partial<LinkedInUser> = {
      id: user.base.socialProfile.linkedin,
      firstName: user.base.firstName,
      lastName: user.base.lastName,
      // "birthday" does not exist in LinkedInUser
      // "gender" does not exist in LinkedInUser
      pictureUrl: user.base.pictureUrl,
      emailAddress: user.base.contacts.email,
    };

    expect(getUserFromLinkedInUser(linkedInUser as LinkedInUser)).toEqual(user);
  });

});
