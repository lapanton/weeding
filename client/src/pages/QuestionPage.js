import React, { useContext, useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'
import {useMessage} from '../hooks/message.hook'
import {Footer} from "../components/Footer";

export const QuestionPage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {request} = useHttp()
  const [name, setName] = useState('');
  const [willbe, setWillbe] = useState('');
  const [time, setTime] = useState('');
  const [children, setChildren] = useState('');
  const [childquantity, setChildquantity] = useState('');
  const [stay, setStay] = useState('');
  const [parking, setParking] = useState('');
  const [parkingPlace, setParkingPlace] = useState('');
  const [songs, setSongs] = useState('');
  const [traditions, setTraditions] = useState('');
  const [transfer, setTransfer] = useState('');
  const [moscow, setMoscow] = useState('');
  const {token} = useContext(AuthContext);

  // Checkboxes
  const [muzei, setMuseu] = useState([]);
  const [master, setMaster] = useState([]);
  const [more, setMore] = useState([]);

  const handleCheckMuzeu = (event) => {
    const { value } = event.target;
    setMuseu(muzei.includes(value) ? muzei.filter(c => c !== value) : [...muzei, value]);
  };

  const handleCheckMaster = (event) => {
    const { value } = event.target;
    setMaster(master.includes(value) ? master.filter(c => c !== value) : [...master, value]);
  };

  const handleCheckMore = (event) => {
    const { value } = event.target;
    setMore(more.includes(value) ? more.filter(c => c !== value) : [...more, value]);
  };
  // Checkboxes


  const checkFilled = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      if (fetched && fetched.length > 0) {
        history.push(`/edit/${fetched[0]._id}`)
      }
    } catch (e) { console.log('e', e)}
  }, [token, request, history])

  useEffect(() => {
    checkFilled()
    window.M.updateTextFields()
  }, [checkFilled])

  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const data = await request('/api/link/generate', 'POST',
        { name: name,
          willbe: willbe,
          time: time,
          children: children,
          childquantity: childquantity,
          stay: stay,
          parking: parking,
          parkingPlace: parkingPlace,
          songs: songs,
          traditions: traditions,
          moscow: moscow,
          transfer: transfer,
          muzei: muzei,
          master: master,
          more: more
        }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/detail/${data.link._id}`)
    } catch (e) {
      message(e.message)
    }
  }

  return (
    <>
    <div className="container">
      <div className="row amazing-background">
        <form onSubmit={handleChange} encType="multipart/form-data">
          <div className="text-center">
            <p className="wait-answer">Ждём Ваших ответов до 20 июля включительно.<br/> Внести изменения возможно до 31 июля включительно.</p>
          </div>
          <div className="" style={{paddingTop: '2rem'}}>
            <div className="input-field">
              <input
                placeholder="Введите Имя и фамилию"
                className="color-input"
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <label htmlFor="name">Введите Имя и Фамилию</label>
            </div>
          </div>

          <div>
            <p>
              <label>
                <span>Можем ли мы надеяться на Ваше согласие посетить наш праздник?</span>
              </label>
            </p>
            <p>
              <label>
                <input name="willbe" type="radio" value={"Да"} onChange={e => setWillbe(e.currentTarget.value)} />
                <span>Да</span>
              </label>
            </p>
            <p>
              <label>
                <input name="willbe" type="radio" value={"Нет"} onChange={e => setWillbe(e.currentTarget.value)} />
                <span>Нет</span>
              </label>
            </p>

          </div>

          <div>
            <p>
              В течение всего дня до ресторана Вас ждёт фуршет и прохладительные напитки, с возможностью присесть отдохнуть.
              Планируя свой график дня и время подключения к нам учтите, что по территории компактного культурного комплекса "Измайловский Кремль" может быть интересно просто прогуляться в течение минимум 1 часа.
            </p>
          </div>

          <div className="">
            <div className="input-field">
              <p>
                <label>
                  <span>В какое время Вы намеренны присоединится к нам?</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="time" type="radio" value={"Будем к 12-00"} onChange={e => setTime(e.currentTarget.value)}/>
                  <span>в 12 утра будет торжественная регистрация в ЗАГСе.</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="time" type="radio" value={"Будем к 13-00"} onChange={e => setTime(e.currentTarget.value)} />
                  <span>в 13 часов будет таинство венчания.</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="time" type="radio" value={"Будем к 14-00"} onChange={e => setTime(e.currentTarget.value)} />
                  <span>c 14.00 до 16.00 предложим Вам поучаствовать в интереснейших мастер-классах на выбор.</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="time" type="radio" value={"Будем к 16-00"} onChange={e => setTime(e.currentTarget.value)} />
                  <span>к 16.00 ждем Вас в ресторан.</span>
                </label>
              </p>
              <p>
                <label>
                  <input name="time" type="radio" value={"Не можем сказать во скока но будем"} onChange={e => setTime(e.currentTarget.value)} />
                  <span>#незнаемнобудемдополуночи</span>
                </label>
              </p>
            </div>
          </div>

          <div>
            <p>
              <label>
                <span>Будут ли с Вами несовершеннолетние дети. Если да, то сколько и какого возраста?</span>
              </label>
            </p>
            <p>
              <label>
                <input name="children" type="radio" value={"Да"} onChange={e => setChildren(e.currentTarget.value)} />
                <span>Да</span>
              </label>
            </p>
            <p>
              <label>
                <input name="children" type="radio" value={"Нет"} onChange={e => setChildren(e.currentTarget.value)} />
                <span>Нет</span>
              </label>
            </p>
            <p>
            {(children === 'Да') &&
            <textarea name="childquantity" rows="5" value={childquantity} onChange={e =>setChildquantity(e.target.value)}  placeholder={"Пример: 2 ребенка 10 и 7 лет"} />
            }
            </p>
          </div>

          <div>
            <p>
              <label>
                <span>Останетесь ли Вы с нами на 2 день?</span>
              </label>
            </p>
            <p>
              <label>
                <input name="stay" type="radio" value={"Да"} onChange={e => setStay(e.currentTarget.value)} />
                <span>Да</span>
              </label>
            </p>
            <p>
              <label>
                <input name="stay" type="radio" value={"Нет"} onChange={e => setStay(e.currentTarget.value)} />
                <span>Нет</span>
              </label>
            </p>

          </div>

          <div>
            <p>
              <label>
                <span>Нужна ли Вам будет парковка для автомобиля возле нашего ресторана?</span>
              </label>
            </p>
            <p>
              <label>
                <input name="parking" type="radio" value={"Да"} onChange={e => setParking(e.currentTarget.value)} />
                <span>Да</span>
              </label>
            </p>
            <p>
              <label>
                <input name="parking" type="radio" value={"Нет"} onChange={e => setParking(e.currentTarget.value)} />
                <span>Нет</span>
              </label>
            </p>
            <p>
              {(parking === 'Да') &&
              <textarea name="parkingPlace" rows="1" value={parkingPlace} onChange={e =>setParkingPlace(e.target.value)}  placeholder={"Пример: Nissan C 065 MK"} />
              }
            </p>

          </div>

          <div>
            <p>
              <label>
                <span>Подскажите нам песни, которые, по Вашему мнению, непременно должны прозвучать (или Вам было бы приятно услышать) на нашей свадьбе:</span>
              </label>
              <textarea name="songs" rows={15} value={songs} onChange={e => setSongs(e.target.value)} placeholder={"Пример: Zivert - Credo , JANAGA - Малыш"} />
            </p>
          </div>

          <div>
            <p>
              <label>
                <span>Порекомендуйте нам фольклорные или современные традиции, которые, по Вашему мнению, непременно должны быть соблюдены (или вам было бы интересно увидеть) на нашей свадьбе:</span>
              </label>
              <textarea name="traditions" rows={15} value={traditions} onChange={e => setTraditions(e.target.value)} placeholder={"Пример: выпуск голубей из рук жениха и невесты по выходе из храма"} />
            </p>
          </div>

          <div>
            <p>
              <label>
                <span>Вы приедете к нам на праздник:</span>
              </label>
            </p>
            <p>
              <label>
                <input name="moscow" type="radio" value={"Да"} onChange={e => setMoscow(e.currentTarget.value)} />
                <span>Из Москвы</span>
              </label>
            </p>
            <p>
              <label>
                <input name="moscow" type="radio" value={"Нет"} onChange={e => setMoscow(e.currentTarget.value)} />
                <span>Из другого населенного пункта</span>
              </label>
            </p>
            <p>
              {(moscow === 'Нет') &&
              <textarea name="transfer" rows="5" value={transfer} onChange={e =>setTransfer(e.target.value)}  placeholder={"Нужно ли вам организовать ночлег в Москве или справляетесь самостоятельно? На какие даты Вы планируете побывание в Москве?  Нужно ли Вам помочь организовать трансфер и/или сопровождение по Москве или справляетесь самостоятельно? Опишите, какое именно наше содействие может оказаться Вам полезным?"} />
              }
            </p>
          </div>

          <hr/>
          <br/>
          <br/>
          <div className="text-center line-h">
            <h6>Делая выбор, имейте в виду, что каждое мероприятие длится час-полтора. Все мероприятия предлагаются Вам безвозмездно. Предлагаем Вашему вниманию и участию:</h6>
          </div>
          <br/>
          <div>
            <p>
              <label>
                <span>Музеи (с экскурсиями и мастер-классами на территории Измайловского Кремля):</span>
              </label>
            </p>

            <p>
              <label>
                <input name="muzei" value="истории российского флота" type="checkbox" onChange={e => handleCheckMuzeu(e)}  />
                <span>истории российского флота</span>
              </label>
            </p>
            <p>
              <label>
                <input name="muzei" value="утюга" type="checkbox" onChange={e => handleCheckMuzeu(e)} />
                <span>утюга</span>
              </label>
            </p>
            <p>
              <label>
                <input name="muzei" value="оружия" type="checkbox" onChange={e => handleCheckMuzeu(e)}  />
                <span>оружия</span>
              </label>
            </p>
            <p>
              <label>
                <input name="muzei" value="истории русской водки" type="checkbox" onChange={e => handleCheckMuzeu(e)}  />
                <span>истории русской водки</span>
              </label>
            </p>
            <p>
              <label>
                <input name="muzei" value="истории невидимых вещей (типа совести и т.д.)" type="checkbox" onChange={e => handleCheckMuzeu(e)} />
                <span>истории невидимых вещей (типа совести и т.д.)</span>
              </label>
            </p>
            <p>
              <label>
                <input name="muzei" value="всемирной истории в пластилине" type="checkbox" onChange={e => handleCheckMuzeu(e)} />
                <span>всемирной истории в пластилине</span>
              </label>
            </p>

          </div>
          <hr/>
          <br/>

          <div>
            <p>
              <label>
                <span>Mастер-классы:</span>
              </label>
            </p>

            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="изготовление авторских декоративных свечей" type="checkbox" />
                <span>изготовление авторских декоративных свечей</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="гончарное дело" type="checkbox" />
                <span>гончарное дело</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="фольклорная роспись имбирных пряников" type="checkbox" />
                <span>фольклорная роспись имбирных пряников</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="фольклорная роспись деревянных игрушек" type="checkbox" />
                <span>фольклорная роспись деревянных игрушек</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="шоколадно-конфето-варение" type="checkbox" />
                <span>шоколадно-конфето-варение</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="выплетаем из бисера каменный цветок (в итоге создаем брош-цветок)" type="checkbox" />
                <span>выплетаем из бисера "каменный цветок" (в итоге создаем брошь-цветок)</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="интермодальное занятие Ковер мечтаний (коллективно создаём ковер из шерсти в технике мокрого валяния и дарим его молодожёнам на счастье)" type="checkbox" />
                <span>интермодальное занятие  "Ковер мечтаний" (коллективно создаём ковер из шерсти в технике мокрого валяния и дарим его молодожёнам на счастье)</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="выплавление авторских украшений из бусин (лэмпворк)" type="checkbox" />
                <span>выплавление авторских украшений из бусин (лэмпворк)</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="сладкая лепка из марципана" type="checkbox" />
                <span>сладкая лепка из марципана</span>
              </label>
            </p>
            <p>
              <label>
                <input name="master" onChange={e => handleCheckMaster(e)} value="лекция сомелье с дегустацией вин" type="checkbox" />
                <span>лекция сомелье с дегустацией вин</span>
              </label>
            </p>

          </div>

          <hr/>
          <br/>

          <div>
            <p>
              <label>
                <span>Также желающих ждёт:</span>
              </label>
            </p>

            <p>
              <label>
                <input name="more" onChange={e => handleCheckMore(e)} value="ознакомительная экскурсию по всему Измайловскому Кремлю"  type="checkbox" />
                <span>ознакомительная экскурсию по всему Измайловскому Кремлю</span>
              </label>
            </p>
            <p>
              <label>
                <input name="more" onChange={e => handleCheckMore(e)} value="интересный квест по Измайловскому Кремлю" type="checkbox" />
                <span>интересный квест по Измайловскому Кремлю</span>
              </label>
            </p>
            <p>
              <label>
                <input name="more" onChange={e => handleCheckMore(e)} value="интересный квест по историческом центру Москвы" type="checkbox" />
                <span>интересный квест по историческом центру Москвы</span>
              </label>
            </p>

          </div>
        <hr/>


          <br/><br/><br/>
          <div className="text-center mtb10">
            <p>Благодарим за подробные ответы. Они помогут нам сделать праздник ярче.
              До 20 июля включительно с интересом ждём обратной связи.
              До 3 августа включительно вышлем вам рекомендуемый индивидуальный график дня (в соответствии с выбранными ответами).
              Если у Вас что-либо изменится - обязательно сообщите как можно заблаговременно. </p>
              <h6>От всей души будем рады прожить с вами вместе светлый день рождения нашей семьи!</h6>
          </div>
          <br/>
          <br/>

          <div>
            <input type="submit" value="Сохранить" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
      <Footer />
    </>
  )
}
