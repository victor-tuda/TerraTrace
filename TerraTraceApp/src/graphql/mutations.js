/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlant = /* GraphQL */ `
  mutation CreatePlant(
    $input: CreatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    createPlant(input: $input, condition: $condition) {
      id
      user_id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updatePlant = /* GraphQL */ `
  mutation UpdatePlant(
    $input: UpdatePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    updatePlant(input: $input, condition: $condition) {
      id
      user_id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deletePlant = /* GraphQL */ `
  mutation DeletePlant(
    $input: DeletePlantInput!
    $condition: ModelPlantConditionInput
  ) {
    deletePlant(input: $input, condition: $condition) {
      id
      user_id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
