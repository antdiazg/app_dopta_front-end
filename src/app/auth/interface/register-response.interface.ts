import { User } from "./user.interface";

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

export interface RegistroOrganizacion {
  user: User
  telefono: number;
  direccion: string;
  dv: string;
  numrut_org: number;
  razon_social: string;
  telefono2: number;
  imagen_perfil?: string;
}
