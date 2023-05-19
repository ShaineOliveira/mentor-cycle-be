import { createStringRequirements } from '@common/utils';
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, Matches } from 'class-validator';

@InputType('ResetPasswordInput')
export class ResetPasswordUserDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  pin: string;

  @Field()
  @Matches(
    createStringRequirements({
      minLength: 6,
      includeNumber: true,
      includeLowercase: true,
      includeUppercase: false,
      includeSpecial: false,
    }),
    {
      message: 'Password should have numbers and letters',
    },
  )
  newPassword: string;
}
