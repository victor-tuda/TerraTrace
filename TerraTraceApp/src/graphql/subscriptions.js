/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePlant = /* GraphQL */ `
  subscription OnCreatePlant(
    $filter: ModelSubscriptionPlantFilterInput
    $owner: String
  ) {
    onCreatePlant(filter: $filter, owner: $owner) {
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
export const onUpdatePlant = /* GraphQL */ `
  subscription OnUpdatePlant(
    $filter: ModelSubscriptionPlantFilterInput
    $owner: String
  ) {
    onUpdatePlant(filter: $filter, owner: $owner) {
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
export const onDeletePlant = /* GraphQL */ `
  subscription OnDeletePlant(
    $filter: ModelSubscriptionPlantFilterInput
    $owner: String
  ) {
    onDeletePlant(filter: $filter, owner: $owner) {
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
