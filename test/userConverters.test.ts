import { FacebookUser, GoogleUser, LinkedInUser, User, Scope, FacebookLike } from '../src/models';
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
    },
    jobs: [], // added in each test
    educations: [] // added in each test
  }
}

const scopes: Scope[] = ['likes', 'education_history', 'work_history'];

describe('converters from API user to internal "User" structure', () => {

  it('getUserFromFacebookUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        socialProfile: {
          facebook: '123456789'
        },
        jobs: [{
          id: '123',
          startDate: '2014-01-01',
          endDate: '2020-12-31',
          companyName: 'buildo',
          jobTitle: 'software engineer'
        }],
        educations: [{
          id: '123',
          startYear: 2010,
          schoolName: 'Politecnico di Milano',
          schoolType: 'COLLEGE'
        }],
        likes: [{
          id: '412389755573215',
          name: 'buildo',
          createdTime: '2015-03-12T23:13:37+0000'
        }]
      }
    };

    const facebookUser: Partial<FacebookUser> = {
      id: user.base.socialProfile.facebook,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: '06/04/1991',
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email,
      education: [{
        id: '123',
        school: {
          id: '345',
          name: 'Politecnico di Milano'
        },
        type: 'College',
        year: {
          id: '345',
          name: '2010'
        }
      }],
      work: [{
        employer: {
          id: '345',
          name: 'buildo'
        },
        position: {
          id: '345',
          name: 'software engineer'
        },
        start_date: '2014-01-01',
        end_date: '2020-12-31',
        id: '123'
      }]
    };

    const likes: FacebookLike[] = [{
      id: '412389755573215',
      name: 'buildo',
      created_time: '2015-03-12T23:13:37+0000'
    }]

    // with all scopes
    expect(getUserFromFacebookUser(facebookUser as FacebookUser, likes, scopes)).toEqual(user);

    // without any additional scope
    expect(getUserFromFacebookUser(facebookUser as FacebookUser, likes, [])).toEqual({
      ...user,
      base: {
        ...user.base,
        jobs: undefined,
        educations: undefined,
        likes: undefined
      }
    });
  });

  it('getUserFromGoogleUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        socialProfile: {
          google: '123456789'
        },
        jobs: [{
          id: '123',
          startDate: '2014-01-01',
          endDate: '2020-12-31',
          companyName: 'buildo',
          isCurrent: true,
          jobTitle: 'software engineer'
        }],
        educations: [{
          id: '123',
          isCurrent: false,
          schoolName: 'Politecnico di Milano'
        }]
      }
    };

    const googleUser: Partial<GoogleUser> = {
      id: user.base.socialProfile.google,
      first_name: user.base.firstName,
      last_name: user.base.lastName,
      birthday: user.base.dob,
      picture: user.base.pictureUrl,
      gender: user.base.gender,
      email: user.base.contacts.email,
      organizations: [{
        type: 'work',
        startDate: '2014-01-01',
        endDate: '2020-12-31',
        name: 'buildo',
        primary: true,
        title: 'software engineer'
      }, {
        name: 'Politecnico di Milano',
        type: 'school',
        primary: false
      }]
    };

    const convertedUser = getUserFromGoogleUser(googleUser as GoogleUser, scopes);

    // with all scopes
    expect({
      ...convertedUser,
      base: {
        ...convertedUser.base,
        jobs: convertedUser.base.jobs.map(j => ({ ...j, id: '123' })),
        educations: convertedUser.base.educations.map(e => ({ ...e, id: '123' }))
      }
    }).toEqual(user);

    // without any additional scope
    expect(getUserFromGoogleUser(googleUser as GoogleUser, [])).toEqual({
      ...user,
      base: {
        ...user.base,
        jobs: undefined,
        educations: undefined
      }
    });
  });

  it('getUserFromLinkedInUser', () => {
    const user: User = {
      ...internalUser,
      base: {
        ...internalUser.base,
        gender: undefined, // "gender" does not exist in LinkedInUser
        socialProfile: {
          linkedin: '123456789'
        },
        jobs: [{
          id: '123',
          companyIndustry: 'Computer Software',
          companyName: 'buildo',
          isCurrent: true,
          jobTitle: 'software engineer'
        }],
        educations: [{
          id: '123',
          startYear: 2010,
          endYear: 2015,
          schoolName: 'Politecnico di Milano',
          isCurrent: false
        }]
      }
    };

    const linkedInUser: Partial<LinkedInUser> = {
      id: user.base.socialProfile.linkedin,
      firstName: user.base.firstName,
      lastName: user.base.lastName,
      birthDate: {
        year: 1991,
        month: 6,
        day: 4
      },
      // "gender" does not exist in LinkedInUser
      pictureUrl: user.base.pictureUrl,
      emailAddress: user.base.contacts.email,
      positions: {
        values: [{
          company: {
            id: 5384763,
            industry: 'Computer Software',
            name: 'buildo'
          },
          id: 123,
          isCurrent: true,
          startDate: {
            month: 9,
            year: 2014
          },
          title: 'software engineer'
        }]
      },
      educations: {
        values: [{
          id: 123,
          startDate: {
            month: 9,
            year: 2010
          },
          endDate: {
            month: 7,
            year: 2015
          },
          school: {
            name: 'Politecnico di Milano'
          },
          isCurrent: false
        }]
      }
    };

    // with all scopes
    expect(getUserFromLinkedInUser(linkedInUser as LinkedInUser, scopes)).toEqual(user);

    // without any additional scope
    expect(getUserFromLinkedInUser(linkedInUser as LinkedInUser, [])).toEqual({
      ...user,
      base: {
        ...user.base,
        jobs: undefined,
        educations: undefined
      }
    });
  });

});
