import { useRouter } from 'next/router';
import { loginInWithGoogle } from '../lib/loginInWithGoogle';

const Login = () => {
  const router = useRouter();

  return (
    <div>
      <p>ログインして始める</p>
      <button
        onClick={() => {
          loginInWithGoogle(router);
        }}
      >
        Googleでログイン
      </button>
    </div>
  );
};

export default Login;
