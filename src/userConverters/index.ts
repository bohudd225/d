import {
  FacebookUser,
  GoogleUser,
  LinkedInUser,
  User,
  Scope
} from '../models';

export function getUserFromFacebookUser(facebookUser: FacebookUser, scopes: Scope[]): User {
  const facebookEducations = facebookUser.education || [];
  const facebookJobs = facebookUser.work || [];

  const facebookEducationTypeToJobType = {
    'College': 'COLLEGE',
    'High School': 'HIGH_SCHOOL',
    'Secondary School': 'SECONDARY_SCHOOL',
    'Primary School': 'PRIMARY_SCHOOL'
  };

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
      },
      jobs: scopes.indexOf('work_history') >= 0 ?
        facebookJobs.map(j => ({
          id: j.id,
          startDate: j.start_date,
          endDate: j.end_date,
          jobTitle: j.position ? j.position.name : undefined,
          companyName: j.employer ? j.employer.name : undefined
        })) : undefined,
      educations: scopes.indexOf('education_history') >= 0 ?
        facebookEducations.map(e => ({
          id: `${Math.random()}`,
          schoolName: e.school ? e.school.name : undefined,
          schoolType: e.type ? facebookEducationTypeToJobType[e.type] : undefined,
          schoolConcentration: e.concentration ? e.concentration[0].name : undefined,
          startYear: e.year && parseInt(e.year.name) ? parseInt(e.year.name) : undefined
        })) : undefined
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
      jobs: scopes.indexOf('work_history') >= 0 ?
        googleJobs.map(j => ({
          id: `${Math.random()}`,
          startDate: j.startDate,
          endDate: j.endDate,
          isCurrent: j.primary,
          jobTitle: j.title,
          companyName: j.name
        })) : undefined,
      educations: scopes.indexOf('education_history') >= 0 ?
        googleEducations.map(e => ({
          id: `${Math.random()}`,
          schoolName: e.name,
          isCurrent: e.primary
        })) : undefined
    }
  }
}

export function getUserFromLinkedInUser(linkedInUser: LinkedInUser, scopes: Scope[]): User {
  const linkedInEducations = linkedInUser.educations && linkedInUser.educations.values || [];
  const linkedInJobs = linkedInUser.positions && linkedInUser.positions.values || [];

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
      },
      jobs: scopes.indexOf('work_history') >= 0 ?
        linkedInJobs.map(j => ({
          id: `${j.id}`,
          jobTitle: j.title,
          companyName: j.company ? j.company.name : undefined,
          isCurrent: j.isCurrent
        })) : undefined,
      educations: scopes.indexOf('education_history') >= 0 ?
        linkedInEducations.map(e => ({
          id: `${e.id}`,
          schoolName: e.school ? e.school.name : undefined,
          startYear: e.startMonthYear ? e.startMonthYear.year : undefined,
          endYear: e.endMonthYear ? e.endMonthYear.year : undefined,
          isCurrent: e.isCurrent
        })) : undefined
    }
  }
}
