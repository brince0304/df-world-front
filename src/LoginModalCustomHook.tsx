import * as React from "react";
import {useEffect} from "react";

export function useLogin (){
    const [isEmptyId, setIsEmptyId] = React.useState(false);
    const [isRemember, setIsRemember] = React.useState("false");
    const [isEmptyPassword, setIsEmptyPassword] = React.useState(false);
    const [id, setId] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleChangeId = (email:string) => {
        setId(email);
    }

    const handleChangeRemember = (check:string) => {
        setIsRemember(check);
    }

    const handleChangePassword = (password:string) => {
        setPassword(password);
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    useEffect(() => {
        console.log("id: " + id);
        console.log("password: " + password);
        console.log("isRemember: " + isRemember);
    }, [id, password, isRemember])


    return (
        {
            isEmptyId,
            isEmptyPassword,
            id,
            password,
            setId,
            setPassword,
            handleLogin,
            handleChangePassword,
            handleChangeId,
            handleChangeRemember,
            isRemember
        }
    )
}