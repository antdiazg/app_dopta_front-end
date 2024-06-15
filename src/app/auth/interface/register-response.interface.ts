
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
  user: {
      username: string;
      email: string;
      password: string;
  },
  telefono: number;
  direccion: string;
  rut_emp: string;
  razon_social: string;
  telefono2: number;
}
