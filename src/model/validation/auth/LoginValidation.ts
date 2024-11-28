import {object, string} from "yup";

export const LoginValidation = object().shape({
    userEmail: string().required("Email Is Required."),
    userPassword: string()
        .min(7, 'Password must be at least 7 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number letter')
        .matches(/[\W_]/, 'Password must contain at least one special character')
        .required("Password Is Required."),
})