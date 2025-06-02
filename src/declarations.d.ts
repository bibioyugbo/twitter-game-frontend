declare module 'dom-to-image-more' {
    const domToImage: {
        toBlob: (node: HTMLElement, options?: any) => Promise<Blob>;
        toPng: (node: HTMLElement, options?: any) => Promise<string>;
        toJpeg: (node: HTMLElement, options?: any) => Promise<string>;
        toSvg: (node: HTMLElement, options?: any) => Promise<string>;
        toPixelData: (node: HTMLElement, options?: any) => Promise<Uint8ClampedArray>;
    };
    export default domToImage;
}