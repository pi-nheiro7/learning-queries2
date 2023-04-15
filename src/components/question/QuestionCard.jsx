import React from 'react'
import style from './questions.module.css'
import { Link } from 'react-router-dom'

export default function QuestionCard(props) {
  return (
    <Link to={`/home/question/1`} className={style.questionCard}>
      <img src={props.img} alt="imagem da questão" />
      <p>{props.title}</p>
    </Link>
  )
}
