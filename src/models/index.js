// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AdvertisementPlatform = {
  "MARKETPLACE": "MARKETPLACE",
  "OFFERUP": "OFFERUP",
  "CRAIGSLIST": "CRAIGSLIST",
  "PROSCLOSET": "PROSCLOSET",
  "NEXTDOOR": "NEXTDOOR",
  "EBAY": "EBAY",
  "OTHER": "OTHER"
};

const AdvertisementStatus = {
  "UNREVIEWED": "UNREVIEWED",
  "REVIEWED": "REVIEWED",
  "FLAGGED": "FLAGGED",
  "SOLD": "SOLD",
  "JUNK": "JUNK"
};

const TheftPlatform = {
  "FACEBOOK": "FACEBOOK",
  "BIKEINDEX": "BIKEINDEX",
  "PROJECT529": "PROJECT529",
  "NCIC": "NCIC",
  "OTHER": "OTHER"
};

const TheftStatus = {
  "UNREVIEWED": "UNREVIEWED",
  "REVIEWED": "REVIEWED",
  "RECOVERED": "RECOVERED"
};

const MatchStatus = {
  "UNREVIEWED": "UNREVIEWED",
  "MATCHED": "MATCHED",
  "MISMATCHED": "MISMATCHED"
};

const { Advertisement, Seller, SellerAlias, Match, Theft, Brand, Account } = initSchema(schema);

export {
  Advertisement,
  Seller,
  SellerAlias,
  Match,
  Theft,
  Brand,
  Account,
  AdvertisementPlatform,
  AdvertisementStatus,
  TheftPlatform,
  TheftStatus,
  MatchStatus
};