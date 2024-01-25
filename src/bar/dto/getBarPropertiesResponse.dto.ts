import { Expose } from "class-transformer";

export class GetBarPropertiesResponse {
  @Expose()
  balance: string;

  @Expose()
  roles: string[];
}
