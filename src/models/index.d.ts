import { ModelInit, MutableModel } from "@aws-amplify/datastore";

export enum Platform {
  MARKETPLACE = "MARKETPLACE",
  OFFERUP = "OFFERUP",
  CRAIGSLIST = "CRAIGSLIST",
  OTHER = "OTHER"
}

export enum AdvertisementStatus {
  UNREVIEWED = "UNREVIEWED",
  REVIEWED = "REVIEWED",
  SOLD = "SOLD",
  JUNK = "JUNK"
}

export enum TheftStatus {
  UNREVIEWED = "UNREVIEWED",
  REVIEWED = "REVIEWED",
  RECOVERED = "RECOVERED"
}

type AdvertisementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TheftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Advertisement {
  readonly id: string;
  readonly title: string;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly platformName?: Platform | keyof typeof Platform | null;
  readonly platformId?: string | null;
  readonly images?: string | null;
  readonly status?: AdvertisementStatus | keyof typeof AdvertisementStatus | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Advertisement, AdvertisementMetaData>);
  static copyOf(source: Advertisement, mutator: (draft: MutableModel<Advertisement, AdvertisementMetaData>) => MutableModel<Advertisement, AdvertisementMetaData> | void): Advertisement;
}

export declare class Theft {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly platformName?: string | null;
  readonly platformId?: string | null;
  readonly images?: string | null;
  readonly status?: TheftStatus | keyof typeof TheftStatus | null;
  readonly location?: string | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Theft, TheftMetaData>);
  static copyOf(source: Theft, mutator: (draft: MutableModel<Theft, TheftMetaData>) => MutableModel<Theft, TheftMetaData> | void): Theft;
}