import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import GoogleButton from 'react-google-button';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';
import { fetchAPI } from '../utils/fetchAPI';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetchAPI('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.error('Could not sign in with Google', error);
    }
  };

  return (
    <div className='w-full'>
      <GoogleButton
        label='Continue with Google'
        onClick={handleGoogleClick}
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default OAuth;
