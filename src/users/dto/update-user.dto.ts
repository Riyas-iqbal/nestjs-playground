import { PartialType } from "@nestjs/mapped-types"
import { CreateUserDto } from "./create-user.dto";

/**
 * The partial type function is used to create type of the arg object with all the fields as optional
 */
export class UpdateUserDto extends PartialType(CreateUserDto) { }