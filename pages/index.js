// Load the Head component from Next.js
import Head from 'next/head';
// Load the default Layout and the siteTitle value from components
import Layout, { siteTitle } from '../components/layout';
// Load CSS module classes as an object
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts-json.js';
import Link from 'next/link';
import Date from '../components/date';
 

// Define and export the Home page component
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}
export default function Home({ allPostsData }) {
  return (
      <Layout home>
        <h1>Latest Worpress Posts</h1>
          <ul className="list-group">
            {allPostsData.map(({ id, title }) => (
              <li key={id} className="list-group-item">
                <Link href={`/posts/${id}`}>{title}</Link>
              </li>
            ))}
          </ul>
      </Layout>
  );
}
