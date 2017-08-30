import SocialAutofill from '../src/SocialAutofill';

const validOptions = {
  clientIds: { facebook: '123456' },
  contacthub: () => {},
  form: { fields: {} }
}

// tests for JS-runtime
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
