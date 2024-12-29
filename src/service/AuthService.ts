import {BaseService} from "./BaseService";
import {InitiateLoginRequest} from "../model/request/auth/InitiateLoginRequest.ts";

export class AuthService {
    static initiateLogin = (others: any, data: InitiateLoginRequest) =>{
        return BaseService.apiClient(others).post("/authentication/initiate-login",data)
    }
}