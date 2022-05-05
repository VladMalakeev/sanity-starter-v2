import classnames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

import { urlFor } from '../../utils/sanity';
import Navigation from './Navigation';
import Burger from './components/Burger';

import styles from './Header.module.scss';

const Header = ({ LayoutData }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const handleBurgerClick = () => {
    setMenuOpen((isOpen) => !isOpen);
  };

  const { logo, menuLinkArr, buttonObj } = LayoutData;

  return (
    <header className={styles.wrapper}>
      <div className={classnames(styles.container, 'container')}>
        <div className={styles.logo}>
          <Link href="/">
            <a href="home">
              <img className="logo" src={urlFor(logo)} />
            </a>
          </Link>
        </div>

        <Navigation
          menuLinkArr={menuLinkArr}
          buttonObj={buttonObj}
          isNavigationOpen={isMenuOpen}
        />

        <Burger onClick={handleBurgerClick} isBurgerActive={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
