import { IsString, IsNumber, IsDateString, MinLength } from "class-validator";

export class CreateAnalyticsDto {
  @IsString()
  @MinLength(1, { message: "Label is required" })
  label!: string;

  @IsNumber()
  value!: number;

  @IsDateString()
  date!: string;
}
