import { UserStatus, UserRole } from "@prisma/client";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsInt, Min, IsIn } from "class-validator";

export class UserQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  _page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  _limit?: number;

  @IsOptional()
  @IsString()
  _sort?: string;

  @IsOptional()
  @IsIn(["asc", "desc"])
  _order?: "asc" | "desc";

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsIn([...Object.values(UserRole), "all"])
  role?: UserRole | "all";

  @IsOptional()
  @IsIn([...Object.values(UserStatus), "all"])
  status?: UserStatus | "all";

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  id_ne?: string;
}
