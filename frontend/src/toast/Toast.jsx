import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GenerateError = (err) => {
    toast.error(err, {
      position: 'top-right',
      theme: 'colored',
      autoClose: 1000
    });
  };

export  const GenerateSuccess = (success) => {
    toast.success(success, {
      position: 'top-right',
      theme: 'colored',
      autoClose: 1000
    });
  };