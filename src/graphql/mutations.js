/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAdvertisement = /* GraphQL */ `
  mutation CreateAdvertisement(
    $input: CreateAdvertisementInput!
    $condition: ModelAdvertisementConditionInput
  ) {
    createAdvertisement(input: $input, condition: $condition) {
      id
      title
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
      title
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
      title
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
      title
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
  }
`;
export const updateTheft = /* GraphQL */ `
  mutation UpdateTheft(
    $input: UpdateTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    updateTheft(input: $input, condition: $condition) {
      id
      title
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
  }
`;
export const deleteTheft = /* GraphQL */ `
  mutation DeleteTheft(
    $input: DeleteTheftInput!
    $condition: ModelTheftConditionInput
  ) {
    deleteTheft(input: $input, condition: $condition) {
      id
      title
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
  }
`;
export const createColor = /* GraphQL */ `
  mutation CreateColor(
    $input: CreateColorInput!
    $condition: ModelColorConditionInput
  ) {
    createColor(input: $input, condition: $condition) {
      name
      rgb
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateColor = /* GraphQL */ `
  mutation UpdateColor(
    $input: UpdateColorInput!
    $condition: ModelColorConditionInput
  ) {
    updateColor(input: $input, condition: $condition) {
      name
      rgb
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteColor = /* GraphQL */ `
  mutation DeleteColor(
    $input: DeleteColorInput!
    $condition: ModelColorConditionInput
  ) {
    deleteColor(input: $input, condition: $condition) {
      name
      rgb
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createBrand = /* GraphQL */ `
  mutation CreateBrand(
    $input: CreateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    createBrand(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateBrand = /* GraphQL */ `
  mutation UpdateBrand(
    $input: UpdateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    updateBrand(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteBrand = /* GraphQL */ `
  mutation DeleteBrand(
    $input: DeleteBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    deleteBrand(input: $input, condition: $condition) {
      name
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createAccount = /* GraphQL */ `
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
export const updateAccount = /* GraphQL */ `
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
export const deleteAccount = /* GraphQL */ `
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
export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
      id
      advertisement {
        id
        title
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
      }
      theft {
        id
        title
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
      matchAdvertisementId
      matchTheftId
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
      advertisement {
        id
        title
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
      }
      theft {
        id
        title
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
      matchAdvertisementId
      matchTheftId
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
      advertisement {
        id
        title
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
      }
      theft {
        id
        title
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
      matchAdvertisementId
      matchTheftId
    }
  }
`;
