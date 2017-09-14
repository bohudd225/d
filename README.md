# Contacthub Connect Social

`Contacthub Connect Social` is a drop-in library for web clients to automatically:
1. Fill a sign-up form with information from one of these three major social networks: Facebook, Google, LinkedIn
2. Send the user's data to your ContacthHub account

## How to use

Insert this snippet in your website (preferably in the `<HEAD>` section):

```html
<script src='...'></script>
<script>
  var connectSocial = new window.ContacthubConnectSocial({
    socialNetworks: {/* see below */},
    contacthub: {/* see below */},
    autofillOptions: {/* see below */}
  });
</script>
```

Compressed and uncompressed copies of Contacthub Connect Social JS files are available. The uncompressed file is best used during development or debugging; the compressed file saves bandwidth and improves performance in production. Use CDNs can offer a performance benefit by hosting Contacthub Connect Social JS on servers spread across the globe. This also offers an advantage that if the visitor to your webpage has already downloaded a copy of Contacthub Connect Social JS from the same CDN, it won't have to be re-downloaded.

To load a hosted library, copy and paste the HTML snippet for that library (shown below) in your web page.

#### Latest version minified
```html
<script src="..."></script>
```

#### Latest version uncompressed
```html
<script src="..."></script>
```

#### Specific version minified
```html
<script src="..."></script>
```

#### Specific version uncompressed
```html
<script src="..."></script>
```

We recommend that you load libraries from the CDN via HTTPS, even if your own website only uses HTTP.

### Initialization of ContacthubConnectSocial object

The first script of the snippet above will add a `ContacthubConnectSocial` class to the global `window` object of your page.
To enable `ContacthubConnectSocial`, you have to create an instance of it with the right configuration which consists of:

#### `socialNetworks.clientIds`

`ContacthubConnectSocial`, to let the users login with their favourite social networks, needs the client ids of your Facebook, Google and LinkedIn apps:

```js
var connectSocial = new window.ContacthubConnectSocial({
  socialNetworks: {
    clientIds: {
      facebook: 'your_facebook_app_client_id',
      google: 'your_google_app_client_id',
      linkedin: 'your_linkedin_app_client_id',
    }
  },
  ...
});
```

If you don't want to enable `ContacthubConnectSocial` for every supported social network simply omit the client id of the social networks you don't care about:

```js
var connectSocial = new window.ContacthubConnectSocial({
  socialNetworks: {
    clientIds: {
      facebook: 'your_facebook_app_client_id' // in this case we're supporting only Facebook login
    }
  }
  ...
});
```

#### `socialNetworks.scopes`

By default, `ContacthubConnectSocial` logs in using the following additional scopes:
- `likes` (only for Facebook)
- `work_history`
- `education_history`

If you don't need any of these, you can overwrite the option `scopes` and avoid asking the user permission for them:

```js
var connectSocial = new window.ContacthubConnectSocial({
  socialNetworks: {
    clientIds: { ... }
    scopes: ['education_history'] // "work_history" and "likes" are not collected
  }
  ...
});
```

NOTE: the basic profile data (name, email, birth date, ...) is always collected

#### `contacthub`

`ContacthubConnectSocial` uses the official [`contacthub-sdk-browser`](https://github.com/contactlab/contacthub-sdk-browser) to post the collected user data to the Contacthub API.

To avoid downloading the `contacthub-sdk-browser` JS files multiple times, as your page will probably already have one, `ContacthubConnectSocial` requires you to directly pass the instance of the sdk during the initialization:

```js
// let's say you stored the `contacthub-sdk-browser` in your page as `window.ch` (which is the default)

var connectSocial = new window.ContacthubConnectSocial({
  contacthub: window.ch,
  ...
});
```

For more information about the `contacthub-sdk-browser` refer to [`contacthub-sdk-browser#how-to-use`](https://github.com/contactlab/contacthub-sdk-browser#how-to-use).

#### `autofillOptions.fields`

`ContacthubConnectSocial` will automatically fill your sign up form with the user's data retrieved from one of the supported social networks.

To do so, it needs the CSS selector of the fields of your form that you desire to automatically fill.

As of today, `ContacthubConnectSocial` supports the following fields:
- first name
- last name
- gender
- email
- date of birth

Any field **must** be a simple text field such as `<input type="text">` or a `<textarea>`.
`ContacthubConnectSocial` does not support complex `input`s such as `<input type="date">`

```js
var connectSocial = new window.ContacthubConnectSocial({
  autofillOptions: {
    fields: {
      firstName: '#firstName', // CSS selector to the "first name" input field of your sign up form
      lastName: '#lastName', // CSS selector to the "last name" input field of your sign up form
      dateOfBirth: '#dateOfBirth', // CSS selector to the "date of birth" input field of your sign up form
      gender: '#gender', // CSS selector to the "gender" input field of your sign up form
      email: '#email' // CSS selector to the "email" input field of your sign up form
    }
  }
  ...
});
```

#### `autofillOptions.icons`

`ContacthubConnectSocial` can automatically add the icons of Facebook, Google and LinkedIn to a container of your choice. This feature is optional.

To activate it, you can simply pass the CSS selector of the container where you want `ContacthubConnectSocial` to append the icons:

```js
var connectSocial = new window.ContacthubConnectSocial({
  autofillOptions: {
    icons: {
      container: '#icons-container'
    },
    fields: { ... }
  }
  ...
});
```

NOTE: `ContacthubConnectSocial` will only add the icons of the enabled social networks.

## Contributing to this library

### Getting started

1. Clone this repo to a floder of your choice
2. Run `yarn` from inside the cloned repository (if you don't have `yarn` you can install by running `npm i -g yarn`)
3. Change the `ContacthubConnectSocial` snippet in `demo/index.ejs` as you like

### How to build locally

`npm run build` will generate `dist/contactlab.js` and `dist/contactlab.min.js`.


### How to run tests

`npm test` will run all tests once using Jest

`npm run test-dev` will automatically re-run tests using Jest on every change

`npm run e2e` will run the end-to-end integration tests using Webdriver.IO

### How to open the demo page in your browser

`npm start` will run a webpack process and serve the demo at `http://localhost:8080`
