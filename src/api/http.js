class Http {
    constructor(){
        this.PORT = 3005;
        this.SERVER = 'http://localhost';
        this.URL = `${this.SERVER}:${this.PORT}`;

    }
    get(uri){
        return new Promise((resolve, reject )=>{
            fetch(`${this.URL}/${uri}`)
            .then((res) => res.json())
            .then((response) => {
                resolve(response);
            });
        });
    }
}

export default Http;
