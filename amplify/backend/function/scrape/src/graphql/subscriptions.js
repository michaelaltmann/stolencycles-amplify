"use strict";
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDeleteMatch = exports.onUpdateMatch = exports.onCreateMatch = exports.onDeleteSellerAlias = exports.onUpdateSellerAlias = exports.onCreateSellerAlias = exports.onDeleteSeller = exports.onUpdateSeller = exports.onCreateSeller = exports.onDeleteTheft = exports.onUpdateTheft = exports.onCreateTheft = exports.onDeleteAdvertisement = exports.onUpdateAdvertisement = exports.onCreateAdvertisement = void 0;
exports.onCreateAdvertisement = `
  subscription OnCreateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onCreateAdvertisement(filter: $filter) {
      id
      title
      url
      price
      description
      model
      brand
      color
      images
      sellerId
      sellerName
      sellerImage
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
    }
  }
`;
exports.onUpdateAdvertisement = `
  subscription OnUpdateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onUpdateAdvertisement(filter: $filter) {
      id
      title
      url
      price
      description
      model
      brand
      color
      images
      sellerId
      sellerName
      sellerImage
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
    }
  }
`;
exports.onDeleteAdvertisement = `
  subscription OnDeleteAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onDeleteAdvertisement(filter: $filter) {
      id
      title
      url
      price
      description
      model
      brand
      color
      images
      sellerId
      sellerName
      sellerImage
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
    }
  }
`;
exports.onCreateTheft = `
  subscription OnCreateTheft($filter: ModelSubscriptionTheftFilterInput) {
    onCreateTheft(filter: $filter) {
      id
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
      notes
      flagged
      advertisements {
        nextToken
        startedAt
      }
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
      notes
      flagged
      advertisements {
        nextToken
        startedAt
      }
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
      notes
      flagged
      advertisements {
        nextToken
        startedAt
      }
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
        notes
        flagged
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      secondSellerId
      secondSeller {
        id
        notes
        flagged
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
        notes
        flagged
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      secondSellerId
      secondSeller {
        id
        notes
        flagged
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
        notes
        flagged
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      secondSellerId
      secondSeller {
        id
        notes
        flagged
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
exports.onCreateMatch = `
  subscription OnCreateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onCreateMatch(filter: $filter) {
      id
      advertisementId
      advertisement {
        id
        title
        url
        price
        description
        model
        brand
        color
        images
        sellerId
        sellerName
        sellerImage
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      theftId
      theft {
        id
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
        title
        url
        price
        description
        model
        brand
        color
        images
        sellerId
        sellerName
        sellerImage
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      theftId
      theft {
        id
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
        title
        url
        price
        description
        model
        brand
        color
        images
        sellerId
        sellerName
        sellerImage
        status
        postDate
        sortOrder
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      theftId
      theft {
        id
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
