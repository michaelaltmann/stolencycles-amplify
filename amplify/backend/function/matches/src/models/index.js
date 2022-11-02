"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchStatus = exports.TheftStatus = exports.TheftPlatform = exports.AdvertisementStatus = exports.AdvertisementPlatform = void 0;
var AdvertisementPlatform;
(function (AdvertisementPlatform) {
    AdvertisementPlatform["MARKETPLACE"] = "MARKETPLACE";
    AdvertisementPlatform["OFFERUP"] = "OFFERUP";
    AdvertisementPlatform["CRAIGSLIST"] = "CRAIGSLIST";
    AdvertisementPlatform["PROSCLOSET"] = "PROSCLOSET";
    AdvertisementPlatform["NEXTDOOR"] = "NEXTDOOR";
    AdvertisementPlatform["EBAY"] = "EBAY";
    AdvertisementPlatform["OTHER"] = "OTHER";
})(AdvertisementPlatform = exports.AdvertisementPlatform || (exports.AdvertisementPlatform = {}));
var AdvertisementStatus;
(function (AdvertisementStatus) {
    AdvertisementStatus["UNREVIEWED"] = "UNREVIEWED";
    AdvertisementStatus["REVIEWED"] = "REVIEWED";
    AdvertisementStatus["FLAGGED"] = "FLAGGED";
    AdvertisementStatus["SOLD"] = "SOLD";
    AdvertisementStatus["JUNK"] = "JUNK";
})(AdvertisementStatus = exports.AdvertisementStatus || (exports.AdvertisementStatus = {}));
var TheftPlatform;
(function (TheftPlatform) {
    TheftPlatform["FACEBOOK"] = "FACEBOOK";
    TheftPlatform["BIKEINDEX"] = "BIKEINDEX";
    TheftPlatform["PROJECT529"] = "PROJECT529";
    TheftPlatform["NCIC"] = "NCIC";
    TheftPlatform["OTHER"] = "OTHER";
})(TheftPlatform = exports.TheftPlatform || (exports.TheftPlatform = {}));
var TheftStatus;
(function (TheftStatus) {
    TheftStatus["UNREVIEWED"] = "UNREVIEWED";
    TheftStatus["REVIEWED"] = "REVIEWED";
    TheftStatus["RECOVERED"] = "RECOVERED";
})(TheftStatus = exports.TheftStatus || (exports.TheftStatus = {}));
var MatchStatus;
(function (MatchStatus) {
    MatchStatus["UNREVIEWED"] = "UNREVIEWED";
    MatchStatus["MATCHED"] = "MATCHED";
    MatchStatus["MISMATCHED"] = "MISMATCHED";
})(MatchStatus = exports.MatchStatus || (exports.MatchStatus = {}));
