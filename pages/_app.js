// import node module libraries
import Head from 'next/head';
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

// import provider and store from redux state management.
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { SessionProvider, useSession } from "next-auth/react";
import 'styles/theme.scss';
import DefaultLayout from 'layouts/marketing/DefaultLayout';
import DashboardIndex from 'layouts/dashboard/DashboardIndex';
import Script from 'next/script';

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const pageURL = process.env.baseURL + router.pathname;
  const title = "Cybrom technology pvt. ltd. ";
  const description = "Cybrom is the best institution for software development institution ";
  const keywords = "Cybrom, Nextjs, Next.js, Course, Sass, landing, Marketing, admin themes, Nextjs admin, Nextjs dashboard, ui kit, web app, multipurpose";
  const Layout = Component.Layout || (router.pathname.includes('dashboard') ? (router.pathname.includes('instructor') || router.pathname.includes('student') ? DefaultLayout : DashboardIndex) : DefaultLayout);

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={keywords} />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.2.0/uicons-regular-rounded/css/uicons-regular-rounded.css'></link>
      </Head>
      <NextSeo
        title={title}
        description={description}
        canonical={pageURL}
        openGraph={{
          url: pageURL,
          title: title,
          description: description,
          site_name: process.env.siteName,
          images: [
            {
              url: '/images/og/geeks-ui-next-js-default-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Cybrom  design',
            },
          ],
        }}
      />
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}


function Auth({ children, adminOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession(
    {
      required: true,
      onUnauthenticated() {
        router.push("/authentication/sign-in?message=loging required");
      },
    });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (adminOnly && !session.user.role) {
    router.push("/unauthorized?message=admin login required");
  }

  return children;
}

export default MyApp
