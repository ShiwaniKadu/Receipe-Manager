const apiUrl = "http://localhost:3000";

export const ApiEndpoint = {
    Auth: {
        Register: `${apiUrl}/user/register`,
        Login: `${apiUrl}/user/login`,
        Logout: `${apiUrl}/user/logout`,
        ChangePassword: `${apiUrl}/user/changepassword`,
        SendResetPasswordEmail: `${apiUrl}/user/send-reset-password-email`,
        ResetPassword: (id: string, token: string) => `${apiUrl}/user/reset-password/${id}/${token}`,
        LoggedUser: `${apiUrl}/user/loggeduser`
    },
    Receipe: {
        GetAll: `${apiUrl}/receipe/`,
        GetById: (id: string) => `${apiUrl}/receipe/${id}`,
        Create: `${apiUrl}/receipe/`,
        Update: (id: string) => `${apiUrl}/receipe/${id}`,
        Delete: (id: string) => `${apiUrl}/receipe/${id}`
    }
};
