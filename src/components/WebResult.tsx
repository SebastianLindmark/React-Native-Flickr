

export class WebImage {
  url: string
  constructor(url: string) {
    this.url = url;
  }
}

export class WebImageResult {
  offset : number
  images : WebImage[];
  constructor(images? : WebImage[], offset? : number){
    this.offset = offset || 0;
    this.images = images || [];
  }
}

