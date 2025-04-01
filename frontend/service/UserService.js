import axios from "axios";
import $api from "../http";

export default class UserService {
    static async getPortfolio(email) {
        return $api.post('/getportfolio', { email })
    }

    static async setCryptoData() {
        return $api.get('/getcryptodata')
    }
}