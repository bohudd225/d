const SocialAutofill = require('../src');

describe('Initialization', () => {

  it('throw error if called without options', () => {

    expect(() => new SocialAutofill()).toThrow('"Social Autofill" must be initialized with some options')
  });

  it('don\'t throw any error if called with correct options', () => {
    expect(() => new SocialAutofill({ clientIds: { facebook: '123456' }, form: { fields: {} } })).not.toThrow()
  });

});
