import React from 'react'
import style from './ErrorMessage.module.css'

export default function ErrorMessage() {
  return (
    <div className={style.error}>Algo de errado não está certo :/</div>
  )
}
