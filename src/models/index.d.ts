import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum AdvertisementStatus {
  UNREVIEWED = "UNREVIEWED",
  REVIEWED = "REVIEWED",
  FLAGGED = "FLAGGED",
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

export enum AdvertisementPlatform {
  MARKETPLACE = "MARKETPLACE",
  OFFERUP = "OFFERUP",
  CRAIGSLIST = "CRAIGSLIST",
  PROSCLOSET = "PROSCLOSET",
  EBAY = "EBAY",
  OTHER = "OTHER"
}

export enum TheftPlatform {
  FACEBOOK = "FACEBOOK",
  BIKEINDEX = "BIKEINDEX",
  PROJECT529 = "PROJECT529",
  NCIC = "NCIC",
  OTHER = "OTHER"
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

type EagerAdvertisement = {
  readonly id: string;
  readonly title: string;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: AdvertisementStatus | keyof typeof AdvertisementStatus | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdvertisement = {
  readonly id: string;
  readonly title: string;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: AdvertisementStatus | keyof typeof AdvertisementStatus | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Advertisement = LazyLoading extends LazyLoadingDisabled ? EagerAdvertisement : LazyAdvertisement

export declare const Advertisement: (new (init: ModelInit<Advertisement, AdvertisementMetaData>) => Advertisement) & {
  copyOf(source: Advertisement, mutator: (draft: MutableModel<Advertisement, AdvertisementMetaData>) => MutableModel<Advertisement, AdvertisementMetaData> | void): Advertisement;
}

type EagerTheft = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: TheftStatus | keyof typeof TheftStatus | null;
  readonly location?: string | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTheft = {
  readonly id: string;
  readonly title: string;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: TheftStatus | keyof typeof TheftStatus | null;
  readonly location?: string | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Theft = LazyLoading extends LazyLoadingDisabled ? EagerTheft : LazyTheft

export declare const Theft: (new (init: ModelInit<Theft, TheftMetaData>) => Theft) & {
  copyOf(source: Theft, mutator: (draft: MutableModel<Theft, TheftMetaData>) => MutableModel<Theft, TheftMetaData> | void): Theft;
}

type EagerColor = {
  readonly id: string;
  readonly name: string;
  readonly rgb: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyColor = {
  readonly id: string;
  readonly name: string;
  readonly rgb: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Color = LazyLoading extends LazyLoadingDisabled ? EagerColor : LazyColor

export declare const Color: (new (init: ModelInit<Color, ColorMetaData>) => Color) & {
  copyOf(source: Color, mutator: (draft: MutableModel<Color, ColorMetaData>) => MutableModel<Color, ColorMetaData> | void): Color;
}

type EagerBrand = {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBrand = {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Brand = LazyLoading extends LazyLoadingDisabled ? EagerBrand : LazyBrand

export declare const Brand: (new (init: ModelInit<Brand, BrandMetaData>) => Brand) & {
  copyOf(source: Brand, mutator: (draft: MutableModel<Brand, BrandMetaData>) => MutableModel<Brand, BrandMetaData> | void): Brand;
}

type EagerAccount = {
  readonly id: string;
  readonly images?: string | null;
  readonly name?: string | null;
  readonly aliases?: (Account | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly accountAliasesId?: string | null;
}

type LazyAccount = {
  readonly id: string;
  readonly images?: string | null;
  readonly name?: string | null;
  readonly aliases: AsyncCollection<Account>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly accountAliasesId?: string | null;
}

export declare type Account = LazyLoading extends LazyLoadingDisabled ? EagerAccount : LazyAccount

export declare const Account: (new (init: ModelInit<Account, AccountMetaData>) => Account) & {
  copyOf(source: Account, mutator: (draft: MutableModel<Account, AccountMetaData>) => MutableModel<Account, AccountMetaData> | void): Account;
}

type EagerMatch = {
  readonly id: string;
  readonly advertisement?: Advertisement | null;
  readonly theft?: Theft | null;
  readonly status?: MatchStatus | keyof typeof MatchStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchAdvertisementId?: string | null;
  readonly matchTheftId?: string | null;
}

type LazyMatch = {
  readonly id: string;
  readonly advertisement: AsyncItem<Advertisement | undefined>;
  readonly theft: AsyncItem<Theft | undefined>;
  readonly status?: MatchStatus | keyof typeof MatchStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchAdvertisementId?: string | null;
  readonly matchTheftId?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match, MatchMetaData>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}