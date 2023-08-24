/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPlant = /* GraphQL */ `
  query GetPlant($id: ID!) {
    getPlant(id: $id) {
      id
      name
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listPlants = /* GraphQL */ `
  query ListPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncPlants = /* GraphQL */ `
  query SyncPlants(
    $filter: ModelPlantFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPlants(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
