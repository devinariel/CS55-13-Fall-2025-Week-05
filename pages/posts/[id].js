// Page layout wrapper component
import Layout from '../../components/layout';
// Data helpers for posts
import { getAllPostIds, getPostData } from '../../lib/posts-json.js';
// Head element manager from Next.js
import Head from 'next/head';
// Small date formatter component
import Date from '../../components/date';
import Image from 'next/image';
// Utility CSS module for styling
import utilStyles from '../../styles/utils.module.css';


export async function getStaticPaths() {
  const paths = await getAllPostIds();
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

export default function Entry({ postData }) {
  return (
    <Layout>
      <article className="card col-8">
        <div className="card-body">
          <h1 className="card-title">{postData.post_title || postData.title}</h1>
          <p className="card-subtitle mb-2 text-muted">{postData.post_date || postData.date}</p>
          <div className="card-text" dangerouslySetInnerHTML={{ __html: postData.post_content || postData.content || '' }} />
        </div>
      </article>
    </Layout>
  );
}