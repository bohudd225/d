import { User } from '../src/models';
import { FormFiller } from '../src/autofill';

describe('FormFiller class', () => {

  it('"fillFormWithUserData" should fill the given fields with the relative user data', () => {
    const user: User = {
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
          google: '123',
          facebook: '456',
          linkedin: '789'
        }
      }
    }

    document.body.innerHTML = `
      <form class="ui form">
        <input id="firstName">
        <input id="lastName">
        <input id="gender">
        <input id="email">
        <input id="dateOfBirth">
      </form>`;

    const fields = {
      firstName: '#firstName',
      lastName: '#lastName',
      gender: '#gender',
      dateOfBirth: '#dateOfBirth',
      email: '#email'
    };

    const formFiller = new FormFiller(fields);

    formFiller.fillFormWithUserData(user);

    function getInputValueById(id: string): string {
      return (document.getElementById(id) as HTMLInputElement).value;
    }

    expect(getInputValueById('firstName')).toBe(user.base.firstName);
    expect(getInputValueById('lastName')).toBe(user.base.lastName);
    expect(getInputValueById('gender')).toBe(user.base.gender);
    expect(getInputValueById('email')).toBe(user.base.contacts.email);
    expect(getInputValueById('dateOfBirth')).toBe(user.base.dob);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

});
