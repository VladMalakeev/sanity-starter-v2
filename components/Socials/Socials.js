import { urlFor } from '../../utils/sanity';

import styles from './Socials.module.scss';

const Socials = ({ socials }) => {
  const {
    instagram: { instagramLink, instagramIcon },
    dribble: { dribbleLink, dribbleIcon },
    twitter: { twitterLink, twitterIcon },
    youtube: { youtubeLink, youtubeIcon },
  } = socials;

  return (
    <ul className={styles.wrapper}>
      <li className={styles.socialItem}>
        <a href={instagramLink?.current}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            src={urlFor(instagramIcon)}
            alt="Instagram"
          />
        </a>
      </li>
      <li className={styles.socialItem}>
        <a href={dribbleLink?.current}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            src={urlFor(dribbleIcon)}
            alt="Dribble"
          />
        </a>
      </li>
      <li className={styles.socialItem}>
        <a href={twitterLink?.current}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            src={urlFor(twitterIcon)}
            alt="Twitter"
          />
        </a>
      </li>
      <li className={styles.socialItem}>
        <a href={youtubeLink?.current}>
          <img
            className={styles.socialIcon}
            loading="lazy"
            src={urlFor(youtubeIcon)}
            alt="YouTube"
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
