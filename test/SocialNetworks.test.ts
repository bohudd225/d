import SocialNetworks from '../src/socialNetworks';

describe('SocialNetworks class', () => {

  it('"options.clientIds" should not be modified by hellojs in the constructor', () => {
    const clientIds = {
      facebook: 'facebook_client_id',
      google: 'google_client_id',
      linkedin: 'linkedin_client_id'
    };
    new SocialNetworks(clientIds);
    expect(clientIds).toEqual({
      facebook: 'facebook_client_id',
      google: 'google_client_id',
      linkedin: 'linkedin_client_id'
    });
  });

  it('"options.clientIds" should be accessible as "this.clientIds"', () => {
    const clientIds = {
      facebook: 'facebook_client_id',
      google: 'google_client_id',
      linkedin: 'linkedin_client_id'
    };
    const socialAutofill = new SocialNetworks(clientIds);
    expect(clientIds).toEqual(socialAutofill.clientIds);
  });

});
