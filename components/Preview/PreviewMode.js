import Link from 'next/link';
import React, { useState } from 'react';

import style from './style.module.scss';

export const PreviewMode = ({ isLoading }) => {
  const [isOpen, changeState] = useState(true);
  return (
    <div className={style.wrapper} style={{ left: isOpen ? '10px' : '-140px' }}>
      {isLoading ? (
        <span>loading...</span>
      ) : (
        <div className={style.container}>
          <div>
            <p>Preview mode</p>
            <Link href="/api/sanity/exit-preview">
              <a className={style.closeBtn}>exit from preview</a>
            </Link>
          </div>
          <span onClick={() => changeState(!isOpen)}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g
                  id="ic_fluent_ios_chevron_24_filled"
                  fill="#212121"
                  fillRule="nonzero"
                >
                  <path
                    d="M13.2929,4.29289 C12.9024,4.68342 12.9024,5.31658 13.2929,5.70711 L19.5858,12 L13.2929,18.2929 C12.9024,18.6834 12.9024,19.3166 13.2929,19.7071 C13.6834,20.0976 14.3166,20.0976 14.7071,19.7071 L21.7071,12.7071 C22.0976,12.3166 22.0976,11.6834 21.7071,11.2929 L14.7071,4.29289 C14.3166,3.90237 13.6834,3.90237 13.2929,4.29289 Z"
                    id="Path"
                  />
                </g>
              </g>
            </svg>
          </span>
        </div>
      )}
    </div>
  );
};
