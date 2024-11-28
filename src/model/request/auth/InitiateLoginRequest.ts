export type InitiateLoginRequest = {
    userEmail: string,
    userPassword: string,
    deviceId: string,
    latitude: string,
    longitude: string,
    ssoToken: string,
}

export const InitiateLoginRequestInit:InitiateLoginRequest = {
    deviceId: "",
    latitude: "",
    longitude: "",
    ssoToken: "",
    userEmail: "",
    userPassword: ""
}