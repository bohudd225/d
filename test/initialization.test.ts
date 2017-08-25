import SocialAutofill from '../src/SocialAutofill';

describe('Initialization', () => {

  it('should throw error if called without options', () => {
    // test for JS-runtime
    expect(() => new SocialAutofill()).toThrow('"Social Autofill" must be initialized with some options')
  });

  it('should not throw any error if called with correct options', () => {
    expect(() => new SocialAutofill({ clientIds: { facebook: '123456' }, form: { fields: {} } })).not.toThrow()
  });

});
