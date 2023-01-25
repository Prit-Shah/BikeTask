const request = require('supertest')
const BASE_URL = "http://localhost:3001";
const MOCK_USER = {
    name: `testprit`,
    email: `test${Math.random() * 1000}@gmail.com`,
    phone: `9157099824`,
    password: `Random!@#$1234`
};
let token = '';
let userid = '';
let newuserid = '';
let newbikeid = '';
beforeAll(async () => {
    const response = await request(BASE_URL)
        .get('/user/login')
        .send({ email: "testprit@gmail.com", password: "prit!@#$1234" })
        .expect(200);
    token = response.body.token;
    userid = response.body._id;
});
describe('User POST Test', () => {
    test('Create User', async () => {
        const response = await request(BASE_URL)
            .post('/user/signup')
            .send({
                name: `testprit`,
                email: `test${Math.random() * 1000}@gmail.com`,
                phone: 9157099824,
                password: `Random!@#$1234`
            })
            .expect(201);
        newuserid = response.body[0]._id;
    })
});

describe('Bike Type POST Test', () => {
    test('Create BikeType', async () => {
        const response = await request(BASE_URL)
            .post('/biketype')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `testType${Math.random() * 10000}`,
                createdBy: userid,
            })
            .expect(201);
        newuserid = response.body[0]._id;
    })
});

describe('Bike Type GET Test', () => {
    test('Create BikeType', async () => {
        const response = await request(BASE_URL)
            .get('/biketype')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        newuserid = response.body[0]._id;
    })
});

describe('User GET Test', () => {
    it('User Photo', async () => {
        await request(BASE_URL)
            .get('/user/file/photo-1674632957594.jpg')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });
});

describe('Bike POST Test', () => {
    it('Add bike', async () => {
        const response = await request(BASE_URL)
            .post('/bike')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: `Splendor${Math.random() * 1000}`,
                createdBy: userid,
                typeID: `63d0ec779bec0c336018f51d`,
            })
            .expect(201)
        newbikeid = response.body[0]._id;
        console.log(newbikeid)
    });

    it('Add Like', async () => {
        await request(BASE_URL)
            .post(`/bike/like/63d0e71da0fce41f84f79f46`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: newuserid
            })
            .expect(201)
    });

    it('Add DisLike', async () => {
        await request(BASE_URL)
            .post(`/bike/dislike/63d0e71da0fce41f84f79f46`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: newuserid
            })
            .expect(201)
    });

    it('Add Comment', async () => {
        await request(BASE_URL)
            .post(`/bike/like/63d0e71da0fce41f84f79f46`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: newuserid,
                comment: `Good`
            })
            .expect(201)
    });
});

describe('Bike PATCH Test', () => {
    it('Edit Bike', async () => {
        await request(BASE_URL)
            .patch(`/bike/${newbikeid}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ name: `Ninja Kawa${Math.random() * 10000}` })
            .expect(204)
    });
});

describe('Bike GET Test', () => {
    it('Get bikes', async () => {
        await request(BASE_URL)
            .get('/bike')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('Get bikes By Type', async () => {
        await request(BASE_URL)
            .get('/bike/type/63d0ec779bec0c336018f51d')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('Get Recent registered By Numbers', async () => {
        await request(BASE_URL)
            .get('/bike/recent/5')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('Get MostLiked By Numbers', async () => {
        await request(BASE_URL)
            .get('/bike/mostliked/5')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('Get Bike Photo', async () => {
        await request(BASE_URL)
            .get('/bike/file/photo-1674635037519.jpg')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

});


describe('Bike DELETE', () => {
    it('Delete Bike', async () => {
        await request(BASE_URL)
            .delete(`/bike/${newbikeid}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(202)
    })
})

