import { CssBaseline } from '@material-ui/core';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import '../styles/global.scss';

const CustomApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Table Finances</title>
      </Head>
      <Component {...pageProps} />
      ;
      <CssBaseline />
    </>
  );
};

export default CustomApp;
