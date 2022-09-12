import Realm from "realm";
import { ParticipantSchema } from './Schemas/ParticipantSchema';

export const getRealm = async () =>
  await Realm.open({
    path: "new-event-app",
    schema: [ParticipantSchema],
    schemaVersion: 3
  });
