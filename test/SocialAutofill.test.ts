import { Promise } from 'es6-promise';
import SocialAutofill from '../src/SocialAutofill';

const validOptions = {
  clientIds: { facebook: '123456', google: '123456', linkedin: '123456' },
  contacthub: () => {},
  autofillOptions: { fields: {} }
}

// tests for JS-runtime
describe('SocialAutofill class', () => {

  describe('Initialization', () => {

    it('should throw error if called without options', () => {
      expect(() => new SocialAutofill()).toThrow('"Social Autofill" must be initialized with some options')
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
        expect(() => new SocialAutofill({ ...validOptions, clientIds })).toThrow()
      });
    });

    it('should not throw any error if called with correct options', () => {
      expect(() => new SocialAutofill(validOptions)).not.toThrow()
    });

  });

  describe('Public functions', () => {

    it('login functions should return a Promise', () => {
      const socialAutofill = new SocialAutofill(validOptions);

      expect(socialAutofill.loginWithFacebook() instanceof Promise).toBe(true);
      expect(socialAutofill.loginWithGoogle() instanceof Promise).toBe(true);
      expect(socialAutofill.loginWithLinkedIn() instanceof Promise).toBe(true);
    });

  });

});
