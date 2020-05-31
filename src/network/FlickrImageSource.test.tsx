import { shallow, ShallowWrapper, mount, ReactWrapper, render } from 'enzyme';
import React from 'react';

import { WebImage } from '../components/WebResult';
import FlickrImageSource, { FlickrPhotoResult, FlickrPhoto } from './FlickrImageSource';



const mockImages = [...Array(5)].map((_item, idx) =>
    ({
        url: 'http://test.com',
        title: 'Test image',
        id: idx,
        farm: idx,
        owner: 'owner',
        secret: 'secret',
        server: 'server',
    }) as FlickrPhoto
);

const mockResponse = {
    page: 0,
    pages: 0,
    photo: mockImages

} as FlickrPhotoResult;


const constructValidMockResponse = () => {
    return Promise.resolve({
        json: () => Promise.resolve({ 'photos': mockResponse }),
        text: () => '',
        ok : true,
    })
}

const constructInvalidMockResponse = () => {

    return Promise.resolve({
        json: () => Promise.resolve({ 'photos': mockResponse }),
        text: () => '',
        ok: false,
        code: 100
    })


}


describe("App", () => {


    afterEach(() => {
        jest.resetAllMocks();
    })

    it("should receive valid Flickr response", async () => {

        jest.spyOn(global, 'fetch').mockImplementation((): Promise<any> =>
            constructValidMockResponse()
        );


        const response = await FlickrImageSource.fetchImages('dogs', 0);
        response.images.map((image, idx) => {
            expect(image.url).toBe(`http://farm${idx}.staticflickr.com/server/${idx}_secret.jpg`)
        })

    });

    it("should receive exception from Flickr response", async () => {

        jest.spyOn(global, 'fetch').mockImplementation((): Promise<any> =>
            constructInvalidMockResponse()
        );
        
        await FlickrImageSource.fetchImages('dogs', 0).catch(e => {
            expect(e).toContain('Unable to fetch')
        })
        
    });


});