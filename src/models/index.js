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

const { Advertisement, Match, Theft, Seller, SellerAlias } = initSchema(schema);

export {
  Advertisement,
  Match,
  Theft,
  Seller,
  SellerAlias,
  AdvertisementPlatform,
  AdvertisementStatus,
  TheftPlatform,
  TheftStatus,
  MatchStatus
};