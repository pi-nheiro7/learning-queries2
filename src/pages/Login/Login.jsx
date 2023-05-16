import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthGoogleContext } from '../../context/AuthGoogle';
import googleLogo from '/google-logo.svg'
import learningqLogo from '/logo_whitebg.svg';
import style from './Login.module.css'

export default function Login() {
  const { signInGoogle, signed } = React.useContext(AuthGoogleContext);
  

  async function loginGoogle() {
    await signInGoogle();
  }

  if (!signed) {
    return (
      <div className="container mt-5rem">
        <div className="center">
          <img src={learningqLogo} alt="Logo Learning Queries" />
          <h1>Learning Queries</h1>
        </div>
        <div>
          <button className="contrast fit-content center" onClick={loginGoogle}>
            {' '}
            <img
              src={googleLogo}
              alt="Logo do google com detalhes e nuvens ao fundo"
            />{' '}
          </button>
        </div>
        <div className={'center '+ style.sobre}>
          <p>Faça login com o Google</p>
          <a href="#">Sobre este site.</a>
        </div>
      </div>
    );
  } else{
    return <Navigate to="/home" />
  }
}
