import React, { useEffect } from 'react';
import QuestionCard from '../../components/question/QuestionCard';
import { AuthGoogleContext } from '../../context/AuthGoogle';
import style from './Home.module.css';
import learningqLogo from '/logo_whitebg.svg';
import { app } from '../../services/firebaseConfig';
import { getFirestore, getDocs, collection } from 'firebase/firestore'

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const { user, signOut } = React.useContext(AuthGoogleContext);

  const [questions, setQuestions] = React.useState([])

  const db = getFirestore(app)
  const useCollectionRef = collection(db, 'questions')

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      const data = await getDocs(useCollectionRef);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    }
    getQuestions()
  }, [])

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
              referrerPolicy="no-referrer"
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
        {loading && (
          <a href="#" aria-busy="true">
            Buscando as questões, calminha aí!!
          </a>
        )}
        <div className="grid">
          {questions.map((question) => {
            return <QuestionCard key={question.id} {...question} />;
          })}
        </div>
      </div>
      <footer>
        <a href="#">Sobre este site.</a>
      </footer>
    </>
  );
}
