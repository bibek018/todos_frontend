let token="";
export const setToken=(accesstoken:string)=>{
  token = accesstoken;
}
export const getAccessToken=()=>{
  return token;
}