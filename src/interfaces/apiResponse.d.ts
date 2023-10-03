export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
    //... otros campos que tu respuesta de API pueda tener
}
