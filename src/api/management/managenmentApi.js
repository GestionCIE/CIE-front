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

    getParticipants(id){
        return new Promise ((resolve, reject) =>{
            fetch(`http://localhost:3005/project/getParticipans?id=${id}`)
            .then((res) => res.json())
            .then((response) => {
                resolve(response);
            });
        });
    }

    getActivityByProjectAndPhase(id, phase){
        return new Promise ((resolve, reject) =>{
            fetch(`http://localhost:3005/project/getActivityByProjectAndPhase?id=${id}&phase=${phase}`)
            .then((res) => res.json())
            .then((response) => {
                resolve(response);
            });
        });
    }

    createActivity(data) {
        return new Promise ((resolve, reject)=>{
            fetch('http://localhost:3005/project/createActivity', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }})
                .then(res=> res.json())
                .then((response)=>{
                   resolve(response);
                });
        });
    }
}


export default ManagenmentApi;