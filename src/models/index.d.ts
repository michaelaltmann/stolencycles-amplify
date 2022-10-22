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

export enum MatchStatus {
  UNREVIEWED = "UNREVIEWED",
  MATCHED = "MATCHED",
  MISMATCHED = "MISMATCHED"
}

type AdvertisementMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TheftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ColorMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BrandMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AccountMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MatchMetaData = {
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
  readonly platformName?: Platform | keyof typeof Platform | null;
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

export declare class Color {
  readonly id: string;
  readonly name: string;
  readonly rgb: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Color, ColorMetaData>);
  static copyOf(source: Color, mutator: (draft: MutableModel<Color, ColorMetaData>) => MutableModel<Color, ColorMetaData> | void): Color;
}

export declare class Brand {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Brand, BrandMetaData>);
  static copyOf(source: Brand, mutator: (draft: MutableModel<Brand, BrandMetaData>) => MutableModel<Brand, BrandMetaData> | void): Brand;
}

export declare class Account {
  readonly id: string;
  readonly platformName?: Platform | keyof typeof Platform | null;
  readonly platformId?: string | null;
  readonly images?: string | null;
  readonly name?: string | null;
  readonly aka?: (Account | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly accountAkaId?: string | null;
  constructor(init: ModelInit<Account, AccountMetaData>);
  static copyOf(source: Account, mutator: (draft: MutableModel<Account, AccountMetaData>) => MutableModel<Account, AccountMetaData> | void): Account;
}

export declare class Match {
  readonly id: string;
  readonly advertisement?: Advertisement | null;
  readonly theft?: Theft | null;
  readonly status?: MatchStatus | keyof typeof MatchStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchAdvertisementId?: string | null;
  readonly matchTheftId?: string | null;
  constructor(init: ModelInit<Match, MatchMetaData>);
  static copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}