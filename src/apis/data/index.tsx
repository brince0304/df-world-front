export interface UserDetailOptions {
    userId: string;
    nickname: string;
    profileImgPath: string;
    email: string;
    adventureName: string;
    representCharacterName: string;
    serverId : string;
    serverName : string;
    characterCount : number;
}

export interface RegisterFormProps {
    email: string;
    userId: string;
    nickname: string;
    password: string;
    passwordCheck: string;
    isAgree: boolean;
}

