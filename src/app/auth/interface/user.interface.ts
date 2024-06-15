
export interface User {

  user: {
        id: number;
        username: string;
        email: string;
        password: string;
        is_persona: boolean;
    };
    telefono: number;
    direccion: string;
    nombre: string;
    apellido: string;
    imagen_perfil: string;
    documento: string;
}


export interface Organizacion {

  user: {
        id: number;
        username: string;
        email: string;
        password: string;
        is_organizacion: boolean;
    };
  telefono: number;
  direccion: string;
  rut_emp: string;
  razon_social: string;
  telefono2: number;
  imagen_perfil: string;
}
