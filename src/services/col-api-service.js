import TokenService from './token-service';
import config from '../config';

const colApiService = {

    getEvents(date) {
        return fetch(`${config.API_ENDPOINT}/home/${date.year}/${date.month}`, {
            headers: { 'authorization': `bearer ${TokenService.getAuthToken()}` }
        })
    },
    editEvents(date, updatedEvent) {
        return fetch(`${config.API_ENDPOINT}/home/${date}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                id: updatedEvent.id,
                title: updatedEvent.title,
                event_desc: updatedEvent.desc,
                event_date: updatedEvent.date
            })
        })
    }


}

export default colApiService;