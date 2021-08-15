import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import { useUserWorkshop } from "../store/UserStore"

export const Logout = withRouter(({history}) => {

   // const logout = useUserStore(state => state.logout)
    useEffect(() => {
            localStorage.removeItem('token')
            useUserWorkshop.setState({user: undefined});
            history.push('/')
    }, [])

    return (
        <div></div>
    )
})

export default Logout