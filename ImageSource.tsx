import {FlickrPhotoResult} from './FlickrPhotoResult'


export default interface ImageSource {


    fetchImages(category : string, offset : number) : Promise<FlickrPhotoResult>;

}