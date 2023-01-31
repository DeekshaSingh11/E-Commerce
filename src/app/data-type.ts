export interface SignUp{
    name:string,
    password:number,
    email:string
}
export interface model{
    data:SignUp;
    id:number;
}
export interface SignIn{
    email:string;
    password:number;
}
export interface addProduct{
    
    name:string,
    id:number;
    price:number,
    color:string,
    category:string,
    image:string,
    description:string,
    quantity:number|undefined;
}
