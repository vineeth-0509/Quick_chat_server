interface AuthUser{
    id:number;
    name:String;
    email:String;
}

declare namespace Express {
    export interface Request{
        user?: AuthUser;
    }
}