export interface User{
    email : string;
    name?: string;
}
export interface LoginPayload{
    email : string;
    password: string;
}

export interface RegisterPayload{
    name : string;
    email : string;
    password: string;
    confirm_password: string;
}

export interface ApiResponse<T>{
    status?: boolean;
    message: string;
    error?: string;
    token?: string;
    data : T;
}

