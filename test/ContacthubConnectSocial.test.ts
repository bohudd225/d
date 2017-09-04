import { Promise } from 'es6-promise';
import ContacthubConnectSocial from '../src/ContacthubConnectSocial';

const validOptions = {
  clientIds: { facebook: '123456', google: '123456', linkedin: '123456' },
  contacthub: () => {},
  autofillOptions: { fields: {} }
}

// tests for JS-runtime
describe('ContacthubConnectSocial class', () => {

  describe('Initialization', () => {

    it('should throw error if called without options', () => {
      expect(() => new ContacthubConnectSocial()).toThrow('"Social Autofill" must be initialized with some options')
    });

    it('should throw error if called with invalid clientIds', () => {
      const listOfInvalidClientIds = [
        undefined,
        null,
        ['123'],
        {
          gugol: '12324'
        },
        {
          facebook: 123
        },
        {
          linkedin: {}
        }
      ];

      listOfInvalidClientIds.forEach(clientIds => {
        expect(() => new ContacthubConnectSocial({ ...validOptions, clientIds })).toThrow()
      });
    });

    it('should not throw any error if called with correct options', () => {
      expect(() => new ContacthubConnectSocial(validOptions)).not.toThrow()
    });

  });

  describe('Public functions', () => {

    it('login functions should return a Promise', () => {
      const contacthubConnectSocial = new ContacthubConnectSocial(validOptions);

      expect(contacthubConnectSocial.loginWithFacebook() instanceof Promise).toBe(true);
      expect(contacthubConnectSocial.loginWithGoogle() instanceof Promise).toBe(true);
      expect(contacthubConnectSocial.loginWithLinkedIn() instanceof Promise).toBe(true);
    });

  });

});
