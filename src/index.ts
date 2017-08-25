import form from './form';
import SocialNetworks from './socialNetworks';
import { Options } from './models';

class SocialAutofill {
  
  socialNetworks: SocialNetworks

  constructor(options: Options) {
    if (typeof options === 'undefined') {
      throw new Error('"Social Autofill" must be initialized with some options');
    }
    this.socialNetworks = new SocialNetworks(options.clientIds);
    form(options.form);
  }

  loginWithFacebook() {
    this.socialNetworks.loginWithFacebook();
  }

  loginWithGoogle() {
    this.socialNetworks.loginWithGoogle();
  }

  loginWithLinkedIn() {
    this.socialNetworks.loginWithLinkedIn();
  }
}

module.exports = SocialAutofill;
