import { Req, Res } from "@nestjs/common";
import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } from 'sequelize';








export const handleSequelizeErrors = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new HttpException(error.errors.map(err => err.message).join(', '), HttpStatus.BAD_REQUEST);
    }

    if (error instanceof UniqueConstraintError) {
      throw new HttpException('Duplicate entry, unique constraint violated', HttpStatus.CONFLICT);
    }

    if (error instanceof ForeignKeyConstraintError) {
      throw new HttpException('Foreign key constraint error', HttpStatus.BAD_REQUEST);
    }

    // Log the error for debugging
    console.error('Unexpected Sequelize error:', error.message);

    // Rethrow a generic internal server error for unknown issues
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


