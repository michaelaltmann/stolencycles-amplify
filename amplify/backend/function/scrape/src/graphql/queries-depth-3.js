/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAdvertisement = /* GraphQL */ `
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
      status
      postDate
      sortOrder
      matches {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      advertisementSellerId
    }
  }
`;
export const listAdvertisements = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const syncAdvertisements = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const getTheft = /* GraphQL */ `
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listThefts = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const syncThefts = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const getSeller = /* GraphQL */ `
  query GetSeller($id: ID!) {
    getSeller(id: $id) {
      id
      url
      name
      images
      notes
      aliasesAsFirstSeller {
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
      aliasesAsSecondSeller {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSellers = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const syncSellers = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const getSellerAlias = /* GraphQL */ `
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
      secondSellerId
      secondSeller {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listSellerAliases = /* GraphQL */ `
  query ListSellerAliases(
    $filter: ModelSellerAliasFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellerAliases(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSellerAliases = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const getBrand = /* GraphQL */ `
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
export const listBrands = /* GraphQL */ `
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
export const syncBrands = /* GraphQL */ `
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
export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      images
      name
      aliases {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      accountAliasesId
    }
  }
`;
export const listAccounts = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const syncAccounts = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const getMatch = /* GraphQL */ `
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
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listMatches = /* GraphQL */ `
  query ListMatches(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncMatches = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const advertisementsByPlatformId = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const advertisementsByBrandColor = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const advertisementsByStatusPostDateId = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const theftsByPlatformId = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const theftsByBrandColor = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const theftsByStatusPostDateId = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const byFirstSeller = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const bySecondSeller = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const matchesByStatusAdvertisementId = /* GraphQL */ `
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
      nextToken
      startedAt
    }
  }
`;
export const matchesByStatusTheftId = /* GraphQL */ `
  query MatchesByStatusTheftId(
    $status: MatchStatus!
    $theftId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchesByStatusTheftId(
      status: $status
      theftId: $theftId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
