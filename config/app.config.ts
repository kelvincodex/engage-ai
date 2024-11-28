type AppConfigType = {
    baseUrlDev: string;
    baseUrlProd: string;
}
export const appConfig:AppConfigType = {
    baseUrlDev: import.meta.env.VITE_BASE_URL_DEV,
    baseUrlProd: import.meta.env.VITE_BASE_URL_PROD,
}