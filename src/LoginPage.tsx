import styled from "styled-components";
import input from "@mui/material/Input";
import { styled as styled2 } from "@mui/material/styles";


const LoginPage =() => {
    return (
        <div>
            <input type="text" placeholder="아이디"/>
            <input type="text" placeholder="비밀번호"/>
            <button>로그인</button>
        </div>
    )
}

export default LoginPage;