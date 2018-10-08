# wasp-graphql

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/dentemple/wasp-graphql.svg?branch=master)](https://travis-ci.com/dentemple/wasp-graphql)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/BlackWaspTech/wasp-graphql/issues)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<code>
v0.2.0 (beta)
</code>
<br />

Make your GraphQL queries as intuitive as a Fetch request! No extra dependencies required.

For additional features special to [`redux`](https://redux.js.org/), check out [`redux-wasp`](https://github.com/BlackWaspTech/redux-wasp).

## Purpose

[Fetch - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

[GraphQL - A query language for your API](https://graphql.org/)

Are you considering an alternative to your REST services? Are you finding the GraphQL ecosystem to be rather cumbersome or dependency-heavy? Planning on building your own GraphQL service but want to be careful about your bundle size?

`wasp-graphql` is here to provide a thin wrapper over the Fetch API. No additional dependencies are included.

Takes as input a `url` and a `configuration` object. Returns a `promise` containing the results of the XmlHttpRequest.

Requires `fetch` to be in scope.

## Usage

[How to query a GraphQL server.](https://graphql.org/learn/queries/)

### Installation

- via npm: `npm install --save wasp-graphql`

- via yarn: `yarn add wasp-graphql`

#### Required: `fetch`

There are several ways to include it in your project:

- Modern browsers ([Can I Use It?](https://caniuse.com/#search=fetch))
- [`what-wg-fetch`/ Window.Fetch polyfill](https://github.com/github/fetch)
- [`cross-fetch`](https://github.com/lquixada/cross-fetch)
- [`node-fetch`](https://github.com/bitinn/node-fetch)
- etc.

### API

#### `query`: `Promise<Response> query(url, init);`

##### `@param {string} url`

The resource to be targetted by the XmlHttpRequest. Must be a string.

##### `@param {(string|Object)} init`

Can be the query string or a full configuration object.

If the user provides a configuration object, they must also include the query string either as a `.fields` property (standard) or on the `.body` property ([JSON parsable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)).

#### `mutate`: `Promise<Response> mutate(url, init);`

##### `@param {string} url`

The resource to be targetted by the XmlHttpRequest. Must be a string.

##### `@param {(string|Object)} init`

Can be the mutation string or a full configuration object.

If the user provides a configuration object, they must also include the mutation string either as a `.fields` property (standard) or on the `.body` property ([JSON parsable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)).

### Examples

```js
/*
  Examples for syntax that may succeed
*/
// With Query String
query('/foo/bar', '{foo { bar }}').then(res => res.json());

// With Query String
query('/myendpoint', 'query myQuery { field1 }').then(res => res.json());

// With Fields property
query('/myurl', { fields: '{foo { bar }}' }).then(res => res.json());

// With Body property
query('/myurl', { body: JSON.stringify({ fields: '{foo bar}' }) }).then(res =>
  res.json()
);

// With Fields + Custom properties
const config = {
  fields: '{foo bar}',
  cache: 'no-cache'
};
query('/myurl', config).then(res => res.json());

/*
  Examples for syntax that may error
*/
// No arguments
query().catch(err => console.log(err));

// No second argument
query('/foo/bar').catch(err => console.log(err));

// An invalid second argument
query('/foo/bar', []).catch(err => console.log(err));

// Empty strings
query('', '').catch(err => console.log(err));

// Misconfigured init object (did not add a body property)
query('/foo', { cache: 'no-cache' }).catch(err => console.log(err));

// Misconfigured body property (did not use JSON.stringify())
query('/foo', { body: { query: '{foo bar}' } }).catch(err => console.log(err));

// if the first argument isn't an endpoint, nothing is fetched
query('not a real endpoint', '{ stuff }').catch(err => console.log(err));

// if the second argument is a string, but not a valid query string,
//      then the server won't be able to do anything with it
query('/foo', 'definitely not a query string').catch(err => console.log(err));
```

---

## Contributing

[Read more](CONTRIBUTING.md)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/10323609?v=4" width="100px;"/><br /><sub><b>Denny Temple</b></sub>](https://dentemple.com/)<br />[💻](https://github.com/BlackWaspTech <https://github.com/BlackWaspTech>/wasp-graphql/commits?author=dentemple "Code") [📖](https://github.com/BlackWaspTech <https://github.com/BlackWaspTech>/wasp-graphql/commits?author=dentemple "Documentation") [💡](#example-dentemple "Examples") [🤔](#ideas-dentemple "Ideas, Planning, & Feedback") [👀](#review-dentemple "Reviewed Pull Requests") [⚠️](https://github.com/BlackWaspTech <https://github.com/BlackWaspTech>/wasp-graphql/commits?author=dentemple "Tests") | [<img src="https://avatars2.githubusercontent.com/u/19364468?v=4" width="100px;"/><br /><sub><b>Reynolds A Colon</b></sub>](http://www.realized-technologies.com)<br />[💻](https://github.com/BlackWaspTech <https://github.com/BlackWaspTech>/wasp-graphql/commits?author=Rcolon100 "Code") [💡](#example-Rcolon100 "Examples") [🤔](#ideas-Rcolon100 "Ideas, Planning, & Feedback") [👀](#review-Rcolon100 "Reviewed Pull Requests") [⚠️](https://github.com/BlackWaspTech <https://github.com/BlackWaspTech>/wasp-graphql/commits?author=Rcolon100 "Tests") [🎨](#design-Rcolon100 "Design") | [<img src="https://avatars2.githubusercontent.com/u/23730068?v=4" width="100px;"/><br /><sub><b>kamo31</b></sub>](https://github.com/kamo31)<br />[🤔](#ideas-kamo31 "Ideas, Planning, & Feedback") [👀](#review-kamo31 "Reviewed Pull Requests") |
| :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Code of Conduct

Read our Code of Conduct [here](CODE-OF-CONDUCT.md).

## License

Open Sourced under the [MIT License](LICENSE).
