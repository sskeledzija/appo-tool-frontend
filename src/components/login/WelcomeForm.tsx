import { Button, Result } from "antd"
import { useUserWorkshop } from "../store/UserStore"
import React from "react";
import { withRouter } from "react-router";

export const WelcomeForm = withRouter(({history}) => {

    const user = useUserWorkshop(state => state.user);

    return (
        <Result
            status="success"
            title={'Welcome ' + user['name'] + '!'}
            subTitle="You have succesfully created an account. Now you can enjoy the benefits of having a personal appoitment assistent! :)"
            extra={[
            <Button  key="backToRoot" onClick={() => {history.push("/")}}>
                {"<-"} To application
            </Button>,
            <Button type="primary" key="createEntity">Create your first entity!</Button>,
            ]}
        />
    )
}
)