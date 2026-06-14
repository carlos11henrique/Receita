import Swal from 'sweetalert2';

const MySwal = Swal;

export const successAlert = (
  title = 'Sucesso',
  text = '',
  timer = 2000
) => {
  return MySwal.fire({
    title,
    text,
    icon: 'success',
    showConfirmButton: false,
    timer,
    background: '#fff',
    color: '#1f2937',
    customClass: {
      popup: 'rounded-lg shadow-lg border',
    },
  });
};

export const errorAlert = (
  title = 'Erro',
  text = ''
) => {
  return MySwal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#ef4444',
    background: '#fff',
    color: '#1f2937',
    customClass: {
      popup: 'rounded-lg shadow-lg border',
    },
  });
};

export const infoAlert = (
  title = 'Info',
  text = ''
) => {
  return MySwal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonText: 'OK',
    background: '#fff',
    color: '#1f2937',
    customClass: {
      popup: 'rounded-lg shadow-lg border',
    },
  });
};

export const toast = (
  icon: 'success' | 'error' | 'info',
  title: string
) => {
  return MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#fff',
    color: '#111827',
  }).fire({
    icon,
    title,
  });
};

export default MySwal;