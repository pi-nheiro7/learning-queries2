import React from 'react'
import style from './questions.module.css'

export default function QuestionCard(props) {
  return (
    <a href='#' className={style.questionCard}>
      <img src={props.img} alt="imagem da questão" />
      <p>{props.title}</p>
    </a>
  )
}
