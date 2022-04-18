import Link from 'next/link';

import Socials from '@/components/Socials';
import Logo from '@/components/assets/Logo';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.row}>
          <Logo />
          <div className={styles.nav}>
            <div className={styles.column}>
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
            </div>
            <div className={styles.column}>
              <Link href="/terms-of-service" passHref>
                <a href="terms-of-service" className={styles.link}>
                  Terms of Service
                </a>
              </Link>
              <Link href="/privacy-policy" passHref>
                <a href="privacy-policy" className={styles.link}>
                  Privacy Policy
                </a>
              </Link>
            </div>
            <div className={styles.column}>
              <a href="mailto:example@mail.com">example@mail.com</a>
              <a href="tel:+11111111111">+(111) 111 11 111</a>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.copyright}>@2022 All rights reserved</div>
          <div className={styles.socials}>
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
