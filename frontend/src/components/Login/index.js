import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Wrapper } from "./styles";

export const LoginForm = ({
                              login,
                              onUserChange,
                              onPasswordChange,
                              username,
                              password
                          }) => {

    const usernameChange = (e) => {
        onUserChange(e.target.value);
    };

    const passwordChange = (e) => {
        onPasswordChange(e.target.value);
    };

    const onEnter = (e) => {
        if (e.key === "Enter") login();
    };

    return (
        <Wrapper>
            <Input type={"text"} placeholder={"Benutzername"} value={username}
                   onChange={(e) => usernameChange(e)} onKeyPress={(e) => onEnter(e)}/><br/>
            <Input type={"password"} placeholder={"Passwort"} value={password} onChange={(e) => passwordChange(e)}
                   onKeyPress={(e) => onEnter(e)}/>
            <Button onClick={() => login()}>Login</Button>
        </Wrapper>
    )
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    onUserChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
};
