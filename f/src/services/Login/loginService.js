class loginService{//servicios para login
    axios
    baseUrl

    constructor(axios,baseUrl){
        this.axios = axios;
        this.baseUrl = `${baseUrl}`;
    }

    getRam(){
        console.log("todo ok")
        let self = this;
        console.log(self.baseUrl +"/ram")
        return self.axios.get(`${self.baseUrl}/ram`)  
    }

    getCpu(){
        console.log("todo ok")
        let self = this;
        console.log(self.baseUrl +"/cpu")
        return self.axios.get(`${self.baseUrl}/cpu`)  
    }

    /*
    postLogin(body){//POST validación de credenciales
        let self = this;
        const url = `${self.baseUrl}/usuario/login`
        return self.axios.post(url.toString(),body);  
    }*/

}

export default loginService;