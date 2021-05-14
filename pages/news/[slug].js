import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import moment from 'moment';
import { useRouter } from 'next/router';

function Home({ now }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Generated <code className={styles.code}>/{slug}</code> at{' '}
          <code className={styles.code}>
            {moment(now).fromNow()} [{(Date.now() - now) / 1000} seconds]
          </code>
          {!router.isFallback && <> as fallback</>}.
        </p>

        <p>
          Router.query <pre>{JSON.stringify(router.query, null, 2)}</pre>
        </p>
        <p>
          Router.asPath <pre>{JSON.stringify(router.asPath, null, 2)}</pre>
        </p>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://nextjs-time-api.vercel-support.app/api/time'
  );
  const { now } = await res.json();

  return {
    props: {
      now,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 180 seconds
    revalidate: 180, // In seconds
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [],
  };
}

export default Home;
