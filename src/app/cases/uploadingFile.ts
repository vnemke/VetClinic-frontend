export class uploadingFile {
    uploadFile: any;
    fileName: string;
    url: any;

    constructor(fileOrUrl: File | string, name?: string) {
        if (typeof fileOrUrl === 'string' && name) {
            this.url = fileOrUrl
            this.fileName = name
        } else {
            this.uploadFile = fileOrUrl
            this.fileName = this.uploadFile.name
        }
    }    
}