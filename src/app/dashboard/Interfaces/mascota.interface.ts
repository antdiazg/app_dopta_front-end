import { User } from "src/app/auth/interface";

export interface Mascota {

    usuario: User;
    id: number;
    titulo: string;
    fec_public: string;
    nom_mascota: string;
    especie: string;
    raza: string;
    sexo: 'H' | 'M';
    tamanio: string;
    edad: string;
    foto: string;
    descripcion: string;
    is_favorito: Boolean;

}
export interface MascotaInput {

    titulo: string;
    nom_mascota: string;
    especie: string;
    raza: string;
    sexo: 'H' | 'M';
    tamanio: string;
    edad: string;
    descripcion: string;
    foto: string;

}

export interface MascotaFiltro {
    especie: string;
    raza: string;
    sexo: string;
  }