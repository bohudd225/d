import { Promise } from 'es6-promise';
import { FormFiller } from './form';
import SocialNetworks from './socialNetworks';
import { Options, ContactHubSDKBrowser, User } from './models';

export default class SocialAutofill {

  socialNetworks: SocialNetworks
  contacthub: ContactHubSDKBrowser
  formFiller: FormFiller

  constructor(options: Options) {
    if (typeof options === 'undefined') {
      throw new Error('"Social Autofill" must be initialized with some options');
    }

    // fully validate "options" with tcomb
    Options(options as any);

    this.socialNetworks = new SocialNetworks(options.clientIds);
    this.contacthub = options.contacthub;
    this.formFiller = new FormFiller(options.autofillOptions.fields);
  }

  sendUserToContactHub = (user: User) => this.contacthub('customer', user)

  loginWithFacebook(): Promise<void> {
    return this.socialNetworks.loginWithFacebook()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
      });
  }

  loginWithGoogle(): Promise<void> {
    return this.socialNetworks.loginWithGoogle()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
      });
  }

  loginWithLinkedIn(): Promise<void> {
    return this.socialNetworks.loginWithLinkedIn()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
      });
  }
}
