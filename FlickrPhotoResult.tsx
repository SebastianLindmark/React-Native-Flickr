

export interface FlickrPhoto {
    id : number,
    owner : string,
    title : string,
    farm : number,
    secret : string,
    server : string,
    url? : string
  }

export interface FlickrPhotoResult {
    page : number,
    pages : number,
    photo : FlickrPhoto[]
}



  