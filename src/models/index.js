// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AdvertisementStatus = {
  "UNREVIEWED": "UNREVIEWED",
  "REVIEWED": "REVIEWED",
  "FLAGGED": "FLAGGED",
  "SOLD": "SOLD",
  "JUNK": "JUNK"
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

const AdvertisementPlatform = {
  "MARKETPLACE": "MARKETPLACE",
  "OFFERUP": "OFFERUP",
  "CRAIGSLIST": "CRAIGSLIST",
  "PROSCLOSET": "PROSCLOSET",
  "NEXTDOOR": "NEXTDOOR",
  "EBAY": "EBAY",
  "OTHER": "OTHER"
};

const TheftPlatform = {
  "FACEBOOK": "FACEBOOK",
  "BIKEINDEX": "BIKEINDEX",
  "PROJECT529": "PROJECT529",
  "NCIC": "NCIC",
  "OTHER": "OTHER"
};

const { Advertisement, Seller, SellerAlias, Theft, Brand, Account, Match } = initSchema(schema);

export {
  Advertisement,
  Seller,
  SellerAlias,
  Theft,
  Brand,
  Account,
  Match,
  AdvertisementStatus,
  TheftStatus,
  MatchStatus,
  AdvertisementPlatform,
  TheftPlatform
};