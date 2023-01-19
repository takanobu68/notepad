import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import Cookies from 'js-cookie';

export const loginInWithGoogle = (router) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      Cookies.set('signedIn', 'true');
      router.replace('/main');
    })
    .catch((error) => {
      console.log(error);
    });
};
