# redux-wasp-apollo

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)

> **v0.2.0 (beta)**

---

Provides integration between [redux-wasp](https://github.com/BlackWaspTech/redux-wasp) and [apollo-link-state](https://github.com/apollographql/apollo-link).

**For the base query, mutation, and subscription, check out [`wasp-graphql`](https://github.com/BlackWaspTech/wasp-graphql).**

**For additional features unique to [Redux](https://redux.js.org/), check out [`redux-wasp`](https://github.com/BlackWaspTech/redux-wasp).**

**For a live, full-stack application showcasing `redux-wasp` in action, [go here](https://github.com/BlackWaspTech/the-buzz).**

# Purpose

Updating to Apollo 2.0+ and don't want to completely remove redux store/state? Just use ReduxWaspApollo to bridge the gap between the two! Pass in the new data you need to update Apollo's Cache with and let ReduxWaspApollo do the rest.

# Usage

Pass your Apollo Client down as a prop. Pass props into the ReduxWaspApollo functions.

# Example

### index.js

```js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ReactDOM from 'react-dom';
import App from './components/app';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App client={client} />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
```

### app.js

```js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as queries from './queries/queries';

// Wasp Links
import WaspLinkMutate from 'WaspReduxApolloLinkMutate';
import WaspLinkQuery from 'WaspReduxApolloQuery';

// Wasp Fetch
import WaspFetch from 'WaspFetch';

let API = 'http://localhost:3000/graphql';

const mapStateToProps = state => {
  return {
    user: state
  };
};
class App extends Component {
  constructor(props) {
    super(props);
  }

  getUsers(e, props) {
    e.preventDefault();
    // Wasp Query usage
    // Passing in props with Client passed down, as well as, the query to be used
    WaspLinkQuery(props, queries.getAllUsers);
    // Get information with WaspFetch
    WaspFetch(API, queries.getAllUsersWaspFetch);
  }
  render() {
    return (
      <div>
        <button onClick={e => this.getUsers(e, this.props)}>Get Users</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
```

### queries.js

```js
import gql from 'graphql-tag';

let addUser = gql`
  mutation addUser($name: String!, $pass: String!) {
    addUser(name: $name, password: $pass) {
      userName
      userPass
    }
  }
`;

let getUser = gql`
  query($id: ID!) {
    user(id: $id) {
      userName
    }
  }
`;
let getAllUsers = gql`
  {
    getUsers {
      userName
    }
  }
`;

export { addUser, getUser, getAllUsers };
```

---

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/19240166?v=4" width="100px;"/><br /><sub><b>marceca</b></sub>](https://github.com/marceca)<br /> | [<img src="https://avatars2.githubusercontent.com/u/19364468?v=4" width="100px;"/><br /><sub><b>Reynolds A Colon</b></sub>](http://www.realized-technologies.com)<br /> | [<img src="https://avatars2.githubusercontent.com/u/10323609?v=4" width="100px;"/><br /><sub><b>Denny Temple</b></sub>](https://dentemple.com/)<br /> | [<img src="https://avatars2.githubusercontent.com/u/23730068?v=4" width="100px;"/><br /><sub><b>kamo31</b></sub>](https://github.com/kamo31)<br /> |
| :---: | :---: | :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Code of Conduct

Read our Code of Conduct [here](CODE-OF-CONDUCT.md).

## License

Open Sourced under the [MIT License](LICENSE).
