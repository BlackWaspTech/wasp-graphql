'use strict';

/**
 * Updates Apollo Cache and Mutate DB
 * 
 * @param {Object} props - Passing in props with Apollo Client passed in
 * @param {Object} query - The query being made to the Apollo Cache, as well as, updating the Database
 * @param {Object} variables - Variables needed to execute the query
 * @param {Object} refetch - Refetch after Mutation has been made
 * 
 */


const WaspLinkMutate = (props, query, variables, refetch) => {
  // Check for variables
  if(!variables) {
    return Promise.reject(
      "Mutation must have variables"
    )
  } else {
    // Make sure variables is an Object before processing
    if(typeof variables != 'Object') {
      return Promise.reject(
        "Variables must be an Object. Given: " + typeof variables
      )
    }
  }

  // Make sure Query is an Object before processing
  if(typeof query != 'Object') {
    return Promise.reject(
      "Query must be a GQL Object. Given: " + typeof variables
    )
  }

  // Run Mutation with no Refetch option
  if(!refetch) {
    const q = {
      mutation: query,
      variables
    }
    props.client.mutate(q)
  } else {
    // Run Mutation and then a following Refetch query
    const q = {
      mutation: query,
      variables,
      refetchQueries: [
        { query: refetch }
      ]
    }
    props.client.mutate(q)
  }
}

export default WaspLinkMutate;