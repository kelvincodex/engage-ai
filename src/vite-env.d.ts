/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string
    readonly VITE_APP_ENV: 'Dev'|'Prod'
    readonly VITE_BASE_URL_DEV: string
    readonly VITE_BASE_URL_PROD: string
    readonly VITE_BASE_APP_URL: string
    readonly VITE_SUBTEXT: string,
    readonly VITE_MS_REDIRECT_URL: string,
    readonly VITE_MS_CLIENT_ID: string,
    readonly VITE_MS_TENANT_ID: string,
    readonly VITE_AWS_ACCESS_KEY_ID: string,
    readonly VITE_AWS_SECRET_ACCESS_KEY: string,
    readonly VITE_AWS_REGION: string,
    readonly VITE_AWS_S3_BUCKET: string,
    readonly VITE_FIREBASE_API_KEY: string
    readonly VITE_FIREBASE_VAPI_KEY: string
    readonly VITE_FIREBASE_AUTH_DOMAIN: string
    readonly VITE_FIREBASE_PROJECT_ID: string
    readonly VITE_FIREBASE_STORAGE_BUCKET: string
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
    readonly VITE_FIREBASE_APP_ID: string
    readonly VITE_FIREBASE_MEASUREMENT_ID: string
    readonly VITE_NIBSS_ROLE: string

}

interface ImportMeta {
    readonly env: ImportMetaEnv
}