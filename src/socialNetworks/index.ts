import { Promise } from 'es6-promise';
import hello from '../vendor/hello';
import injectLinkedInSDK from '../vendor/injectLinkedInSDK';
import { SocialNetworksClientIds, FacebookFields, FacebookUser, GoogleUser, LinkedInUser, User } from '../models';
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

  loginWithFacebook(): Promise<User> {
    if (typeof this.clientIds.facebook !== 'string') {
      return Promise.reject('The provided client id for Facebook is invalid');
    }

    const Facebook = hello('facebook');
    const fields: FacebookFields[] = ['first_name', 'last_name', 'gender', 'birthday', 'link', 'email'];

    return new Promise((resolve, reject) => {
      Facebook.login({ scope: 'email' }).then(() => {
        Facebook.api('me', { fields }).then((facebookUser: FacebookUser) => {
          try {
            const user = getUserFromFacebookUser(facebookUser);
            resolve(user);
          } catch (e) {
            reject(e);
          }
        }, reject);
      }, reject);
    });
  }

  loginWithGoogle(): Promise<User> {
    if (typeof this.clientIds.google !== 'string') {
      return Promise.reject('The provided client id for Google is invalid');
    }

    const Google = hello('google');

    return new Promise((resolve, reject) => {
      Google.login({ scope: 'email' }).then(() => {
        Google.api('me').then((googleUser: GoogleUser) => {
          try {
            const user = getUserFromGoogleUser(googleUser);
            resolve(user);
          } catch (e) {
            reject(e);
          }
        }, reject);
      }, reject);
    });
  }

  loginWithLinkedIn(): Promise<User> {
    if (typeof this.clientIds.linkedin !== 'string') {
      return Promise.reject('The provided client id for LinkedIn is invalid');
    }

    const LinkedIn = (window as any).IN;

    return new Promise((resolve) => {
      const onLogin = () => {
        LinkedIn.API
          .Raw()
          .url('/people/~:(picture-url,first-name,last-name,id,formatted-name,email-address,public-profile-url)')
          .method('GET')
          .body()
          .result((linkedInUser: LinkedInUser) => {
            resolve(getUserFromLinkedInUser(linkedInUser));
          });
      }

      LinkedIn.User.authorize(onLogin);
    });
  }

}
