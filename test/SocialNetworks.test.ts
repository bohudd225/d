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

  it('loginWithFacebook should return a rejected Promise if the required clientId is invalid', () => new Promise((resolve, reject) => {
    const expectedError = 'The provided client id for Facebook is invalid';
    const socialAutofill = new SocialNetworks({});

    socialAutofill.loginWithFacebook()
      .then(() => reject())
      .catch((e) => {
        if (e === expectedError) {
          resolve();
        } else {
          reject(`${e} !== ${expectedError}`);
        }
      });
  }));

  it('loginWithGoogle should return a rejected Promise if the required clientId is invalid', () => new Promise((resolve, reject) => {
    const expectedError = 'The provided client id for Google is invalid';
    const socialAutofill = new SocialNetworks({});

    socialAutofill.loginWithGoogle()
      .then(() => reject())
      .catch((e) => {
        if (e === expectedError) {
          resolve();
        } else {
          reject(`${e} !== ${expectedError}`);
        }
      });
  }));

  it('loginWithLinkedIn should return a rejected Promise if the required clientId is invalid', () => new Promise((resolve, reject) => {
    const expectedError = 'The provided client id for LinkedIn is invalid';
    const socialAutofill = new SocialNetworks({});

    socialAutofill.loginWithLinkedIn()
      .then(() => reject())
      .catch((e) => {
        if (e === expectedError) {
          resolve();
        } else {
          reject(`${e} !== ${expectedError}`);
        }
      });
  }));

});
