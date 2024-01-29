
export class CreateUserDto {
    name: string;
    age: number;
    email: string;
    role: "INTERN" | "ENGINEER" | "ADMIN"
}