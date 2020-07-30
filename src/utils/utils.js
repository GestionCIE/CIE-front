export const getNameResource = (url) => {
    const urlBreak = url.split('/');
    return urlBreak[urlBreak.length - 1];
}

