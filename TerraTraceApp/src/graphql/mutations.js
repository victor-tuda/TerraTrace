/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPlants = /* GraphQL */ `
  mutation CreatePlants(
    $input: CreatePlantsInput!
    $condition: ModelPlantsConditionInput
  ) {
    createPlants(input: $input, condition: $condition) {
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
export const updatePlants = /* GraphQL */ `
  mutation UpdatePlants(
    $input: UpdatePlantsInput!
    $condition: ModelPlantsConditionInput
  ) {
    updatePlants(input: $input, condition: $condition) {
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
export const deletePlants = /* GraphQL */ `
  mutation DeletePlants(
    $input: DeletePlantsInput!
    $condition: ModelPlantsConditionInput
  ) {
    deletePlants(input: $input, condition: $condition) {
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
