import { Expose, plainToClass, Transform } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { GetBarPropertiesResponse } from "./getBarPropertiesResponse.dto";

export class GetBarResponse {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @Transform(({ value }) =>
    plainToClass(GetBarPropertiesResponse, value, {
      excludeExtraneousValues: true,
    }),
  )
  properties: GetBarPropertiesResponse;
}
