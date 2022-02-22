import classnames from 'classnames';

import styles from './Burger.module.scss';

const Burger = ({ onClick, isBurgerActive }) => {
  return (
    <button
      className={classnames(styles.wrapper, {
        [styles.isBurgerActive]: isBurgerActive,
      })}
      type="button"
      onClick={onClick}
    >
      <div className={styles.line} />
    </button>
  );
};

export default Burger;
