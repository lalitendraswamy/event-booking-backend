import { Req, Res } from "@nestjs/common";


// export const handler = async (serviceMethod) =>{
//     return async (@Req() req:Request ,@Res()res:Response) =>{
//             try{
//                 return await serviceMethod();
//             }catch(e){
//                 return e.message
//             }
//     }
// }

export const handler = async (req:Request,res:Response,controller) =>{
    try{
        const data = await controller();
        // res.send(data)
        return data
    }catch(e){
        // res.send(e.message)
        return e.message
    }
}