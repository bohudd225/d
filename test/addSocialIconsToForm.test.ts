import { User } from '../src/models';
import ContacthubConnectSocial from '../src/ContacthubConnectSocial';

const validOptions = {
  socialNetworks: {
    clientIds: { facebook: '123456', google: '123456', linkedin: '123456' }
  },
  contacthub: () => {},
  autofillOptions: { icons: { container: '#icons-container' }, fields: {} }
}

describe('addSocialIconsToForm function', () => {

  it('add social network icons to icons container element', () => {

    document.body.innerHTML = `
      <form class="ui form">
        <div id="icons-container"></div>
      </form>`;

    new ContacthubConnectSocial(validOptions);
    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('throw error if container can\'t be found', () => new Promise((resolve, reject) => {
    console.error = (e) => {
      if (e === 'ContacthubConnectSocial: the icons container "#wrong-id" could not be found') {
        resolve();
      } else {
        reject();
      }
    }

    new ContacthubConnectSocial({
      ...validOptions,
      autofillOptions: {
        ...validOptions.autofillOptions,
        icons: {
          container: '#wrong-id'
        }
      }
    });
  }));

});
