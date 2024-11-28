export const NetworkHandlerHelper = {
    handle: (error) => {
        // Comprehensive network error mapping
        switch (error?.code) {
            case "ERR_NETWORK":
                return {
                    status: 503,
                    statusText: 'Service unavailable',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "NetworkError",
                        responseMessage: "Network Error, please check your connection"
                    }
                };

            case "ECONNABORTED":
                return {
                    status: 408,
                    statusText: 'Request Timeout',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "RequestTimeoutError",
                        responseMessage: "Request timed out, please try again later"
                    }
                };

            case "ERR_FAILED":
                return {
                    status: 500,
                    statusText: 'Internal Server Error',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "RequestFailedError",
                        responseMessage: "Request failed, please try again"
                    }
                };

            case "ERR_CANCELED":
                return {
                    status: 499,
                    statusText: 'Client Closed Request',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "RequestCanceledError",
                        responseMessage: "Request was canceled"
                    }
                };

            case "ETIMEDOUT":
                return {
                    status: 504,
                    statusText: 'Gateway Timeout',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "ConnectionTimeoutError",
                        responseMessage: "Connection timed out, please check your network"
                    }
                };

            case "ERR_NAME_NOT_RESOLVED":
                return {
                    status: 500,
                    statusText: 'Internal Server Error',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "DNSResolutionError",
                        responseMessage: "Unable to resolve server address"
                    }
                };

            case "ERR_CERT_AUTHORITY_INVALID":
                return {
                    status: 495,
                    statusText: 'SSL Certificate Error',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "SSLCertificateError",
                        responseMessage: "Invalid SSL certificate"
                    }
                };

            default:
                return {
                    status: 500,
                    statusText: 'Internal Server Error',
                    headers: {},
                    config: {},
                    request: {},
                    data: {
                        responseCode: "UnknownError",
                        responseMessage: "An unexpected error occurred"
                    }
                };
        }
    },

    // Utility method to create a custom error response
    createCustomError: (responseCode, responseMessage, status = 500) => ({
        status,
        statusText: 'Service Error',
        headers: {},
        config: {},
        request: {},
        data: {
            responseCode,
            responseMessage
        }
    })
};