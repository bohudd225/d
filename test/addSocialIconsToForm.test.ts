import { User } from '../src/models';
import ContacthubConnectSocial from '../src/ContacthubConnectSocial';

const validOptions = {
  clientIds: { facebook: '123456', google: '123456', linkedin: '123456' },
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

});
