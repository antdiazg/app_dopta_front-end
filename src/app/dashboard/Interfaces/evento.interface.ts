import { User } from "src/app/auth/interface";

export interface Evento {

    usuario: User;
    titulo: string;
    fec_public: string;
    nombre: string;
    localizacion: string;
    fec_evento: string;
    descripcion: string;
    is_favorito?: boolean;

}