import Hero from './components/hero';
import Head from 'next/head';

const App = () => {
  return (
    <>
        <Head>
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Hero />
      </>
  );
};

export default App;
