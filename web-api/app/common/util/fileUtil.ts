export class FileUtil {

    static specialFiles: object = [];

    static isExtension(file, extension) {
        return file.substr(-(extension.length)) === extension;
    }

    static isSpecialFile(file, extension) {
        let fileName = file.slice(0, file.length - extension.length);
        return fileName.indexOf(this.specialFiles) !== -1;
    }

    static swapExtension(file, oldExtension, newExtension) {
        let newFile = file.slice(0, file.length - oldExtension.length);
        return newFile + newExtension;
    }
}
