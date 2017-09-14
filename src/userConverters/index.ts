import {
  FacebookUser,
  GoogleUser,
  LinkedInUser,
  User,
  Scope,
  FacebookLike
} from '../models';

function returnDateIfValid(date?: string) {
  return (date || '').length === 10 ? date : undefined;
}

export function getUserFromFacebookUser(facebookUser: FacebookUser, likes: FacebookLike[], scopes: Scope[]): User {
  const facebookEducations = facebookUser.education || [];
  const facebookJobs = facebookUser.work || [];

  const facebookEducationTypeToJobType = {
    'College': 'COLLEGE',
    'High School': 'HIGH_SCHOOL',
    'Secondary School': 'SECONDARY_SCHOOL',
    'Primary School': 'PRIMARY_SCHOOL'
  };

  // facebook formats the user's birthday as MM/DD/YYYY and we need YYYY-MM-DD
  const facebookBirthday = returnDateIfValid(facebookUser.birthday);
  const birthdayRegExp = /(\d\d)\/(\d\d)\/(\d\d\d\d)/;
  const [, month = null, day = null, year = null] = birthdayRegExp.exec(facebookBirthday || '') || [];

  return {
    base: {
      firstName: facebookUser.first_name,
      lastName: facebookUser.last_name,
      pictureUrl: facebookUser.picture,
      dob: year && month && day ? `${year}-${month}-${day}` : undefined,
      gender: facebookUser.gender,
      contacts: {
        email: facebookUser.email
      },
      socialProfile: {
        facebook: facebookUser.id
      },
      likes: scopes.indexOf('likes') >= 0 ?
        likes.map(l => ({
          id: l.id,
          name: l.name,
          createdTime: l.created_time
        })) :  undefined,
      jobs: scopes.indexOf('work_history') >= 0 ?
        facebookJobs.map(j => ({
          id: j.id,
          startDate: returnDateIfValid(j.start_date),
          endDate: returnDateIfValid(j.end_date),
          jobTitle: j.position ? j.position.name : undefined,
          companyName: j.employer ? j.employer.name : undefined
        })) : undefined,
      educations: scopes.indexOf('education_history') >= 0 ?
        facebookEducations.map(e => ({
          id: e.id,
          schoolName: e.school ? e.school.name : undefined,
          schoolType: e.type ? facebookEducationTypeToJobType[e.type] : undefined,
          schoolConcentration: e.concentration ? e.concentration[0].name : undefined,
          startYear: e.year && parseInt(e.year.name || '') ? parseInt(e.year.name || '') : undefined
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
      dob: returnDateIfValid(googleUser.birthday),
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
          startDate: returnDateIfValid(j.startDate),
          endDate: returnDateIfValid(j.endDate),
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

  // linkedin returns the user's birthday divided per year, month and day (all as numbers) and we need YYYY-MM-DD
  const { year, month, day }: { year?: number, month?: number, day?: number } = linkedInUser.birthDate || {};

  return {
    base: {
      firstName: linkedInUser.firstName,
      lastName: linkedInUser.lastName,
      pictureUrl: linkedInUser.pictureUrl,
      dob: year && month && day ?
        returnDateIfValid(`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`):
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
          companyIndustry: j.company ? j.company.industry : undefined,
          companyName: j.company ? j.company.name : undefined,
          isCurrent: j.isCurrent
        })) : undefined,
      educations: scopes.indexOf('education_history') >= 0 ?
        linkedInEducations.map(e => ({
          id: `${e.id}`,
          schoolName: e.school ? e.school.name : undefined,
          startYear: e.startDate ? e.startDate.year : undefined,
          endYear: e.endDate ? e.endDate.year : undefined,
          isCurrent: e.isCurrent
        })) : undefined
    }
  }
}
