
export interface User {

  id?: number;
  username: string;
  email: string;
  password: string;
  is_persona: boolean;
  is_organizacion: boolean
  is_staff: boolean

}

export interface Persona {

  user: User;
  id?: number;
  telefono: number;
  direccion: string;
  nombre: string;
  apellido: string;
  fec_nac: Date;
  imagen_perfil?: string;
  documento?: string;


}

export interface Organizacion {

  user: User
  telefono: number;
  direccion: string;
  dv: string;
  numrut_org: number;
  razon_social: string;
  telefono2: number;
  imagen_perfil?: string;
}
