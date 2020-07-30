class Http {
    constructor(){
        this.PORT = 3005;
        this.SERVER = 'http://localhost';
        this.URL = `${this.SERVER}:${this.PORT}`;

    }
    get(uri){
        return new Promise((resolve, reject )=>{
            fetch(`${this.URL}/${uri}`)
            .then( res => res.json())
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    post(uri, data){
        return new Promise ((resolve , reject)=>{
            fetch(`${this.URL}/${uri}`, {
                body: JSON.stringify(data),
                method: 'POST',
               headers: { 'Content-Type' : 'application/json' } 
            }).then( res => res.json())
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }

    getExternal(url){
        return new Promise((resolve, reject )=>{
            fetch(url)
            .then( res => res.json())
            .then(res => resolve(res))
            .catch(error => reject(error));
        });
    }

    postExternal(url, data){
        return new Promise ((resolve , reject)=>{
            fetch(url, {
                body: JSON.stringify(data),
                method: 'POST',
               headers: { 'Content-Type' : 'application/json' } 
            }).then( res => res.json())
            .then(res => resolve(res))
            .catch(error => reject(error));
        })
    }

    uploadImage(uri){
        return `${this.URL}/${uri}`;
    }
    
}

export default Http;
