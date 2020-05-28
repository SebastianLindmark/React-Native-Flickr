import ImageSource from './ImageSource'
import { FlickrPhotoResult, FlickrPhoto } from './FlickrPhotoResult'


const fetchApiKey = (): Promise<string> => {
    return Promise.resolve("de2bb026d615a8dee6975bdaafaf767b"); //Should be fetched from server
}

const constructBaseUrl = (apiKey: string, category: string, offset: number): string => {

    return `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${category}&privacy_filter=1&safe_search=1&content_type=1&per_page=20&page=${offset}&format=json&nojsoncallback=1`;
}

const constructImageUrl = (photo: FlickrPhoto): string => {
    return `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
}

const fetchImages = (category: string, offset: number): Promise<FlickrPhotoResult> => {

    return fetchApiKey()
        .then(apiKey => fetch(constructBaseUrl(apiKey, category, offset)))
        .then(checkResponse)
        .then(json => {
            
            const result: FlickrPhotoResult = json.photos;
            result.photo.map(photo => photo.url = constructImageUrl(photo))
            return result

        }).catch(err => {
            console.error(err.message);
            throw err;
        })
}

const checkResponse = (response: Response) : Promise<any> => {
    
    if(!response.ok){
        Promise.reject("Unable to fetch images: " + response.text());
    }

    return response.json()
    .then(json => {
        if(json.code == 100){
            return Promise.reject(new Error("Expired API key"));
        }
        return json;
    });
    
    
}



let implementation = {} as ImageSource;
implementation.fetchImages = fetchImages;
export default implementation;
