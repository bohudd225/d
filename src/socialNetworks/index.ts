import hello from '../vendor/hello';
import injectLinkedInSDK from '../vendor/injectLinkedInSDK';
import { SocialNetworksClientIds, FacebookFields, FacebookUser } from '../models';

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
      Facebook.api('me', { fields }).then((json: FacebookUser) => {
        console.log(json);
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
      Google.api('me').then((json) => {
        console.log(json);
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
        .url('/people/~:(picture-url,first-name,last-name,id,formatted-name,email-address)')
        .method('GET')
        .body()
        .result((x: any) => {
          console.log(x);
        });
    }

    LinkedIn.User.authorize(onLogin);
  }

}
