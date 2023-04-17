import React from 'react'
import Box from '../../components/box/Box'
import style from './Question.module.css'
import ErrorMessage from '../../components/error-message/ErrorMessage';

export default function Question() {
  return (
    <div className={`container center ${style.question}`}>
      <h1>Select 1</h1>
      <p>Observe o Schema abaixo e faça o que se pede</p>
      <img
        className={style.imgContexto}
        src="https://www.premierpet.com.br/wp-content/uploads/2020/10/banner-gato-3.jpg"
        alt="imagem qualuqer"
      />

      <h5>Busque todos os dados da tabela "usuários"</h5>
      <h5>
        Para realizar a tarefa, arraste os blocos da linha para a caixa na
        sequência correta.
      </h5>

      <ErrorMessage />

      <div id={style.dropzone}></div>

      <div id={style.answerzone}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </div>

      <div className="grid">
        <button className="outline">Voltar</button>
        <button className="secondary outline">Resetar</button>
        <button className="contrast">Confirmar</button>
      </div>
    </div>
  );
}
