import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/';

export default {
    getHeaders()
    {      
        const token = localStorage.getItem('token');
    
        if(token == null) return {}

        return { Authorization: 'Bearer ' + token }
    },

    get(url){
        return axios.get(
        baseUrl+url,
        { headers: this.getHeaders() }
        );
    },

    post(url, data){
        return axios.post(
        baseUrl+url,
        data,
        { headers: this.getHeaders() }
        );
    },

    delete(url){
        return axios.delete(
        baseUrl+url,
        { headers: this.getHeaders() }
        );
    },

    put(url, data) {
        return axios.put(
        baseUrl+url,
        data,
        { headers: this.getHeaders() }
        );
    },
  
}