class lasActivitySystemApi {
    createActivitySystem(data){
        return new Promise((resolve, reject) =>{
            fetch('http://localhost:3005/event/createEventStatistics', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'}})
                .then(res=> res.json())
                .then((response)=>{
                    resolve(response);
                });
        });  
    }

    getActivitySystemByUser(idUser){
        return new Promise((resolve, reject) =>{
            fetch('http://localhost:3005/event/getEventStatistics')
            .then(res=> res.json())
            .then((response)=>{
                resolve(response);
            });
        });
    }
}

export default lasActivitySystemApi;