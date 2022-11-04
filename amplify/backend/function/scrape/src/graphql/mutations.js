"use strict";
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMatch = exports.updateMatch = exports.createMatch = exports.deleteAccount = exports.updateAccount = exports.createAccount = exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.deleteSellerAlias = exports.updateSellerAlias = exports.createSellerAlias = exports.deleteSeller = exports.updateSeller = exports.createSeller = exports.deleteTheft = exports.updateTheft = exports.createTheft = exports.deleteAdvertisement = exports.updateAdvertisement = exports.createAdvertisement = void 0;
exports.createAdvertisement = `
  mutation CreateAdvertisement(
    $input: CreateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    createAdvertisement(input: $input, condition: $condition) {
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
exports.updateAdvertisement = `
  mutation UpdateAdvertisement(
    $input: UpdateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    updateAdvertisement(input: $input, condition: $condition) {
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
exports.deleteAdvertisement = `
  mutation DeleteAdvertisement(
    $input: DeleteAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    deleteAdvertisement(input: $input, condition: $condition) {
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
exports.createTheft = `
  mutation CreateTheft(
    $input: CreateTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    createTheft(input: $input, condition: $condition) {
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
exports.updateTheft = `
  mutation UpdateTheft(
    $input: UpdateTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    updateTheft(input: $input, condition: $condition) {
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
exports.deleteTheft = `
  mutation DeleteTheft(
    $input: DeleteTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    deleteTheft(input: $input, condition: $condition) {
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
exports.createSeller = `
  mutation CreateSeller(
    $input: CreateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    createSeller(input: $input, condition: $condition) {
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
exports.updateSeller = `
  mutation UpdateSeller(
    $input: UpdateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    updateSeller(input: $input, condition: $condition) {
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
exports.deleteSeller = `
  mutation DeleteSeller(
    $input: DeleteSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    deleteSeller(input: $input, condition: $condition) {
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
exports.createBrand = `
  mutation CreateBrand(
    $input: CreateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    createBrand(input: $input, condition: $condition) {
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
exports.updateBrand = `
  mutation UpdateBrand(
    $input: UpdateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    updateBrand(input: $input, condition: $condition) {
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
exports.deleteBrand = `
  mutation DeleteBrand(
    $input: DeleteBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    deleteBrand(input: $input, condition: $condition) {
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
exports.createAccount = `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
exports.updateAccount = `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
exports.deleteAccount = `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
