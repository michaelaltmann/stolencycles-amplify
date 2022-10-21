// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Platform = {
  "MARKETPLACE": "MARKETPLACE",
  "OFFERUP": "OFFERUP",
  "CRAIGSLIST": "CRAIGSLIST",
  "OTHER": "OTHER"
};

const AdvertisementStatus = {
  "UNREVIEWED": "UNREVIEWED",
  "REVIEWED": "REVIEWED",
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

const { Advertisement, Theft, Color, Brand, Account, Match } = initSchema(schema);

export {
  Advertisement,
  Theft,
  Color,
  Brand,
  Account,
  Match,
  Platform,
  AdvertisementStatus,
  TheftStatus,
  MatchStatus
};