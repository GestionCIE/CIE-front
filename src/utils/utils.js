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

export const getUserLogged = () =>  {
    return { id: localStorage.getItem('idUser'),
    name: localStorage.getItem('username'),
    image: localStorage.getItem('image'),
    role: localStorage.getItem('role'),
    relationship: localStorage.getItem('relationship')}
};

export const whatRelationship = (relationship) => {
    return localStorage.getItem('relationship') === relationship;
}

export const getRelationship = (key) => {

    let value = '';
    switch (key) {
        case 'student':
            value = 'Estudiante';   
        break;
        
        case 'graduate':
            value = 'Egresado';
        break;
        
        case 'external':
            value = 'Emprendedor Externo';
        break;

        case 'personalIntern':
            value = 'Personal de la institución'
        break;
    
        default:
            break;
    }

    return value;
}

export const getRole = (key) => {
    let value= '';
    switch (key) {
        case 'adviser':
            value = 'Asesor';
        break;
        case 'administrator' :
            value = 'Administrador';
        break;
        
        case 'entrepreneur':
            value = 'Emprendedor';
        break;

        case 'assistant':
            value = 'Asistente';
        break;

        default:
            break;
    }
    console.log(value);
    return value;
}
