import Swal from "sweetalert2";

export const swalCustomError = ( title: string, text: string ) => {

  Swal.fire({
    title     : title,
    text      : text,
    color     : 'white',
    icon      : 'error',
    background: 'rgb( 63, 63, 70 )',
    backdrop  :  true,

  });
};
