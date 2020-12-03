import TokenService from './token-service';
import config from '../config';

const homeApiService = {

    getEvents() {
        return fetch(`${config.API_ENDPOINT}/home`, {
            headers: { 'authorization': `bearer ${TokenService.getAuthToken()}` }
        })
    },


}

export default homeApiService;