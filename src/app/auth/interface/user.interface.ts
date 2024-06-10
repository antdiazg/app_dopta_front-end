
export interface User {

  user: {
        id: number;
        username: string;
        email: string;
        password: string;
    };
    telefono: number;
    direccion: string;
    nombre: string;
    apellido: string;
    imagen_perfil: string;
    documento: string;
}


export interface Organizacion {

  username: string,
  password: string,
  email: string,
  telefono: number,
  direccion: string,
  rut_emp: string,
  razon_social: string,
  telefono2: number,

}
