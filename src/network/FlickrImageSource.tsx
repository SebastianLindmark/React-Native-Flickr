import ImageSource from './ImageSource'
import { WebImage, WebImageResult } from '../components/WebResult';
import { InvalidApiKeyError, TimeoutError } from '../errors/CustomErrors'

export interface FlickrPhoto {
    id: number,
    owner: string,
    title: string,
    farm: number,
    secret: string,
    server: string,
    url: string
}

export interface FlickrPhotoResult {
    page: number,
    pages: number,
    photo: FlickrPhoto[]
}

const requestTimeoutMillis = 10000;

const fetchApiKey = (): Promise<string> => {
    return Promise.resolve("de2bb026d615a8dee6975bdaafaf767b"); //Should be fetched from server
}

const constructBaseUrl = (apiKey: string, category: string, offset: number): string => {
    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${category}&privacy_filter=1&safe_search=1&content_type=1&per_page=20&page=${offset}&format=json&nojsoncallback=1`;
}

const constructImageUrl = (photo: FlickrPhoto): string => {
    return `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
}

const timedoutFetch = (url: string, ms: number): Promise<any> => {

    const timeOut = new Promise((resolve, reject) => setTimeout(() => { reject(new TimeoutError('Request timed out')) }, ms));
    return Promise.race([
        fetch(url),
        timeOut
    ]);
}

const parseJsonResponse = (json: any): WebImageResult => {
    const flickrResult = (json.photos as FlickrPhotoResult)
    const images = flickrResult.photo
        .map(constructImageUrl)
        .map(url => new WebImage(url))

    return new WebImageResult(images, flickrResult.page);
}

const fetchImages = (category: string, offset: number): Promise<WebImageResult> => {

    return fetchApiKey()
        .then(apiKey => timedoutFetch(constructBaseUrl(apiKey, category, offset), requestTimeoutMillis))
        .then(checkResponse)
        .then(parseJsonResponse)
        .catch(err => {
            console.log(err.message);
            throw err;
        })
}

const checkResponse = (response: Response): Promise<any> => {

    if (!response.ok) {
        Promise.reject("Unable to fetch images: " + response.text());
    }

    return response.json()
        .then(json => {
            if (json.code == 100) {
                return Promise.reject(new InvalidApiKeyError("Expired API key"));
            }
            return json;
        });

}

export default { fetchImages: fetchImages } as ImageSource;

