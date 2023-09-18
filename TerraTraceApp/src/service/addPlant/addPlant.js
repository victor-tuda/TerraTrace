import { API, graphqlOperation } from "aws-amplify"
import { createPlants } from '../../graphql/mutations'

export async function addPlant(data, imgFile) {
  file = {

  }
    try {
      if (!data.name) return
      await API.graphql(graphqlOperation(createPlants, {input: {name: data.name, file: imgFile}}));

    } catch (err) {
      console.log('error creating plant:', err);
    }    
  }