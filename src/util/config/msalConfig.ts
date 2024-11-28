import { Configuration, PublicClientApplication, CacheOptions, BrowserCacheLocation } from "@azure/msal-browser";

interface ExtendedCacheOptions extends CacheOptions {
    temporaryCacheLocation?: BrowserCacheLocation;
    persistentCacheLocation?: BrowserCacheLocation;
}

// Configure cache options with persistence
const cacheOptions: ExtendedCacheOptions = {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Use localStorage instead of sessionStorage
    storeAuthStateInCookie: true, // Enable cookies for better IE/Edge support
    secureCookies: process.env.NODE_ENV === "production", // Use secure cookies in production
    cacheMigrationEnabled: true, // Enable cache migration between versions
    temporaryCacheLocation: BrowserCacheLocation.SessionStorage, // Fallback storage
};

// MSAL configuration with enhanced caching
export const msalConfig: Configuration = {
    auth: {
        clientId: import.meta.env.VITE_MS_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${import.meta.env.VITE_MS_TENANT_ID}`,
        redirectUri: import.meta.env.VITE_MS_REDIRECT_URL,
        postLogoutRedirectUri: import.meta.env.VITE_MS_REDIRECT_URL,
        navigateToLoginRequestUrl: true,
    },
    cache: cacheOptions,
    system: {
        allowNativeBroker: false, // Disable native broker to prevent form clearing
        windowHashTimeout: 9000, // Increase timeout for hash processing
        iframeHashTimeout: 9000,
        loadFrameTimeout: 9000,
    },
};

// Create MSAL instance with persistence handling
export const createMsalInstance = () => {
    const instance = new PublicClientApplication(msalConfig);

    // Handle cache persistence
    instance.initialize().then(() => {
        // Enable silent token renewal
        instance.enableAccountStorageEvents();

        // Attempt to load existing accounts
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
        }
    });

    return instance;
};
