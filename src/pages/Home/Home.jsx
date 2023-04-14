import React from 'react';
import QuestionCard from '../../components/question/QuestionCard';
import { AuthGoogleContext } from '../../context/AuthGoogle';
import style from './Home.module.css';
import learningqLogo from '/logo_whitebg.svg';

export default function Home() {
  const { user, signOut } = React.useContext(AuthGoogleContext);

  return (
    <>
      <nav className={style.navbar}>
        <ul>
          <li>
            <img src={learningqLogo} alt="Logo Learning Queries" />
            <span>Learning Queries</span>
          </li>
        </ul>
        <ul></ul>
        <ul>
          <li>
            <img
              className={style.imgUser}
              src={user.photoURL}
              alt="foto"
              referrerpolicy="no-referrer"
            />
            <span> {user.displayName} </span>
          </li>
          <li>
            <button className="contrast outline" onClick={() => signOut()}>
              sair
            </button>
          </li>
        </ul>
      </nav>

      <div></div>

      <div className="container center">
        <h1> Questões</h1>

        <QuestionCard img={learningqLogo} title='Select 1' />
      </div>
    </>
  );
}
