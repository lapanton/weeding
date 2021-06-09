import React from 'react';

export const GuestList = ({ guests }) => {
  if (!guests.length) {
    return <p className="center">Загружается, пожалуйста подождите.....</p>
  }

  return (
    <>
      <h6>Ответы:</h6>
      { guests.map((guest) => {
        return (
          <div key={guest._id}>
            <p>
              <span className="mr5">Имя: <span className="textBold">{guest.name}</span></span>
              <span className="mr5">Время: <span className="textBold">{guest.time}</span></span>
              <span className="mr5">Дети: <span className="textBold">{guest.children}</span></span>
              <span className="mr5">Второй день: <span className="textBold">{guest.stay}</span></span>
              <span className="mr5">Паркинг: <span className="textBold">{guest.parking}</span></span>
              <span className="mr5">Номер автомобиля: <span className="textBold">{guest.parkingPlace}</span></span>
              <span className="mr5">МСК: <span className="textBold">{guest.moscow}</span></span>
              <span className="mr5">Ночлег: <span className="textBold">{guest.stay}</span></span>

              {(guest.childquantity !== '') && <span className="mr5">Количество детей: <span className="textBold">{guest.childquantity}</span></span> }
              {(guest.songs !== '') && <span className="mr5">Песни: <span className="textBold">{guest.songs}</span></span> }
              {(guest.traditions !== '') && <span className="mr5">Рекомендации: <span className="textBold">{guest.traditions}</span></span> }
            </p>
            <ul>
              {
                guests[0].master.map((entry, key) => {
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
                guests[0].more.map((entry, key) => {
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
                guests[0].muzei.map((entry, key) => {
                  return (
                    <li key={key}>
                      - {entry}
                    </li>
                  )
                })
              }
            </ul>
            <hr/>
          </div>
        )
      }) }
      </>
  )
}
