# Wasp GraphQL Micro-Libraries for Node.js and React

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/BlackWaspTech/wasp-graphql/issues)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/BlackWaspTech/wasp-graphql)

## wasp-graphql

[![npm](https://img.shields.io/npm/v/wasp-graphql.svg)](https://www.npmjs.com/package/wasp-graphql)

> `npm install wasp-graphql`

Execute a GraphQL query the same way that you would a `fetch` request.

Takes a `url` and an `init` object as input. Returns a Promise containing the results of the reques

### Usage example

```js
import { query } from 'wasp-graphql';

query(url, init)
  .then(res => res.json())
  .then(json => console.log(json));
```

[Read more about `wasp-graphql`](packages/wasp-graphql/README.md)

## redux-wasp

[![npm](https://img.shields.io/npm/v/redux-wasp.svg)](https://www.npmjs.com/package/redux-wasp)

> `npm install --save redux-wasp`

Save the results of a GraphQL query to Redux state.

### Usage example

```js
// store.js
import { createWaspMiddleware } from 'redux-wasp';
const waspMiddleware = createWaspMiddleware();
const store = createStore(r, p, applyMiddleware(waspMiddleware));

// reducers.js
import { waspGraphqlReducer } from 'redux-wasp';
const reducers = combineReducers({
  graphql: waspGraphqlReducer
});

// run query
import { query } from 'redux-wasp';

query(url, init)
  .then(res => res.json())
  .then(json => console.log(json));
```

[Read more about `redux-wasp`](packages/redux-wasp/README.md)

## redux-wasp-apollo

Provide integration between [redux-wasp](https://github.com/BlackWaspTech/redux-wasp) and [apollo-link-state](https://github.com/apollographql/apollo-link). Saves the results of an Apollo query to both Apollo State Cache and Redux State.

[Read more about `redux-wasp`](packages/redux-wasp-apollo/README.md).

---

## Code of Conduct

Read our Code of Conduct [here](CODE-OF-CONDUCT.md).

## Changelog

View it [here](CHANGELOG.md)

## How to Contribute

[Read more](CONTRIBUTING.md)

## Contributors

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/10323609?v=4" width="100px;"/><br /><sub><b>Denny Temple</b></sub>](https://dentemple.com/)<br /> | [<img src="https://avatars2.githubusercontent.com/u/19364468?v=4" width="100px;"/><br /><sub><b>Reynolds A Colon</b></sub>](https://www.github.com/rcolon100)<br /> | [<img src="https://avatars2.githubusercontent.com/u/23730068?v=4" width="100px;"/><br /><sub><b>kamo31</b></sub>](https://github.com/kamo31)<br /> | [<img src="https://avatars2.githubusercontent.com/u/19240166?v=4" width="100px;"/><br /><sub><b>marceca</b></sub>](https://github.com/marceca)<br /> |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

---

## License

Free and Open Source under the [MIT License](LICENSE).

---

[Navigate to wasp-graphql](packages/wasp-graphql/README.md)

[Navigate to redux-wasp](packages/redux-wasp/README.md)

[Navigate to redux-wasp-apollo](packages/redux-wasp-apollo/README.md)
