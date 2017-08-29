import form from './form';
import SocialNetworks from './socialNetworks';
import { Options, ContactHubSDKBrowser, User } from './models';

export default class SocialAutofill {

  socialNetworks: SocialNetworks
  contacthub: ContactHubSDKBrowser

  constructor(options: Options) {
    if (typeof options === 'undefined') {
      throw new Error('"Social Autofill" must be initialized with some options');
    }
    this.socialNetworks = new SocialNetworks(options.clientIds);
    this.contacthub = options.contacthub;
    form(options.form);
  }

  sendUserToContactHub = (user: User) => this.contacthub('customer', user)

  loginWithFacebook() {
    this.socialNetworks.loginWithFacebook().then(this.sendUserToContactHub);
  }

  loginWithGoogle() {
    this.socialNetworks.loginWithGoogle().then(this.sendUserToContactHub);
  }

  loginWithLinkedIn() {
    this.socialNetworks.loginWithLinkedIn().then(this.sendUserToContactHub);
  }
}
