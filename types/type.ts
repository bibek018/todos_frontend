export type UserResponse = {
  success: true | false;
  user: User;
};
export type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatarUrl: string;
};

export interface todo {
  _id: string;
  title: string;
  status: "in progress" | "completed" | "not started";
  priority: "low" | "medium" | "high";
}
export interface todoResponse {
  success: true | false;
  todos: todo[];
  pagination:TodoPagination
}

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  accessToken: string;
  isLoading: boolean;
  logout: () => void;
}
export interface LoginResponse {
  message: string;
  success: boolean;
  user: User;
  accesstoken: string;
}
export interface RefreshResponse {
  success: boolean;
  user: User;
  accessToken: string;
}
export type TodoState = "loading" | "success" | "error";
export type FieldErrors = {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
};
export type TodoStatus = "in progress" | "not started" | "completed";
export type TodoPriority = "low" | "medium" | "high";
export type TodoSortNOrder =
  | "createdAt-desc"
  | "createdAt-asc"
  | "updatedAt-desc"
  | "title-asc"
  | "title-desc";
export type TodoSort = "createdAt" | "updatedAt" | "title";
export type TodoOrder = "asc" | "desc";
export type TodoPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
