"use strict";
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMatch = exports.updateMatch = exports.createMatch = exports.deleteSellerAlias = exports.updateSellerAlias = exports.createSellerAlias = exports.deleteSeller = exports.updateSeller = exports.createSeller = exports.deleteTheft = exports.updateTheft = exports.createTheft = exports.deleteAdvertisement = exports.updateAdvertisement = exports.createAdvertisement = void 0;
exports.createAdvertisement = `
  mutation CreateAdvertisement(
    $input: CreateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    createAdvertisement(input: $input, condition: $condition) {
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
exports.updateAdvertisement = `
  mutation UpdateAdvertisement(
    $input: UpdateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    updateAdvertisement(input: $input, condition: $condition) {
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
exports.deleteAdvertisement = `
  mutation DeleteAdvertisement(
    $input: DeleteAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    deleteAdvertisement(input: $input, condition: $condition) {
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
exports.createTheft = `
  mutation CreateTheft(
    $input: CreateTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    createTheft(input: $input, condition: $condition) {
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
exports.updateTheft = `
  mutation UpdateTheft(
    $input: UpdateTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    updateTheft(input: $input, condition: $condition) {
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
exports.deleteTheft = `
  mutation DeleteTheft(
    $input: DeleteTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    deleteTheft(input: $input, condition: $condition) {
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
exports.createSeller = `
  mutation CreateSeller(
    $input: CreateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    createSeller(input: $input, condition: $condition) {
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
exports.updateSeller = `
  mutation UpdateSeller(
    $input: UpdateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    updateSeller(input: $input, condition: $condition) {
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
exports.deleteSeller = `
  mutation DeleteSeller(
    $input: DeleteSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    deleteSeller(input: $input, condition: $condition) {
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
exports.createSellerAlias = `
  mutation CreateSellerAlias(
    $input: CreateSellerAliasInput!
    $condition: ModelSellerAliasConditionInput
  ) {
    createSellerAlias(input: $input, condition: $condition) {
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
exports.updateSellerAlias = `
  mutation UpdateSellerAlias(
    $input: UpdateSellerAliasInput!
    $condition: ModelSellerAliasConditionInput
  ) {
    updateSellerAlias(input: $input, condition: $condition) {
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
exports.deleteSellerAlias = `
  mutation DeleteSellerAlias(
    $input: DeleteSellerAliasInput!
    $condition: ModelSellerAliasConditionInput
  ) {
    deleteSellerAlias(input: $input, condition: $condition) {
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
exports.createMatch = `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
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
exports.updateMatch = `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
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
exports.deleteMatch = `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
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
