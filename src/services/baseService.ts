import axios from "axios";

export default class BaseService{

    async get(url: string, config?: any) {
        try {
            const { data = null } = await axios.get(url, config);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async post(url: string,payload: any, config?: any) {
        try {
            const { data = null } = await axios.post(url, payload, config);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}