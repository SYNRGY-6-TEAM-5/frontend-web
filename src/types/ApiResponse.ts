export interface IParams {
    page?: number;
    size?: number;
    search?: string;
    departure_airport?: string;
    arrival_airport?: string;
    departure_date?: string;
}

export interface IApiResponse<T> {
    data: T;
    message: string;
    meta?: {
        page: number;
        size: number;
        totalData: number;
        totalPages: number;
    };
}

export interface IMeta {
    page: number;
    size: number;
    totalData: number;
    totalPages: number;
}