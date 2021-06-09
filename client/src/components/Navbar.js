import React, {useContext} from 'react';
import { useHistory} from 'react-router-dom'; // NavLink
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <nav>
      <div className="nav-wrapper pink darken-3" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">Свадьба Диомида и Марии</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {/*<li><NavLink to="/create">Создать</NavLink></li>*/}
          {/*<li><NavLink to="/links">Ссылки</NavLink></li>*/}
          <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}
