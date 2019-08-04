/**
 * Update Apollo Cache
 *
 * @param {Object} props - Passing in props with Apollo Client passed in
 * @param {Object} query - The query being made to the Apollo Cache, as well as, updating the Database
 * @param {Object} variables - Variables needed to execute the query
 *
 */

function WaspLinkQuery(props, query, variables) {
  // Make sure Query is an Object before processing
  if (typeof query != 'object') {
    throw 'Query must be a GQL Object.';
  }

  if (!variables) {
    const q = {
      query: query
    };
    props.client.query(q);
  } else {
    // Make sure variables is an Object before processing
    if (typeof variables != 'object') {
      throw 'Query must be an Object.';
    }
    const q = {
      query: query,
      variables: variables
    };
    props.client.query(q);
  }
}

module.exports = WaspLinkQuery;

// console.log(WaspLinkQuery('',{'key':'val'}, {'key2':'val2'}))
