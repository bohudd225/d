import hello from '../vendor/hello';
import injectLinkedInSDK from '../vendor/injectLinkedInSDK';
import { SocialNetworksClientIds, FacebookFields, FacebookUser, GoogleUser, LinkedInUser } from '../models';
import { getUserFromFacebookUser, getUserFromGoogleUser, getUserFromLinkedInUser } from '../userConverters';

export default class SocialNetworks {

  clientIds: SocialNetworksClientIds

  constructor(clientIds: SocialNetworksClientIds) {
    if (clientIds.linkedin) {
      injectLinkedInSDK(clientIds.linkedin);
    }
    hello.init({ ...clientIds as { [k: string]: string } }); // "..." are needed because `hello` modifies the given options
    this.clientIds = clientIds;
  }

  loginWithFacebook() {
    if (typeof this.clientIds.facebook !== 'string') {
      throw new Error('The provided client id for Facebook is invalid');
    }

    const Facebook = hello('facebook');
    const fields: FacebookFields[] = ['first_name', 'last_name', 'gender', 'birthday', 'link', 'email'];

    Facebook.login().then(() => {
      Facebook.api('me', { fields }).then((facebookUser: FacebookUser) => {
        console.log(facebookUser);

        const user = getUserFromFacebookUser(facebookUser);

        console.log(user);
      }, e => {
        alert('Whoops! ' + e.error.message);
      });
    }, e => {
      console.error(e)
    });

  }

  loginWithGoogle() {
    if (typeof this.clientIds.google !== 'string') {
      throw new Error('The provided client id for Google is invalid');
    }

    const Google = hello('google');

    Google.login().then(() => {
      Google.api('me').then((googleUser: GoogleUser) => {
        console.log(googleUser);

        const user = getUserFromGoogleUser(googleUser);

        console.log(user)
      }, e => {
        alert('Whoops! ' + e.error.message);
      });
    }, e => {
      console.error(e)
    });
  }

  loginWithLinkedIn() {
    if (typeof this.clientIds.linkedin !== 'string') {
      throw new Error('The provided client id for LinkedIn is invalid');
    }

    const LinkedIn = (window as any).IN;

    const onLogin = () => {
      LinkedIn.API
        .Raw()
        .url('/people/~:(picture-url,first-name,last-name,id,formatted-name,email-address,public-profile-url)')
        .method('GET')
        .body()
        .result((linkedInUser: LinkedInUser) => {
          console.log(linkedInUser);

          const user = getUserFromLinkedInUser(linkedInUser);

          console.log(user);
        });
    }

    LinkedIn.User.authorize(onLogin);
  }

}
