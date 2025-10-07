import { IsString, IsEmail, IsOptional, IsEnum } from "class-validator";
import { UserRole, UserStatus } from "@prisma/client";

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsEnum(UserRole, {
    message: `Role must be either of these: ${Object.values(UserRole).join(" | ")}`,
  })
  role!: UserRole;

  @IsEnum(UserStatus, {
    message: `Status must be either of these: ${Object.values(UserStatus).join(" | ")}`,
  })
  status!: UserStatus;

  @IsOptional()
  @IsString()
  avatar?: string | null;
}
