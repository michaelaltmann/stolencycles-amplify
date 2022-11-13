const AWS = require('aws-sdk')


const tableName = "Match";
const config = {
    region: 'us-east-1'
    // , endpoint: "http://localhost:8000"
}
AWS.config.update(config);
const MatchDao = require('./MatchDao')
const dao = new MatchDao(AWS)


/**
 * Check every active ad against every active theft
 */
test.only('checkAdvertisements', async () => {
    let newMatches = await dao.checkAdvertisements()
    console.log(JSON.stringify(newMatches, null, 3))
    expect(newMatches.length > 0)
    const { Items } = await dao.listAll({ Limit: 100 })
    console.log(JSON.stringify(Items, null, 3))
}
)

/**
 * Check every active theft against every active ad
 */
test('checkThefts', async () => {
    let newMatches = await dao.checkThefts()
    console.log(JSON.stringify(newMatches, null, 3))
    expect(newMatches.length > 0)
    const { Items } = await dao.listAll({ Limit: 100 })
    console.log(JSON.stringify(Items, null, 3))
}
)

const checkAdvertisementById = async (advertisementId) => {
    await dao.truncate()
    const AdvertisementDao = require('./AdvertisementDao')
    const advertisementDao = new AdvertisementDao(AWS)
    let newMatches = await dao.checkAdvertisement(
        await advertisementDao.get(advertisementId)
    )
    newMatches.forEach(
        (item) => {
            console.log('ad:' + item.advertisementId + ' theft:' + item.theftId)
        }
    )
    expect(newMatches.length > 0)
    const { Items } = await dao.listAll({ Limit: 100 })
    Items.forEach(
        (item) => {
            console.log('ad:' + item.advertisementId + ' theft:' + item.theftId)
        }
    )

}

test('checkAdvertisementTrek', async () => {
    await checkAdvertisementById('16684b1c-3892-44a3-9ebb-b769b3f87827')
}
)
test('checkAdvertisementSpecialized', async () => {
    await checkAdvertisementById('c390ab20-e09f-4200-aa43-4e81d2dbac48')
}
)
test('checkTheft', async () => {
    await checkAdvertisementById('c390ab20-e09f-4200-aa43-4e81d2dbac48')
}
)

test('expand', async () => {
    let id = 0
    const now = new Date().toISOString()
    await dao.insert({
        advertisementId: '0c82f262-2bcb-44ff-ac10-3f1fee9a85f5',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })

    const match = await dao.get("0")
    expect(match.advertisementId != null)
    const expanded = dao.expand(match)
    expect(expanded.advertisementId === match.advertisementId)
    expect(expanded.advertisement != null)
    expect(expanded.theft != null)
}
)


test('listByStatus', async () => {
    let id = 0
    const now = new Date().toISOString()
    await dao.insert({
        advertisementId: '0c82f262-2bcb-44ff-ac10-3f1fee9a85f5',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: '1056f057-97e9-432f-a793-6b20418c41b8',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: '1056f057-97e9-432f-a793-6b20418c41b8',
        theftId: '1fdbdb9f-2e3e-4540-96e4-50d411bbf05e',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })


    const response = await dao.listByStatus({
        status: 'NeedsReview', Limit: 1
    })
    expect(response.LastEvaluatedKey).toBeDefined()
    const response2 = await dao.listByStatus({
        status: 'NeedsReview',
        Limit: 1,
        LastEvaluatedKey: response.LastEvaluatedKey
    })
    expect(response.Items[0].id.localeCompare(response2.Items[0].id) != 0)
    const { Items } = await dao.listByStatus({ status: 'NeedsReview', Limit: 3 })
    expect(Items.length).toBe(3)
}
)

test('deleteByAdvertisementId', async () => {
    let id = 0
    const now = new Date().toISOString()
    const advertisementId = '1056f057-97e9-432f-a793-6b20418c41b8'
    await dao.insert({
        advertisementId: '0c82f262-2bcb-44ff-ac10-3f1fee9a85f5',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: advertisementId,
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: advertisementId,
        theftId: '1fdbdb9f-2e3e-4540-96e4-50d411bbf05e',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })

    var matches = await dao.getByAdvertisementId(advertisementId)
    expect(matches.Items.length).toBe(2)

    await dao.deleteByAdvertisementId(advertisementId)
    matches = await dao.getByAdvertisementId(advertisementId)
    expect(matches.Items.length).toBe(0)

}
)

test('deleteByTheftId', async () => {
    let id = 0
    const now = new Date().toISOString()
    await dao.insert({
        advertisementId: '0c82f262-2bcb-44ff-ac10-3f1fee9a85f5',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: '1056f057-97e9-432f-a793-6b20418c41b8',
        theftId: '12eb9219-a75d-45ba-86b4-f45ffc33d131',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })
    await dao.insert({
        advertisementId: '1056f057-97e9-432f-a793-6b20418c41b8',
        theftId: '1fdbdb9f-2e3e-4540-96e4-50d411bbf05e',
        status: 'NeedsReview',
        id: '' + id++,
        postDate: now
    })

    await dao.deleteByTheftId('1fdbdb9f-2e3e-4540-96e4-50d411bbf05e')
    const response = await dao.listAll({
        status: 'NeedsReview',
        Limit: 10,
        expandItems: false
    })

    expect(response.Items.length).toBe(2)
}
)

/**
 * Rescore matches that are waiting for review
 * and delete any whose score is no longer positive.
 * This is usefule when the scoring algorithm changes.
 */
test("rescore", async () => {
    const { Items } = await dao.listAll({ Limit: 500, expandItems: true })

    await Promise.all(Items.map(async expanded => {
        const similarity = dao.similarity(expanded.advertisement, expanded.theft)
        console.log('ad:' + expanded.advertisement.id +
            " " + expanded.advertisement.brand +
            "/" + expanded.advertisement.color +
            '  theft:' + expanded.theft.id +
            " " + expanded.theft.brand +
            "/" + expanded.theft.color +

            ' similarity:' + similarity)

        if (similarity <= 0) {
            // Should not have been created in the first place
            await dao.delete(expanded)
        } else {
            await true
        }
    }
    )
    )

})

test("similarity matched brand", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity theft 4 days before ad", () => {
    const theft = {
        postDate: new Date("06/26/2019").toISOString(),
        brand: "Trek"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity theft 4 days after ad", () => {
    const theft = {
        postDate: new Date("06/26/2019").toISOString(),
        brand: "Trek"
    }
    const ad = {
        postDate: new Date("06/22/2019").toISOString(),
        brand: "Trek"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity theft 8 days after ad", () => {
    const theft = {
        postDate: new Date("06/28/2019").toISOString(),
        brand: "Trek"
    }
    const ad = {
        postDate: new Date("06/20/2019").toISOString(),
        brand: "Trek"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(false)
})

test("similarity mismatched brand", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Orbea"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity < 0).toBe(true)
})

test("similarity matched color", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "BLACK"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity mismatched color", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "RED"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(false)
})

test("similarity matched model", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black",
        modelName: "FX72"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "BLACK",
        modelName: "Fx 7.2 delux"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity matched model with number first", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black",
        modelName: "FX72"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "BLACK",
        modelName: "7.2 Fx 99"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity matched model without space", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black",
        modelName: "FX72"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "BLACK",
        modelName: "7.2Fx"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(true)
})

test("similarity mismatched model", () => {
    const theft = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "black",
        modelName: "FX"
    }
    const ad = {
        postDate: new Date("06/30/2019").toISOString(),
        brand: "Trek",
        color: "BLACK",
        modelName: "CrossRip"
    }
    const similarity = dao.similarity(ad, theft)
    expect(similarity > 0).toBe(false)
})

test('splitModel empty', () => {
    const split = dao.splitModel('')
    expect(split).toEqual({ modelSeries: '', modelNumber: '' })
})

test('splitModel alpha', () => {
    const split = dao.splitModel('FX')
    expect(split).toEqual({ modelSeries: 'fx', modelNumber: '' })
})


test('splitModel two words', () => {
    const split = dao.splitModel('FX carbon')
    expect(split).toEqual({ modelSeries: 'fx', modelNumber: '' })
})

test('splitModel two words and number', () => {
    const split = dao.splitModel('FX carbon 7.3 5')
    expect(split).toEqual({ modelSeries: 'fx', modelNumber: '73' })
})

test('splitModel number', () => {
    const split = dao.splitModel('4500')
    expect(split).toEqual({ modelSeries: '', modelNumber: '4500' })
})

test('splitModel number before word', () => {
    const split = dao.splitModel('4500 DX')
    expect(split).toEqual({ modelSeries: 'dx', modelNumber: '4500' })
})

