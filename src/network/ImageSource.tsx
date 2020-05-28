import {WebImageResult} from '../components/WebResult'


export default interface ImageSource {
    fetchImages(category : string, offset : number) : Promise<WebImageResult>;
}