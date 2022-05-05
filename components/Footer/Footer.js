import classnames from 'classnames';
import Link from 'next/link';

import Socials from '@/components/Socials';

import { urlFor } from '../../utils/sanity';

import styles from './Footer.module.scss';

const Footer = ({ LayoutData }) => {
  const {
    footerLogo,
    menuLinkArr,
    technicalLinkArr,
    contactLinkObj,
    footerCopyrightText,
    socials,
  } = LayoutData;
  const { emailAddress, phoneNumber } = contactLinkObj;

  return (
    <footer className={styles.wrapper}>
      <div className={classnames(styles.container, 'container')}>
        <div className={styles.row}>
          <div className={styles.logo}>
            <Link href="/">
              <a href="home">
                <img className="logo" src={urlFor(footerLogo)} />
              </a>
            </Link>
          </div>

          <div className={styles.nav}>
            <div className={styles.column}>
              {menuLinkArr.map(({ navLink, navName }, index) => {
                return (
                  <Link href={`/${navLink.current}`} passHref key={index}>
                    <a href={navLink.current} className={styles.link}>
                      {navName}
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className={styles.column}>
              {technicalLinkArr.map(({ navLink, navName }, index) => {
                return (
                  <Link href={`/${navLink.current}`} passHref key={index}>
                    <a href={navLink.current} className={styles.link}>
                      {navName}
                    </a>
                  </Link>
                );
              })}
            </div>
            <div className={styles.column}>
              <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
              <a href={`tel:${phoneNumber.replace(/[\s\(\),%]/g, '')}`}>
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.copyright}>{footerCopyrightText}</div>
          <div className={styles.socials}>
            <Socials socials={socials} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
