const apiUrl = "http://localhost:3000";

export const ApiEndpoint = {
    Auth : {
        Register: `${apiUrl}/user/register`,
        Login: `${apiUrl}/user/login`,
        me: `${apiUrl}/user/me`
    }
};

export const LocalStorage = {
    token: 'USER_TOKEN',
};
