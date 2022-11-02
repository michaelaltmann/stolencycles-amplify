"use strict";
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDeleteMatch = exports.onUpdateMatch = exports.onCreateMatch = exports.onDeleteAccount = exports.onUpdateAccount = exports.onCreateAccount = exports.onDeleteBrand = exports.onUpdateBrand = exports.onCreateBrand = exports.onDeleteSellerAlias = exports.onUpdateSellerAlias = exports.onCreateSellerAlias = exports.onDeleteSeller = exports.onUpdateSeller = exports.onCreateSeller = exports.onDeleteTheft = exports.onUpdateTheft = exports.onCreateTheft = exports.onDeleteAdvertisement = exports.onUpdateAdvertisement = exports.onCreateAdvertisement = void 0;
exports.onCreateAdvertisement = `
  subscription OnCreateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onCreateAdvertisement(filter: $filter) {
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
exports.onUpdateAdvertisement = `
  subscription OnUpdateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onUpdateAdvertisement(filter: $filter) {
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
exports.onDeleteAdvertisement = `
  subscription OnDeleteAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onDeleteAdvertisement(filter: $filter) {
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
exports.onCreateTheft = `
  subscription OnCreateTheft($filter: ModelSubscriptionTheftFilterInput) {
    onCreateTheft(filter: $filter) {
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
exports.onUpdateTheft = `
  subscription OnUpdateTheft($filter: ModelSubscriptionTheftFilterInput) {
    onUpdateTheft(filter: $filter) {
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
exports.onDeleteTheft = `
  subscription OnDeleteTheft($filter: ModelSubscriptionTheftFilterInput) {
    onDeleteTheft(filter: $filter) {
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
exports.onCreateSeller = `
  subscription OnCreateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onCreateSeller(filter: $filter) {
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
exports.onUpdateSeller = `
  subscription OnUpdateSeller($filter: ModelSubscriptionSellerFilterInput) {
    onUpdateSeller(filter: $filter) {
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
exports.onDeleteSeller = `
  subscription OnDeleteSeller($filter: ModelSubscriptionSellerFilterInput) {
    onDeleteSeller(filter: $filter) {
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
exports.onCreateSellerAlias = `
  subscription OnCreateSellerAlias(
    $filter: ModelSubscriptionSellerAliasFilterInput
  ) {
    onCreateSellerAlias(filter: $filter) {
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
exports.onUpdateSellerAlias = `
  subscription OnUpdateSellerAlias(
    $filter: ModelSubscriptionSellerAliasFilterInput
  ) {
    onUpdateSellerAlias(filter: $filter) {
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
exports.onDeleteSellerAlias = `
  subscription OnDeleteSellerAlias(
    $filter: ModelSubscriptionSellerAliasFilterInput
  ) {
    onDeleteSellerAlias(filter: $filter) {
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
exports.onCreateBrand = `
  subscription OnCreateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onCreateBrand(filter: $filter) {
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
exports.onUpdateBrand = `
  subscription OnUpdateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onUpdateBrand(filter: $filter) {
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
exports.onDeleteBrand = `
  subscription OnDeleteBrand($filter: ModelSubscriptionBrandFilterInput) {
    onDeleteBrand(filter: $filter) {
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
exports.onCreateAccount = `
  subscription OnCreateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onCreateAccount(filter: $filter) {
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
exports.onUpdateAccount = `
  subscription OnUpdateAccount($filter: ModelSubscriptionAccountFilterInput) {
    onUpdateAccount(filter: $filter) {
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
exports.onDeleteAccount = `
  subscription OnDeleteAccount($filter: ModelSubscriptionAccountFilterInput) {
    onDeleteAccount(filter: $filter) {
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
exports.onCreateMatch = `
  subscription OnCreateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onCreateMatch(filter: $filter) {
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
exports.onUpdateMatch = `
  subscription OnUpdateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onUpdateMatch(filter: $filter) {
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
exports.onDeleteMatch = `
  subscription OnDeleteMatch($filter: ModelSubscriptionMatchFilterInput) {
    onDeleteMatch(filter: $filter) {
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
