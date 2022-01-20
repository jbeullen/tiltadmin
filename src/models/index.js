// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Ride, Member, RideMember } = initSchema(schema);

export {
  Ride,
  Member,
  RideMember
};