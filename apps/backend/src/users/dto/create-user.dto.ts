import { IsEnum, MinLength } from "class-validator";

// Ein dto schränkt das zu erstellende Objekt ein
export class CreateUserDto {
    id: number;

    @MinLength(3)
    name: string;

    @IsEnum(['Beruf1', 'Beruf2'], { message: 'Nur Beruf1 oder Beruf2 möglich.'})
    occupation: 'Beruf1' | 'Beruf2';
}