import React from 'react';
import { useSelector } from 'react-redux';
import { LoaderSlice } from '.././store/loaderSlice';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners'; 

const Loader = () => {
  const isLoading = useSelector(LoaderSlice);

  const loaderStyle = css`
    display: block;
    margin: 0 auto;
    border-color: red; // Customize the color if needed
  `;

  return (
    isLoading && (
      <div className="loader">
        <RingLoader color={'#123abc'} css={loaderStyle} size={100} />
      </div>
    )
  );
};

export default Loader;
