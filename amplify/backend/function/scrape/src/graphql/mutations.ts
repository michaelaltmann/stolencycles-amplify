/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdvertisement = /* GraphQL */ `
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
export const updateAdvertisement = /* GraphQL */ `
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
export const deleteAdvertisement = /* GraphQL */ `
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
export const createTheft = /* GraphQL */ `
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
export const updateTheft = /* GraphQL */ `
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
export const deleteTheft = /* GraphQL */ `
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
export const createSeller = /* GraphQL */ `
  mutation CreateSeller(
    $input: CreateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    createSeller(input: $input, condition: $condition) {
      id
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
export const updateSeller = /* GraphQL */ `
  mutation UpdateSeller(
    $input: UpdateSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    updateSeller(input: $input, condition: $condition) {
      id
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
export const deleteSeller = /* GraphQL */ `
  mutation DeleteSeller(
    $input: DeleteSellerInput!
    $condition: ModelSellerConditionInput
  ) {
    deleteSeller(input: $input, condition: $condition) {
      id
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
export const createSellerAlias = /* GraphQL */ `
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
export const updateSellerAlias = /* GraphQL */ `
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
export const deleteSellerAlias = /* GraphQL */ `
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
export const createMatch = /* GraphQL */ `
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
export const updateMatch = /* GraphQL */ `
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
export const deleteMatch = /* GraphQL */ `
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
