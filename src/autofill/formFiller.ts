import { Fields, User } from '../models';

type FieldName = keyof Fields;

function getUserDataFromFieldName(fieldName: FieldName, user: User): string | undefined {
  switch (fieldName) {
    case 'firstName': return user.base.firstName
    case 'lastName': return user.base.lastName
    case 'email': return user.base.contacts.email
    case 'gender': return user.base.gender
    case 'dateOfBirth': return user.base.dob
  }
}

export default class FormFiller {

  fields: Fields

  constructor(fields: Fields) {
    this.fields = fields;
  }

  fillFormWithUserData(user: User): void {
    if (document.querySelector) {
      const fields = this.fields;
      const fieldNames = Object.keys(fields) as FieldName[];

      fieldNames.forEach(fieldName => {
        const userData = getUserDataFromFieldName(fieldName, user);

        if (userData) {
          const fieldSelector = fields[fieldName]!;
          const element = document.querySelector(fieldSelector) as (HTMLInputElement | null);

          if (element && typeof element !== 'undefined') {
            element.value = userData;
          } else {
            console.error(`ContacthubConnectSocial: the element "${fieldSelector}" cannot be filled automatically because it is not a valid text field`);
          }
        }
      });
    }
  }

}
