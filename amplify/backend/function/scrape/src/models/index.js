"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheftPlatform = exports.AdvertisementPlatform = exports.MatchStatus = exports.TheftStatus = exports.AdvertisementStatus = exports.SellerAlias = exports.Seller = exports.Theft = exports.Match = exports.Advertisement = void 0;
// @ts-check
const datastore_1 = require("@aws-amplify/datastore");
const schema_1 = require("./schema");
const AdvertisementStatus = {
    "UNREVIEWED": "UNREVIEWED",
    "REVIEWED": "REVIEWED",
    "FLAGGED": "FLAGGED",
    "SOLD": "SOLD",
    "JUNK": "JUNK"
};
exports.AdvertisementStatus = AdvertisementStatus;
const TheftStatus = {
    "UNREVIEWED": "UNREVIEWED",
    "REVIEWED": "REVIEWED",
    "RECOVERED": "RECOVERED"
};
exports.TheftStatus = TheftStatus;
const MatchStatus = {
    "UNREVIEWED": "UNREVIEWED",
    "MATCHED": "MATCHED",
    "MISMATCHED": "MISMATCHED"
};
exports.MatchStatus = MatchStatus;
const AdvertisementPlatform = {
    "MARKETPLACE": "MARKETPLACE",
    "OFFERUP": "OFFERUP",
    "CRAIGSLIST": "CRAIGSLIST",
    "PROSCLOSET": "PROSCLOSET",
    "NEXTDOOR": "NEXTDOOR",
    "EBAY": "EBAY",
    "OTHER": "OTHER"
};
exports.AdvertisementPlatform = AdvertisementPlatform;
const TheftPlatform = {
    "FACEBOOK": "FACEBOOK",
    "BIKEINDEX": "BIKEINDEX",
    "PROJECT529": "PROJECT529",
    "NCIC": "NCIC",
    "OTHER": "OTHER"
};
exports.TheftPlatform = TheftPlatform;
const { Advertisement, Match, Theft, Seller, SellerAlias } = (0, datastore_1.initSchema)(schema_1.schema);
exports.Advertisement = Advertisement;
exports.Match = Match;
exports.Theft = Theft;
exports.Seller = Seller;
exports.SellerAlias = SellerAlias;
