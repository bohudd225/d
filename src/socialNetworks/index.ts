import { Promise } from 'es6-promise';
import hello from '../vendor/hello';
import injectLinkedInSDK from '../vendor/injectLinkedInSDK';
import { Options, FacebookLike, Scope, FacebookScope, GoogleScope, SocialNetworksClientIds, FacebookFields, FacebookUser, GoogleUser, LinkedInUser, User } from '../models';
import { getUserFromFacebookUser, getUserFromGoogleUser, getUserFromLinkedInUser } from '../userConverters';

export default class SocialNetworks {

  clientIds: SocialNetworksClientIds
  scopes: Scope[]

  constructor(socialNetworksOptions: Options['socialNetworks']) {
    const { clientIds, scopes } = socialNetworksOptions;

    if (clientIds.linkedin) {
      injectLinkedInSDK(clientIds.linkedin);
    }

    hello.init({ ...clientIds as { [k: string]: string } }); // "..." are needed because `hello` modifies the given options

    this.clientIds = clientIds;
    this.scopes = scopes;
  }

  getFacebookScopesFromScopes(scopes: Scope[]): FacebookScope[] {
    const convertionMap: { [k in Scope]: FacebookScope } = {
      likes: 'user_likes',
      education_history: 'user_education_history',
      work_history: 'user_work_history'
    }

    return scopes.map(s => convertionMap[s]);
  }

  loginWithFacebook(): Promise<User> {
    if (typeof this.clientIds.facebook !== 'string') {
      return Promise.reject('The provided client id for Facebook is invalid');
    }

    const Facebook = hello('facebook');

    const fields: FacebookFields[] = ['first_name', 'last_name', 'gender', 'birthday', 'link', 'email', 'education', 'work'];
    const scopes: FacebookScope[] = ['email', 'user_birthday', ...this.getFacebookScopesFromScopes(this.scopes)];

    return new Promise((resolve, reject) => {
      Facebook.login({ scope: scopes.join(',') }).then(() => {
        Promise.all([Facebook.api('me', { fields }), Facebook.api('me/likes')])
          .then(([facebookUser, likes]: [FacebookUser, FacebookLike[]]) => {
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

    const scopes: GoogleScope[] = ['email', 'birthday'];

    return new Promise((resolve, reject) => {
      Google.login({ scope: scopes.join(',') }).then(() => {
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
