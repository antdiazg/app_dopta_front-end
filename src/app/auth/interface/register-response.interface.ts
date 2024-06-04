import { User } from "./user.interface";

export interface RegisterResponse {
  user: User;
  telefono: number;
  direccion: string;
  nombre: string;
  apellido: string;
}

export interface RegistroPersona {
    user: {
        username: string;
        email: string;
        password: string;
    },
    telefono: number;
    direccion: string;
    nombre: string;
    apellido: string;
}
