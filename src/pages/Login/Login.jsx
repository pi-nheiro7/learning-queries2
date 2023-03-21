import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../../context/AuthGoogle';

export default function Login() {
  const { signInGoogle, signed } = React.useContext(AuthGoogleContext);

  async function loginGoogle() {
    await signInGoogle();
  }

  if (!signed) {
    return <button onClick={loginGoogle}>Logar com o google</button>;
  } else {
    return <Navigate to="/home" />;
  }
}
