import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {TextComponent} from "../components/TextComponent";
import {Timer} from "../components/Timer";

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: (event.target.value).toLowerCase() })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message)
      if (data) {
        setTimeout(async () => {
          await  loginHandler()
        }, 300);
      }
    } catch (e) {}
  }

  return (
    <div className="container">
      <div className="row">
        <div className="text-center">
          <h6> Здравствуйте уважаемые и дорогие наши гости</h6>
          <p>Диомид и Мария приглашают Вас на свадебное торжество в пятницу 07.08.2020 </p>
          <p>В <a href="https://banketgallery.ru/" target="_blank" rel="noopener noreferrer">Банкетный зал Галерея</a> на территории <a
            href="https://www.kremlin-izmailovo.com/" target="_blank" rel="noopener noreferrer">Измайловского Кремля</a></p>
          <p>по адресу: город Москва, Измайловское Шоссе, 73ж (ближайшая станция метро Партизанская)</p>
        </div>
        <div className="">
          <div className="text-center">
            <h6>Зарегистрируйтесь и ответьте на вопросы</h6>
          </div>
          <div>
            <TextComponent />
          </div>
          <div className="wrapper_login_form text-center">
            <div className="card pink darken-3 ">
              <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                <div>

                  <div className="input-field">
                    <input
                      placeholder="Введите email"
                      id="email"
                      type="text"
                      name="email"
                      className="yellow-input"
                      value={form.email}
                      onChange={changeHandler}
                    />
                    <label htmlFor="email">Email</label>
                  </div>

                  <div className="input-field">
                    <input
                      placeholder="Введите пароль"
                      id="password"
                      type="password"
                      name="password"
                      className="yellow-input"
                      value={form.password}
                      onChange={changeHandler}
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>

                </div>
              </div>
              <div className="card-action">
                <button
                  className="btn cyan darken-1"
                  style={{marginRight: 10}}
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Войти
                </button>
                <button
                  className="btn blue lighten-3 black-text"
                  onClick={registerHandler}
                  disabled={loading}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>

          <div>
            <Timer/>
          </div>

          <div className="text-center">
              <div className="wait-for">
              <h6>Вас ждет: </h6>
              <ul>



                <li><span>в 12.00 будет торжественная регистрация в ЗАГСе</span></li>
                <li><span>в 13.00 будет таинство венчания</span></li>
                <li><span>с 14 до 16.00 предложим Вам поучаствовать в интереснейших экскурсиях, мастер-классах, квестах на выбор</span></li>
                <li><span>к 16.00 ждём Вас в ресторан</span></li>
                <li><span>в 23.00 красочная церемония закрытия</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
