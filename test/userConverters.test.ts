import { FacebookUser, GoogleUser, LinkedInUser, User } from '../src/models';
import { getUserFromFacebookUser, getUserFromGoogleUser, getUserFromLinkedInUser } from '../src/userConverters';

const internalUser: User = {
  externalId: '123456789',
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
          facebook: 'https://facebook.com/mariorossi'
        }
      }
    };

    const facebookUser: Partial<FacebookUser> = {
      id: user.externalId,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: user.base.dob,
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email,
      link: user.base.socialProfile.facebook
    };

    expect(getUserFromFacebookUser(facebookUser as FacebookUser)).toEqual(user);
  });

  it('getUserFromGoogleUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        socialProfile: {
          google: 'https://google.com/mariorossi'
        }
      }
    };

    const googleUser: Partial<GoogleUser> = {
      id: user.externalId,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: user.base.dob,
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email,
      url: user.base.socialProfile.google
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
          linkedin: 'https://google.com/mariorossi'
        }
      }
    };

    const linkedInUser: Partial<LinkedInUser> = {
      id: user.externalId,
      firstName: user.base.firstName,
      lastName: user.base.lastName,
      // "birthday" does not exist in LinkedInUser
      // "gender" does not exist in LinkedInUser
      pictureUrl: user.base.pictureUrl,
      emailAddress: user.base.contacts.email,
      publicProfileUrl: user.base.socialProfile.linkedin
    };

    expect(getUserFromLinkedInUser(linkedInUser as LinkedInUser)).toEqual(user);
  });

});
