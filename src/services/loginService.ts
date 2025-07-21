import api from "./api"


export const LoginService = async (email: string, password: string) => {

    return api.post(`auth/login`,{email,password}).then((data)=>data)

}



