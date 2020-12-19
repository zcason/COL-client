import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../../services/token-service'
import moment from 'moment'

export default function PublicOnlyRoute({ component, ...props }) {
    const Component = component
    const beginDate = moment().startOf('month').format('YYYY-MM-DD')
    const endDate = moment().endOf('month').format('YYYY-MM-DD')
    return (
        <Route
            {...props}
            render={componentProps => (
                TokenService.hasAuthToken()
                    ? <Redirect to={`/home/${beginDate}/${endDate}`} />
                    : <Component {...componentProps} />
            )}
        />
    )
}
