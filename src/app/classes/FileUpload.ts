export class FileUpload {
  name: string;
  size: string;
  type: number;
  url: string;

  constructor(init: any) {
    this.name = init.name;
    this.type  = init.type;
    this.url = init.url;
    this.size = init.size
  }
}
