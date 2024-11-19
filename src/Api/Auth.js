import axios from "axios";

class AuthService {

    async login(email, password) {

        try {
            const session = await axios.post('http://localhost:8000/api/login', {
                email: email,
                password: password
            })
            return session
        } catch (error) {
            throw error;
        }
    }

}

const authService = new AuthService();
export default authService;