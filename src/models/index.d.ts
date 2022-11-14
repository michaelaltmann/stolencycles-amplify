import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum AdvertisementStatus {
  UNREVIEWED = "UNREVIEWED",
  REVIEWED = "REVIEWED",
  RECOVERED = "RECOVERED",
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
  NEXTDOOR = "NEXTDOOR",
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

type MatchMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TheftMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SellerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SellerAliasMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerAdvertisement = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly flagged?: boolean | null;
  readonly sellerId?: string | null;
  readonly sellerName?: string | null;
  readonly sellerImage?: string | null;
  readonly status?: AdvertisementStatus | keyof typeof AdvertisementStatus | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly matches?: (Match | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdvertisement = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly price?: number | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly flagged?: boolean | null;
  readonly sellerId?: string | null;
  readonly sellerName?: string | null;
  readonly sellerImage?: string | null;
  readonly status?: AdvertisementStatus | keyof typeof AdvertisementStatus | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly matches: AsyncCollection<Match>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Advertisement = LazyLoading extends LazyLoadingDisabled ? EagerAdvertisement : LazyAdvertisement

export declare const Advertisement: (new (init: ModelInit<Advertisement, AdvertisementMetaData>) => Advertisement) & {
  copyOf(source: Advertisement, mutator: (draft: MutableModel<Advertisement, AdvertisementMetaData>) => MutableModel<Advertisement, AdvertisementMetaData> | void): Advertisement;
}

type EagerMatch = {
  readonly id: string;
  readonly advertisement?: Advertisement | null;
  readonly theft?: Theft | null;
  readonly status?: MatchStatus | keyof typeof MatchStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMatch = {
  readonly id: string;
  readonly advertisement: AsyncItem<Advertisement | undefined>;
  readonly theft: AsyncItem<Theft | undefined>;
  readonly status?: MatchStatus | keyof typeof MatchStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Match = LazyLoading extends LazyLoadingDisabled ? EagerMatch : LazyMatch

export declare const Match: (new (init: ModelInit<Match, MatchMetaData>) => Match) & {
  copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}

type EagerTheft = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: TheftStatus | keyof typeof TheftStatus | null;
  readonly location?: string | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly matches?: (Match | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTheft = {
  readonly id: string;
  readonly title: string;
  readonly url?: string | null;
  readonly description?: string | null;
  readonly model?: string | null;
  readonly brand?: string | null;
  readonly color?: string | null;
  readonly images?: string | null;
  readonly status?: TheftStatus | keyof typeof TheftStatus | null;
  readonly location?: string | null;
  readonly postDate?: string | null;
  readonly sortOrder?: string | null;
  readonly matches: AsyncCollection<Match>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Theft = LazyLoading extends LazyLoadingDisabled ? EagerTheft : LazyTheft

export declare const Theft: (new (init: ModelInit<Theft, TheftMetaData>) => Theft) & {
  copyOf(source: Theft, mutator: (draft: MutableModel<Theft, TheftMetaData>) => MutableModel<Theft, TheftMetaData> | void): Theft;
}

type EagerSeller = {
  readonly id: string;
  readonly notes?: string | null;
  readonly flagged?: boolean | null;
  readonly advertisements?: (Advertisement | null)[] | null;
  readonly aliasesAsFirstSeller?: (SellerAlias | null)[] | null;
  readonly aliasesAsSecondSeller?: (SellerAlias | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySeller = {
  readonly id: string;
  readonly notes?: string | null;
  readonly flagged?: boolean | null;
  readonly advertisements: AsyncCollection<Advertisement>;
  readonly aliasesAsFirstSeller: AsyncCollection<SellerAlias>;
  readonly aliasesAsSecondSeller: AsyncCollection<SellerAlias>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Seller = LazyLoading extends LazyLoadingDisabled ? EagerSeller : LazySeller

export declare const Seller: (new (init: ModelInit<Seller, SellerMetaData>) => Seller) & {
  copyOf(source: Seller, mutator: (draft: MutableModel<Seller, SellerMetaData>) => MutableModel<Seller, SellerMetaData> | void): Seller;
}

type EagerSellerAlias = {
  readonly id: string;
  readonly firstSeller?: Seller | null;
  readonly secondSeller?: Seller | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySellerAlias = {
  readonly id: string;
  readonly firstSeller: AsyncItem<Seller | undefined>;
  readonly secondSeller: AsyncItem<Seller | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SellerAlias = LazyLoading extends LazyLoadingDisabled ? EagerSellerAlias : LazySellerAlias

export declare const SellerAlias: (new (init: ModelInit<SellerAlias, SellerAliasMetaData>) => SellerAlias) & {
  copyOf(source: SellerAlias, mutator: (draft: MutableModel<SellerAlias, SellerAliasMetaData>) => MutableModel<SellerAlias, SellerAliasMetaData> | void): SellerAlias;
}