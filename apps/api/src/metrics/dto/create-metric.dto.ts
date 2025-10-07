import { IsString, IsNumber, IsEnum, MinLength } from "class-validator";
import { ChangeType } from "@prisma/client";

export class CreateMetricDto {
  @IsString()
  @MinLength(1, { message: "Title is required" })
  title!: string;

  @IsNumber()
  value!: number;

  @IsNumber()
  change!: number;

  @IsEnum(ChangeType, {
    message: `Change type must be either of these: ${Object.values(ChangeType).join(" | ")}`,
  })
  changeType!: ChangeType;

  @IsString()
  @MinLength(1, { message: "Icon is required" })
  icon!: string;
}
