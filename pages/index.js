// Load the Head component from Next.js
import Head from 'next/head';
// Load the default Layout and the siteTitle value from components
import Layout, { siteTitle } from '../components/layout';
// Load CSS module classes as an object
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts-json';
import Link from 'next/link';
import Date from '../components/date';
 

// Define and export the Home page component
export default function Home({ allPostsData }) {
  // Return the page UI (JSX starts here)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! 👋🏾 I’m <strong>Devin-Ariel</strong>, a tech-savvy, people-first IT professional and student with 10+ years in consumer tech. I’m passionate about creating digital solutions that work for real people. I specialize in user support, systems analysis, and accessible web design. I’m all about making tech feel more intuitive and simple for tech and non-tech folks alike!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
      
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  ); // End of the returned JSX
} // End of the Home component
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}