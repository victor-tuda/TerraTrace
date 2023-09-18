/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlants = /* GraphQL */ `
  subscription OnCreatePlants(
    $filter: ModelSubscriptionPlantsFilterInput
    $owner: String
  ) {
    onCreatePlants(filter: $filter, owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onUpdatePlants = /* GraphQL */ `
  subscription OnUpdatePlants(
    $filter: ModelSubscriptionPlantsFilterInput
    $owner: String
  ) {
    onUpdatePlants(filter: $filter, owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const onDeletePlants = /* GraphQL */ `
  subscription OnDeletePlants(
    $filter: ModelSubscriptionPlantsFilterInput
    $owner: String
  ) {
    onDeletePlants(filter: $filter, owner: $owner) {
      id
      name
      owner
      file {
        bucket
        region
        key
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
