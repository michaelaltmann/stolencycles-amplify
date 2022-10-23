/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdvertisement = /* GraphQL */ `
  subscription OnCreateAdvertisement {
    onCreateAdvertisement {
      id
      title
      price
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnUpdateAdvertisement {
    onUpdateAdvertisement {
      id
      title
      price
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnDeleteAdvertisement {
    onDeleteAdvertisement {
      id
      title
      price
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnCreateTheft {
    onCreateTheft {
      id
      title
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnUpdateTheft {
    onUpdateTheft {
      id
      title
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnDeleteTheft {
    onDeleteTheft {
      id
      title
      description
      model
      brand
      color
      platformName
      platformId
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
  subscription OnCreateColor {
    onCreateColor {
      name
      rgb
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateColor = /* GraphQL */ `
  subscription OnUpdateColor {
    onUpdateColor {
      name
      rgb
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteColor = /* GraphQL */ `
  subscription OnDeleteColor {
    onDeleteColor {
      name
      rgb
      id
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateBrand = /* GraphQL */ `
  subscription OnCreateBrand {
    onCreateBrand {
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
  subscription OnUpdateBrand {
    onUpdateBrand {
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
  subscription OnDeleteBrand {
    onDeleteBrand {
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
  subscription OnCreateAccount {
    onCreateAccount {
      id
      platformName
      platformId
      images
      name
      aka {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      accountAkaId
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
      id
      platformName
      platformId
      images
      name
      aka {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      accountAkaId
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
      id
      platformName
      platformId
      images
      name
      aka {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      accountAkaId
    }
  }
`;
export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch {
    onCreateMatch {
      id
      advertisement {
        id
        title
        price
        description
        model
        brand
        color
        platformName
        platformId
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
        platformName
        platformId
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
  subscription OnUpdateMatch {
    onUpdateMatch {
      id
      advertisement {
        id
        title
        price
        description
        model
        brand
        color
        platformName
        platformId
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
        platformName
        platformId
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
  subscription OnDeleteMatch {
    onDeleteMatch {
      id
      advertisement {
        id
        title
        price
        description
        model
        brand
        color
        platformName
        platformId
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
        platformName
        platformId
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
