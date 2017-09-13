import {
  FacebookUser,
  GoogleUser,
  LinkedInUser,
  User,
  Scope
} from '../models';

export function getUserFromFacebookUser(facebookUser: FacebookUser): User {
  return {
    base: {
      firstName: facebookUser.first_name,
      lastName: facebookUser.last_name,
      pictureUrl: facebookUser.picture,
      dob: facebookUser.birthday,
      gender: facebookUser.gender,
      contacts: {
        email: facebookUser.email
      },
      socialProfile: {
        facebook: facebookUser.id
      }
    }
  }
}

export function getUserFromGoogleUser(googleUser: GoogleUser, scopes: Scope[]): User {
  const { organizations = [] } = googleUser;
  const googleEducations = organizations.filter(o => o.type === 'school');
  const googleJobs = organizations.filter(o => o.type === 'work');

  return {
    base: {
      firstName: googleUser.first_name,
      lastName: googleUser.last_name,
      pictureUrl: googleUser.picture,
      dob: googleUser.birthday,
      gender: googleUser.gender,
      contacts: {
        email: googleUser.email
      },
      socialProfile: {
        google: googleUser.id
      },
      jobs: scopes.indexOf('education_history') >= 0 ?
        googleJobs.map(j => ({
          id: `${Math.random()}`,
          startDate: j.startDate,
          endDate: j.endDate,
          isCurrent: j.primary,
          jobTitle: j.title,
          companyName: j.name
        })) : undefined,
      educations: scopes.indexOf('work_history') >= 0 ?
        googleEducations.map(e => ({
          id: `${Math.random()}`,
          schoolName: e.name,
          isCurrent: e.primary
        })) : undefined
    }
  }
}

export function getUserFromLinkedInUser(linkedInUser: LinkedInUser): User {
  return {
    base: {
      firstName: linkedInUser.firstName,
      lastName: linkedInUser.lastName,
      pictureUrl: linkedInUser.pictureUrl,
      dob: linkedInUser.birthDate ?
        `${linkedInUser.birthDate.year}-${linkedInUser.birthDate.month}-${linkedInUser.birthDate.day}` :
        undefined,
      gender: undefined, // not exposed by LinkedIn API
      contacts: {
        email: linkedInUser.emailAddress
      },
      socialProfile: {
        linkedin: linkedInUser.id
      }
    }
  }
}
