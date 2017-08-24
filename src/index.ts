import form from './form';
import socialNetworks from './socialNetworks';
import { Options } from './models';

module.exports = function SocialAutofill(options: Options) {
  if (typeof options === 'undefined') {
    throw new Error('"Social Autofill" must be initialized with some options');
  }
  socialNetworks(options.socialNetworksAppIds);
  form(options.form);
}
