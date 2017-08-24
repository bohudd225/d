import form from './form';
import socialNetworks from './socialNetworks';
import { Options } from './models';

module.exports = function SocialAutofill(options: Options) {
  socialNetworks(options.socialNetworksAppIds);
  form(options.form);
}
