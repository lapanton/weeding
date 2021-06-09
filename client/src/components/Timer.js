import React, {useCallback, useEffect, useState} from 'react'

export const Timer = () => {

  const zerofill = num => ((num < 10 && num >= 0) ? `0${num}` : num);

  const SvgCircle = (props) => {
    const { className, done, max, radius, stroke, strokeWidth } = props
    const size = (radius + strokeWidth) * 2
    const length = Math.ceil(2 * radius * Math.PI)
    const remainingLength = length - (Math.ceil(2 * radius * Math.PI) * (done / max))
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle
            className="circle"
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            stroke={stroke}
            strokeDasharray={length}
            strokeDashoffset={remainingLength}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            className="circle--bg"
            r={radius}
            cx={radius + strokeWidth}
            cy={radius + strokeWidth}
            stroke="rgba(0, 0, 0, .1)"
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </g>
      </svg>
    )
  }

  SvgCircle.defaultProps = {
    done: 0,
    max: 24,
    radius: 72,
    stroke: '#e91e63',
    strokeWidth: 8,
  }
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);



  // componentWillMount(){
  //   this.getTimeUntil(this.props.deadline)
  // }
  // componentDidMount(){
  //   this.timerId = setInterval(() => this.getTimeUntil(this.props.deadline), 1000)
  // }
  // componentWillUnmount(){
  //   clearInterval(this.timerId)
  // }
    const deadline = '2020-08-07';
  const getTimeUntil = useCallback((deadline) => {
    const time = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor(time / 1000 % 60)
    const minutes = Math.floor(time / 1000 / 60 % 60)
    const hours = Math.floor(time / (1000 * 60 * 60) % 24)
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [])

  useEffect(()=> {
    setInterval(() => getTimeUntil(deadline), 1000)
  },[getTimeUntil])

  return (
    <>
      <div className="text-center">
      <h6>До свальбы осталось: </h6>
        <div className="clock">
          <div className="clock__display">
            <SvgCircle className="clock__circle" max={365} done={days} />
            <div className="clock__text clock__text--days">
              <span className="clock__amount">{zerofill(days)}</span>
              <span className="clock__unit">Дней</span>
            </div>
          </div>
          <div className="clock__display">
            <SvgCircle max={24} done={hours} />
            <div className="clock__text clock__text--hours">
              <span className="clock__amount">{zerofill(hours)}</span>
              <span className="clock__unit">Часов</span>
            </div>
          </div>
          <div className="clock__display">
            <SvgCircle max={60} done={minutes} />
            <div className="clock__text clock__text--minutes">
              <span className="clock__amount">{zerofill(minutes)}</span>
              <span className="clock__unit">Минут</span>
            </div>
          </div>
          <div className="clock__display">
            <SvgCircle max={60} done={seconds} />
            <div className="clock__text clock__text--seconds">
              <span className="clock__amount">{zerofill(seconds)}</span>
              <span className="clock__unit">Секунд</span>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
