import { NotFoundException, Req, Res } from "@nestjs/common";
import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';

export const handleSequelizeErrors = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
   console.log("Instance of Errorrrr", error)
    // if(error instanceof NotFoundException){
    //   console.log("Inside Catch")
    //   return {code: HttpStatus.NOT_FOUND, message:"Data Not Found"};
    // }

    if (error instanceof UniqueConstraintError) {
      // return {code:HttpStatus.CONFLICT, message:"Duplicate Field Entry. Unique Constraint Error"};
      throw new HttpException("Duplicate Field Entry. Unique Constraint Error", HttpStatus.CONFLICT)
    }
    
    if (error instanceof ForeignKeyConstraintError) {
      // return {code:HttpStatus.BAD_REQUEST, message:"Invalid Foreign Key Entry."}
      throw new HttpException("Invalid Foreign Key Entry.", HttpStatus.BAD_REQUEST)
    }
    
    if (error instanceof ValidationError) {
      console.log("Inside Validation Error");
      throw new HttpException("Cannot POST or PUT due to Invalid Fields", HttpStatus.BAD_REQUEST)
      // return {code:HttpStatus.BAD_REQUEST, message:"Cannot POST or PUT due to Invalid Fields"}
    }


    console.error('Unexpected Sequelize error:', error.message);

    
    // return {code: HttpStatus.INTERNAL_SERVER_ERROR, message:"Internal Server Error"}
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};






export const handleAsync = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    }
    
    console.error('Unexpected error:', error.message);
    
    // Customize the error response based on your needs
    throw new HttpException(
      'An unexpected error occurred. Please try again later.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};









// export const handler = async (serviceMethod) =>{
//     return async (@Req() req:Request ,@Res()res:Response) =>{
//             try{
//                 return await serviceMethod();
//             }catch(e){
//                 return e.message
//             }
//     }
// }

// export const handler = async (req:Request,res:Response,controller) =>{
//     try{
//         const data = await controller();
//         // res.send(data)
//         return data
//     }catch(e){
//         // res.send(e.message)
//         return e.message
//     }
// }


