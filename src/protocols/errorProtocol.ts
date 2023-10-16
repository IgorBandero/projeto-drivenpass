
export type ReqError = {
    status: number;
    data: object | null;
    statusText: string;
    name: string;
    message: string;
};

export type AppError = {
    name: string;
    message: string;
};