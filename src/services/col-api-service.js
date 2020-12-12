import TokenService from './token-service';
import config from '../config';

const colApiServices = {

    getEvents(beginDate, endDate) {
        return fetch(`${config.API_ENDPOINT}/home/${beginDate}/${endDate}`, {
            headers: { 'authorization': `bearer ${TokenService.getAuthToken()}` }
        })
            .then(res => (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
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

export default colApiServices;