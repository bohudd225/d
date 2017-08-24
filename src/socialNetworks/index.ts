import { SocialNetworksClientIds } from '../models';

export default class SocialNetworks {

  clientIds: SocialNetworksClientIds

  constructor(clientIds: SocialNetworksClientIds) {
    this.clientIds = clientIds;
  }

  loginWithFacebook() {
    if (typeof this.clientIds.facebook !== 'string') {
      throw new Error('The provided client id for Facebook is invalid');
    }
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
