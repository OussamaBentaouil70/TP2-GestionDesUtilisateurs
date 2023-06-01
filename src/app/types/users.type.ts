export type UserType = {
    id:number,
    email:string,
    first_name: string,
    last_name: string,
    avatar: string
}
export type UserAddType = {
 
    first_name: string,
    last_name: string,
    email:string,
    avatar: string
}
export type HttpUsersListResponse = {
    data: UserType[];
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };