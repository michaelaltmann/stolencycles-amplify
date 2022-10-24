/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdvertisement = /* GraphQL */ `
  subscription OnCreateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onCreateAdvertisement(filter: $filter) {
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
export const onUpdateAdvertisement = /* GraphQL */ `
  subscription OnUpdateAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onUpdateAdvertisement(filter: $filter) {
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
export const onDeleteAdvertisement = /* GraphQL */ `
  subscription OnDeleteAdvertisement(
    $filter: ModelSubscriptionAdvertisementFilterInput
  ) {
    onDeleteAdvertisement(filter: $filter) {
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
export const onCreateTheft = /* GraphQL */ `
  subscription OnCreateTheft($filter: ModelSubscriptionTheftFilterInput) {
    onCreateTheft(filter: $filter) {
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
export const onUpdateTheft = /* GraphQL */ `
  subscription OnUpdateTheft($filter: ModelSubscriptionTheftFilterInput) {
    onUpdateTheft(filter: $filter) {
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
export const onDeleteTheft = /* GraphQL */ `
  subscription OnDeleteTheft($filter: ModelSubscriptionTheftFilterInput) {
    onDeleteTheft(filter: $filter) {
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
export const onCreateColor = /* GraphQL */ `
  subscription OnCreateColor($filter: ModelSubscriptionColorFilterInput) {
    onCreateColor(filter: $filter) {
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
export const onUpdateColor = /* GraphQL */ `
  subscription OnUpdateColor($filter: ModelSubscriptionColorFilterInput) {
    onUpdateColor(filter: $filter) {
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
export const onDeleteColor = /* GraphQL */ `
  subscription OnDeleteColor($filter: ModelSubscriptionColorFilterInput) {
    onDeleteColor(filter: $filter) {
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
export const onCreateBrand = /* GraphQL */ `
  subscription OnCreateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onCreateBrand(filter: $filter) {
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
export const onUpdateBrand = /* GraphQL */ `
  subscription OnUpdateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onUpdateBrand(filter: $filter) {
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
export const onDeleteBrand = /* GraphQL */ `
  subscription OnDeleteBrand($filter: ModelSubscriptionBrandFilterInput) {
    onDeleteBrand(filter: $filter) {
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
export const onCreateAccount = /* GraphQL */ `
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
export const onUpdateAccount = /* GraphQL */ `
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
export const onDeleteAccount = /* GraphQL */ `
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
export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onCreateMatch(filter: $filter) {
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
export const onUpdateMatch = /* GraphQL */ `
  subscription OnUpdateMatch($filter: ModelSubscriptionMatchFilterInput) {
    onUpdateMatch(filter: $filter) {
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
export const onDeleteMatch = /* GraphQL */ `
  subscription OnDeleteMatch($filter: ModelSubscriptionMatchFilterInput) {
    onDeleteMatch(filter: $filter) {
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
