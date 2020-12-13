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
    postEvent(event) {
        return fetch(`${config.API_ENDPOINT}/create-event`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(event),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    editEvent(date, updatedEvent) {
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
    },
    getUsersInfo() {
        return fetch(`${config.API_ENDPOINT}/profile`, {
            headers: { 'authorization': `bearer ${TokenService.getAuthToken()}` }
        })
            .then(res => (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    },
    deleteUsersAccount() {
        return fetch(`${config.API_ENDPOINT}/profile`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
    },

}

export default colApiServices;