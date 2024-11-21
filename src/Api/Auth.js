import axios from "axios";
import conf from "../conf/config";

class AuthService {

    
    async login(data) {
        try {
            const url = conf.baseUrl
            const session = await axios.post(`${url}/users/login`, {
                email: String(data.email),
                password: String(data.password)
            })
            return session
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async signup(data) {
        function getUsernameFromEmail(email) {
            return email.split('@')[0];
        }

        try {
            const url = conf.baseUrl
            const session = await axios.post(`${url}/users/register`, {
                email: data.email,
                password: data.password,
                fullname: data.fullName,
                usrname: getUsernameFromEmail(data.email)
            })
            return session
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;