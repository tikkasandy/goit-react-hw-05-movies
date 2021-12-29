import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navbar.module.scss';

const Navbar = () => (
  <header className={s.Navbar}>
    <ul className={s.NavList}>
      <li>
        <NavLink to="/" exact className={s.NavItem} activeClassName={s.Active}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies" className={s.NavItem} activeClassName={s.Active}>
          Movies
        </NavLink>
      </li>
    </ul>
  </header>
);

export default Navbar;
