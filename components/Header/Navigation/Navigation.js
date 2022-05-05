import classnames from 'classnames';
import Link from 'next/link';

import Button, { VARIANTS, COMPONENTS } from '@/components/Button';

import styles from './Navigation.module.scss';

const Navigation = ({ menuLinkArr, buttonObj, isNavigationOpen }) => {
  return (
    <nav
      className={classnames(styles.wrapper, {
        [styles.menuIsOpen]: isNavigationOpen,
      })}
    >
      {menuLinkArr.map(({ navLink, navName }, index) => {
        return (
          <Link href={`/${navLink.current}`} passHref key={index}>
            <a href={navLink.current} className={styles.link}>
              {navName}
            </a>
          </Link>
        );
      })}

      <Button
        type="button"
        component={COMPONENTS.BUTTON}
        disabled
        variant={VARIANTS.SECONDARY}
        className={styles.button}
      >
        {buttonObj.buttonText}
      </Button>
    </nav>
  );
};

export default Navigation;
