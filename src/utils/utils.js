export const getNameResource = (url) => {
    const urlBreak = url.split('/');
    if(urlBreak.length > 1){
        return urlBreak[urlBreak.length - 1];
    }
    return "Esta actividad no tiene recursos"
}

