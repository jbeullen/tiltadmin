import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type RideMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RideMemberMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Ride {
  readonly id: string;
  readonly date?: string;
  readonly description?: string;
  readonly distance?: number;
  readonly elevation_gain?: number;
  readonly points?: number;
  readonly location?: string;
  readonly gpx?: string;
  readonly type?: string;
  readonly attendance?: (RideMember | null)[];
  readonly website?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Ride, RideMetaData>);
  static copyOf(source: Ride, mutator: (draft: MutableModel<Ride, RideMetaData>) => MutableModel<Ride, RideMetaData> | void): Ride;
}

export declare class Member {
  readonly id: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly rides?: (RideMember | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Member, MemberMetaData>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member, MemberMetaData>) => MutableModel<Member, MemberMetaData> | void): Member;
}

export declare class RideMember {
  readonly id: string;
  readonly ride: Ride;
  readonly member: Member;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RideMember, RideMemberMetaData>);
  static copyOf(source: RideMember, mutator: (draft: MutableModel<RideMember, RideMemberMetaData>) => MutableModel<RideMember, RideMemberMetaData> | void): RideMember;
}