import * as hello from 'hellojs';
import { SocialNetworksClientIds } from '../models';

export default class SocialNetworks {

  clientIds: SocialNetworksClientIds

  constructor(clientIds: SocialNetworksClientIds) {
    hello.init({ ...clientIds as { [k: string]: string } }); // "..." are needed because `hello` modifies the given options
    this.clientIds = clientIds;
  }

  loginWithFacebook() {
    if (typeof this.clientIds.facebook !== 'string') {
      throw new Error('The provided client id for Facebook is invalid');
    }

    const Facebook = hello('facebook');

    Facebook.login().then(() => {
      Facebook.api('me').then((json) => {
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
  }

  loginWithLinkedIn() {
    if (typeof this.clientIds.linkedin !== 'string') {
      throw new Error('The provided client id for LinkedIn is invalid');
    }
  }

}
