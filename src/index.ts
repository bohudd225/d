import form from './form';
import SocialNetworks from './socialNetworks';
import { Options } from './models';

class SocialAutofill {
  
  SocialNetworks: SocialNetworks

  constructor(options: Options) {
    if (typeof options === 'undefined') {
      throw new Error('"Social Autofill" must be initialized with some options');
    }
    this.SocialNetworks = new SocialNetworks(options.socialNetworksClientIds);
    form(options.form);
  }

  loginWithFacebook() {
    this.SocialNetworks.loginWithFacebook();
  }

  loginWithGoogle() {
    this.SocialNetworks.loginWithGoogle();
  }

  loginWithLinkedIn() {
    this.SocialNetworks.loginWithLinkedIn();
  }
}

module.exports = SocialAutofill;
