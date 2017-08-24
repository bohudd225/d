const SocialAutofill = require('../src');

describe('Initialization', () => {

  it('throw error if called without options', () => {
    expect(() => SocialAutofill()).toThrow('"Social Autofill" must be initialized with some options')
  });

  it('don\' throw any error if called with correct options', () => {
    expect(() => SocialAutofill({ socialNetworksAppIds: {}, form: { fields: {} } })).not.toThrow()
  });

});
