import React from 'react'

//Este componente deberia recibir por props y mostrar en pantalla la informacion
//que envia el usuario 

const Card = ({values}) => {
  console.log(values)
  return (
    <div>
        <h2>Hola {values.email} </h2>
        <h4>Eres de: {values.country.toUpperCase()}</h4>
        <h4>Tu genero elegido es: {values.gender}</h4>
        <h4>Tu fecha de nacimiento es: {values.dateOfBirth}</h4>
        <p>tu contraseña es {values.password}</p>
    </div>
  )
}

export default Card