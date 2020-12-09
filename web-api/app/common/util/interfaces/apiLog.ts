export interface ApiLog {
    originalUrl?: string;
    baseUrl?: string;
    request?: object;
    requestType?: string;
    response?: object;
    status?: number;
}
