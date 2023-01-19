import { signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import { auth } from './firebase';

export const logOut = () => {
  signOut(auth)
    .then(() => {
      Cookies.remove('signedIn');
      window.location.href = './login';
    })
    .catch((error) => {
      console.log(error);
    });
};
