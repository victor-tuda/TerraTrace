// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Plants, S3Object } = initSchema(schema);

export {
  Plants,
  S3Object
};