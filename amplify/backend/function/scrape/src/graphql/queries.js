"use strict";
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesByStatusAdvertisementId = exports.bySecondSeller = exports.byFirstSeller = exports.theftsByStatusPostDateId = exports.theftsByBrandColor = exports.theftsByPlatformId = exports.advertisementsByStatusPostDateId = exports.advertisementsByBrandColor = exports.advertisementsByPlatformId = exports.syncMatches = exports.listMatches = exports.getMatch = exports.syncAccounts = exports.listAccounts = exports.getAccount = exports.syncBrands = exports.listBrands = exports.getBrand = exports.syncSellerAliases = exports.listSellerAliases = exports.getSellerAlias = exports.syncSellers = exports.listSellers = exports.getSeller = exports.syncThefts = exports.listThefts = exports.getTheft = exports.syncAdvertisements = exports.listAdvertisements = exports.getAdvertisement = void 0;
exports.getAdvertisement = `
  query GetAdvertisement($id: ID!) {
    getAdvertisement(id: $id) {
      id
      platformName
      platformId
      title
      url
      price
      description
      model
      brand
      color
      images
      seller {
        id
        url
        name
        images
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      status
      postDate
      sortOrder
      matches {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      advertisementSellerId
    }
  }
`;
exports.listAdvertisements = `
  query ListAdvertisements(
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdvertisements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncAdvertisements = `
  query SyncAdvertisements(
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAdvertisements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      nextToken
      startedAt
    }
  }
`;
exports.getTheft = `
  query GetTheft($id: ID!) {
    getTheft(id: $id) {
      id
      platformName
      platformId
      title
      url
      description
      model
      brand
      color
      images
      status
      location
      postDate
      sortOrder
      matches {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
exports.listThefts = `
  query ListThefts(
    $filter: ModelTheftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThefts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncThefts = `
  query SyncThefts(
    $filter: ModelTheftFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncThefts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.getSeller = `
  query GetSeller($id: ID!) {
    getSeller(id: $id) {
      id
      url
      name
      images
      notes
      aliasesAsFirstSeller {
        nextToken
        startedAt
      }
      aliasesAsSecondSeller {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
exports.listSellers = `
  query ListSellers(
    $filter: ModelSellerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        name
        images
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncSellers = `
  query SyncSellers(
    $filter: ModelSellerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSellers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        url
        name
        images
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.getSellerAlias = `
  query GetSellerAlias($id: ID!) {
    getSellerAlias(id: $id) {
      id
      firstSellerId
      firstSeller {
        id
        url
        name
        images
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      secondSellerId
      secondSeller {
        id
        url
        name
        images
        notes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
exports.listSellerAliases = `
  query ListSellerAliases(
    $filter: ModelSellerAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellerAliases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstSellerId
        secondSellerId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncSellerAliases = `
  query SyncSellerAliases(
    $filter: ModelSellerAliasFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSellerAliases(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstSellerId
        secondSellerId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.getBrand = `
  query GetBrand($id: ID!) {
    getBrand(id: $id) {
      id
      name
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
exports.listBrands = `
  query ListBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncBrands = `
  query SyncBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBrands(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.getAccount = `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      images
      name
      aliases {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      accountAliasesId
    }
  }
`;
exports.listAccounts = `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        images
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        accountAliasesId
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncAccounts = `
  query SyncAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        images
        name
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        accountAliasesId
      }
      nextToken
      startedAt
    }
  }
`;
exports.getMatch = `
  query GetMatch($id: ID!) {
    getMatch(id: $id) {
      id
      advertisementId
      advertisement {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      theftId
      theft {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
exports.listMatches = `
  query ListMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        advertisementId
        theftId
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.syncMatches = `
  query SyncMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMatches(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        advertisementId
        theftId
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.advertisementsByPlatformId = `
  query AdvertisementsByPlatformId(
    $platformId: String!
    $platformName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    advertisementsByPlatformId(
      platformId: $platformId
      platformName: $platformName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      nextToken
      startedAt
    }
  }
`;
exports.advertisementsByBrandColor = `
  query AdvertisementsByBrandColor(
    $brand: String!
    $color: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    advertisementsByBrandColor(
      brand: $brand
      color: $color
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      nextToken
      startedAt
    }
  }
`;
exports.advertisementsByStatusPostDateId = `
  query AdvertisementsByStatusPostDateId(
    $status: AdvertisementStatus!
    $postDateId: ModelAdvertisementAdvertisementsByStatusPostDateIdCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAdvertisementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    advertisementsByStatusPostDateId(
      status: $status
      postDateId: $postDateId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        price
        description
        model
        brand
        color
        images
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        advertisementSellerId
      }
      nextToken
      startedAt
    }
  }
`;
exports.theftsByPlatformId = `
  query TheftsByPlatformId(
    $platformId: String!
    $platformName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTheftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theftsByPlatformId(
      platformId: $platformId
      platformName: $platformName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.theftsByBrandColor = `
  query TheftsByBrandColor(
    $brand: String!
    $color: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTheftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theftsByBrandColor(
      brand: $brand
      color: $color
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.theftsByStatusPostDateId = `
  query TheftsByStatusPostDateId(
    $status: TheftStatus!
    $postDateId: ModelTheftTheftsByStatusPostDateIdCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelTheftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    theftsByStatusPostDateId(
      status: $status
      postDateId: $postDateId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        platformName
        platformId
        title
        url
        description
        model
        brand
        color
        images
        status
        location
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.byFirstSeller = `
  query ByFirstSeller(
    $firstSellerId: ID!
    $secondSellerId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSellerAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    byFirstSeller(
      firstSellerId: $firstSellerId
      secondSellerId: $secondSellerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstSellerId
        secondSellerId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.bySecondSeller = `
  query BySecondSeller(
    $secondSellerId: ID!
    $firstSellerId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSellerAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bySecondSeller(
      secondSellerId: $secondSellerId
      firstSellerId: $firstSellerId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        firstSellerId
        secondSellerId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
exports.matchesByStatusAdvertisementId = `
  query MatchesByStatusAdvertisementId(
    $status: MatchStatus!
    $advertisementId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchesByStatusAdvertisementId(
      status: $status
      advertisementId: $advertisementId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        advertisementId
        theftId
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
