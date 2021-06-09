import React from 'react'
import {Link} from 'react-router-dom'

export const DetailCard = ({ link }) => {
  return (
    <div className="wrapper-detail">
      <div className="text-center">
        <h4>Спасибо за ответы!</h4>
      </div>
      <p>Имя и фамилия: { link.name }</p>
      <p>Приду: { link.willbe }</p>
      <p>Время прибытия: { link.time }</p>
      <p>Будут ли с вами дети: { link.children }</p>
      { link.childquantity.length ? <p>Число детей и их возвраст: { link.childquantity}</p> : "" }
      <p>Останетесь на второй день: { link.stay }</p>
      <p>Нужен ли паркинг: { link.parking }</p>
      <p>Номер автомобиля: { link.parkingPlace }</p>
      <p>Рекомендованные песни: { link.songs }</p>
      <p>Рекоммендованные традиции: { link.traditions }</p>
      <p>Вы из Москвы: { link.moscow }</p>
      { link.transfer.length ? <p>Организаця трансфера и ночлега: { link.transfer}</p> : "" }
      <p className="hidden">Дата заполнения: <strong>{new Date( link.date ).toLocaleDateString()}</strong></p>
      <br/>
      <p>Развлечения:</p>
      <ul>
        {
          link.master.map((entry, key) => {
            return (
              <li key={key}>
                  - {entry}
              </li>
          )
        })
        }
      </ul>

      <ul>
        {
          link.more.map((entry, key) => {
            return (
              <li key={key}>
                - {entry}
              </li>
            )
          })
        }
      </ul>

      <ul>
        {
          link.muzei.map((entry, key) => {
            return (
              <li key={key}>
                - {entry}
              </li>
            )
          })
        }
      </ul>


        <div className="text-right">
            <Link to={`/create/`} className="btn btn-primary">Изменить ответы</Link>
        </div>
    </div>
  )
}
