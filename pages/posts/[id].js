// Page layout wrapper component
import Layout from '../../components/layout';
// Data helpers for posts
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Head element manager from Next.js
import Head from 'next/head';
// Small date formatter component
import Date from '../../components/date';
import Image from 'next/image';
// Utility CSS module for styling
import utilStyles from '../../styles/utils.module.css';

// Render a single blog post page using preloaded postData
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        {postData.thumbnail && (
          <div style={{ marginBottom: 12 }}>
            <Image
              src={postData.thumbnail}
              alt={postData.title}
              width={800}
              height={500}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// Next.js: pre-generate all post pages based on markdown filenames
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Next.js: fetch post content and metadata for a given id at build time
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}