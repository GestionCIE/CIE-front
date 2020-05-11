class ManagenmentApi {
    getProjectById(data){
        return new Promise((resolve, reject)=>{
            fetch(`http://localhost:3005/project/getProject?id=${data}`)
            .then((res) => res.json())
            .then((response) => {
                resolve(response);
            });
        });
    }
}


export default ManagenmentApi;