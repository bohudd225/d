import { Promise } from 'es6-promise';
import { FormFiller, addSocialIconsToForm } from './autofill';
import SocialNetworks from './socialNetworks';
import { Options, ContactHubSDKBrowser, User } from './models';

export default class ContacthubConnectSocial {

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

    if (options.autofillOptions.icons) {
      addSocialIconsToForm(options.autofillOptions.icons, this.socialNetworks, this);
    }
  }

  sendUserToContactHub = (user: User) => this.contacthub('customer', user)

  loginWithFacebook(): Promise<User> {
    return this.socialNetworks.loginWithFacebook()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
        return user;
      });
  }

  loginWithGoogle(): Promise<User> {
    return this.socialNetworks.loginWithGoogle()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
        return user;
      });
  }

  loginWithLinkedIn(): Promise<User> {
    return this.socialNetworks.loginWithLinkedIn()
      .then(user => {
        this.sendUserToContactHub(user);
        this.formFiller.fillFormWithUserData(user);
        return user;
      });
  }
}
