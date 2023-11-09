import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException, HttpException} from '@nestjs/common';
import { UserObject, GetQuery, UpdateObject, ForgotPassword, ResetPassword } from './user.interface';
import {Model} from "mongoose";
import Utils from '../utils'
import Email from '../utils/emails'
@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<UserObject>) {}
    private logger: any;
    async findAll(query): Promise<any>{
        try {
            let result = await this.userModel.find(query,{password:0})
            if(!result)
                return new NotFoundException()
            return result 
        } catch (error) {
            return new InternalServerErrorException(error)
        }
         
    } 
    async findOne(id: string): Promise<UserObject | any> {
        try {
            let result = await this.userModel.findOne({_id:id}).lean();
            if(!result)
                return new NotFoundException()
            return new UserObject(result)
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async findByEmail(email): Promise<any> {
        try {
            let result = await this.userModel.findOne({email:email}).lean();
            if(!result)
                return new NotFoundException()
            return result 
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async  create(user: UserObject): Promise<any> {
        try {
            let result = await this.userModel.create(user);
            return result;
        } catch (error) {
            if(error.code ==11000)
                return new UnprocessableEntityException("User with same credentials already exists")
            else
            return new InternalServerErrorException(error)     
        }
        
    }
    async delete(id: string): Promise<any> {
        try {
            let result = await this.userModel.deleteOne({_id:id});
            return result
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async update(id:string, data: UpdateObject): Promise<any>{
        try {
            //this.logger.log(`Updating post with id: ${id}`);
            let updatedUser = await this.userModel.findOneAndUpdate({_id:id},data,{new:true});
            return updatedUser  
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        

    }
    async verifyEmail(data: any): Promise<any> {
        try {
          const user: any = await this.findByEmail(data.email);
          console.log(user);
          if(user?.email_verified == true)
            return new UnprocessableEntityException('The email address is already verified')
    
          if(user?.status == 404)
            return new UnprocessableEntityException('The email address does not exists')
          
          if(user?.otp?.email_verify?.code == data?.otp) {
            user.email_verified = true;
            const id = user._id.toString();
            delete user._id;
            await this.update(id, user);
            await this.updateAndRemove(id, 'verify' );
            Email.AuthEmails({ email:data.email }, 5);
            // return { message: 'Account Created Successfully and Otp Verified Successfully'}
            return { message: 'Email Verified Successfully'}
          } else if(user?.otp?.email_verify?.code) {
            return new NotFoundException('500', 'The provided otp code does not match the email address associated with the OTP.')
          } else {
            throw new NotFoundException('You have not provided correct otp code');
          }
        } catch (error) {
          return new HttpException('500', error.message)
        }
      }
    
      async resetPassword(data: ResetPassword){
       try {
        const res = await this.findByEmail(data.email);
        if(res) {
          if(res.email_verfied == false) {
            throw new NotFoundException('No User with the credentials found');
          }
          const otp = Utils.generateOtp();
          res.otp.reset_password = {
            code: otp
          }
          await this.userModel.findByIdAndUpdate(res._id, res, { new: true });
    
          Email.AuthEmails({email:data.email,otp},4);
    
          return { message: 'Reset Password Otp Sent Successfully'};
        } else {
          return new NotFoundException('Not a Valid Email');
        }
       } catch (error) {
        return new HttpException('500', error.message);
       }
      }
    
      async forgotPassword(data: ForgotPassword){
        try {
          const res = await this.findByEmail(data.email);
          if(res.email_verfied == false) {
            throw new NotFoundException('No User with the credentials found');
          }
          if(res){
            const otp = Utils.generateOtp();
            res.otp.forgot_password = {
              code: otp
            }
            await this.userModel.findByIdAndUpdate(res._id, res, { new: true });
    
            await Email.AuthEmails({email:data.email,otp},3);
    
            return { message: 'Forgot Password Otp Sent Successfully' };
          } else {
            return new NotFoundException('Not a Valid Email');
          }
        } catch (error) {
          return new HttpException('500', error.message);
        }
      }
    
      async verify(data: any) {
        try {
    
          const res = await this.findByEmail(data.email);
          if(res?.status == 404) {
            return new UnprocessableEntityException('The email address does not exists')
          } else if(res?.email_verfied == false) {
            throw new NotFoundException('No User with the credentials found')
          }
    
          if(res) {
            if(data?.query_type != 'reset_password' && data?.query_type != 'forgot_password') {
              throw new NotFoundException('Not a Valid Request')
            }
                    
            if(data.query_type == 'reset_password') {
              console.log(res);
              if(!res?.otp?.reset_password) {
                throw new NotFoundException('Reset Password Request is Not Valid!')
              }
            } else if(data.query_type == 'forgot_password') {
              if(!res?.otp?.forgot_password) {
                throw new NotFoundException('Forgot Password Request is not valid!')
              }
            }
    
            let message = '';
            let Id = res?._id.toString();
            if(data?.query_type == 'reset_password' && data?.otp == res?.otp?.reset_password?.code) {
              message = 'Reset Password Successful'
              await this.updateAndRemove(Id, 'reset' );
            } else if (data?.query_type == 'forgot_password' && data?.otp == res?.otp?.forgot_password?.code) {
              message = 'Forgot Password Successful';
              await this.updateAndRemove(Id, 'forgot' );
            } else {
              throw new NotFoundException('Not a Valid OTP Code');
            }
    
            const hash = Utils.generateHash(data?.password);
            res.password = hash;
            const id = res._id;
            delete res._id;
            const obj = await this.userModel.findByIdAndUpdate(id, res, { new: true });
            await Email.AuthEmails({ message, email:data.email }, 2);
            return { message: message, data: obj };
          }
          
        } catch (error) {
          return new HttpException('500', error.message);
        }
      }
      async updateAndRemove(id: string, data: any) {
        try {
          //this.logger.log(`Updating post with id: ${id}`);
          let updatedUser: any;
          if(data == 'verify') {
            updatedUser = await this.userModel.findByIdAndUpdate(
              id,
              { $unset: { 'otp.email_verify': 1 } },
              { new: true },
            );
          } else if(data == 'reset') {
            updatedUser = await this.userModel.findByIdAndUpdate(
              id,
              { $unset: { 'otp.reset_password': 1 } },
              { new: true },
            );
          } else if(data == 'forgot') {
            updatedUser = await this.userModel.findByIdAndUpdate(
              id,
              { $unset: { 'otp.forgot_password': 1 } },
              { new: true },
            );
          }
          
          return updatedUser;
        } catch (error) {
          return new InternalServerErrorException(error);
        }
      }
    
}