export const getNameResource = (url) => {
    const urlBreak = url.split('/');
    if(urlBreak.length > 1){
        return urlBreak[urlBreak.length - 1];
    }
    return "Esta actividad no tiene recursos"
}

export const is = (role) =>{
    return localStorage.getItem('role') === role;
}
