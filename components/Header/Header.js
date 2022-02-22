import { useState } from 'react';

import Logo from '@/components/assets/Logo';

import Navigation from './Navigation';
import Burger from './components/Burger';

import styles from './Header.module.scss';

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleBurgerClick = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <Navigation isNavigationOpen={isMenuOpen} />

        <Burger onClick={handleBurgerClick} isBurgerActive={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
