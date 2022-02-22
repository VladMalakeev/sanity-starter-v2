import classnames from 'classnames';
import Link from 'next/link';

import Button, { VARIANTS, COMPONENTS } from '@/components/Button';

import styles from './Navigation.module.scss';

const Navigation = ({ isNavigationOpen }) => {
  return (
    <nav
      className={classnames(styles.wrapper, {
        [styles.menuIsOpen]: isNavigationOpen,
      })}
    >
      <Link href="/about" passHref>
        <a href="about" className={styles.link}>
          About
        </a>
      </Link>
      <Link href="/blog" passHref>
        <a href="blog" className={styles.link}>
          Blog
        </a>
      </Link>
      <Button
        type="button"
        component={COMPONENTS.BUTTON}
        disabled
        variant={VARIANTS.SECONDARY}
        className={styles.button}
      >
        Sign in
      </Button>
    </nav>
  );
};

export default Navigation;
