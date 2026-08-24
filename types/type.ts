export type UserResponse = {
    success:true|false,
    user:User
}
export type User = {
    id:string,
    name: string;
    email: string;
    role: "user" | "admin";
    avatarUrl:string,
}


export interface todo{
    _id:string,
    title:string,
    status:"in progress" | "completed" | "not started",
}
export interface todoResponse{
    success:true|false,
    todos:todo[]
}

export interface AuthContextType{
    user:User|null,
    setUser:React.Dispatch<React.SetStateAction<User | null>>,
    accessToken:string,
    isLoading:boolean,
    logout:()=>void
}
export interface LoginResponse{
    message:string,
    success:boolean,
    user:User,
    accesstoken:string
}
export interface RefreshResponse{
    success:boolean,
    user:User,
    accessToken:string
}
export type TodoState = "loading"|"success" | "error";