import classnames from 'classnames';
import Link from 'next/link';
import { oneOf, string, node } from 'prop-types';

import styles from './Button.module.scss';

export const VARIANTS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
};

export const COMPONENTS = {
  BUTTON: 'button',
  LINK: 'link',
};

const Button = ({ type, component, variant, link, children, className }) => {
  const renderComponent = (componentType) => {
    switch (componentType) {
      case COMPONENTS.BUTTON:
        return (
          <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={classnames(styles.wrapper, className, {
              [styles[variant]]: variant,
            })}
          >
            {children}
          </button>
        );
      case COMPONENTS.LINK:
        return (
          <Link href={link} passhref>
            <a
              href={link}
              className={classnames(styles.wrapper, className, {
                [styles[variant]]: variant,
              })}
            >
              {children}
            </a>
          </Link>
        );
      default:
        return (
          <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            className={classnames(styles.wrapper, className, {
              [styles[variant]]: variant,
            })}
          >
            {children}
          </button>
        );
    }
  };
  return renderComponent(component, children);
};

Button.propTypes = {
  type: string,
  children: node,
  component: oneOf(Object.values(COMPONENTS)),
  variant: oneOf(Object.values(VARIANTS)),
};

Button.defaultProps = {
  type: 'button',
  children: null,
  component: COMPONENTS.BUTTON,
  variant: VARIANTS.PRIMARY,
};

export default Button;
