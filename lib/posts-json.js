// import fs from 'fs'; // filesystem module for reading files
//import path from 'path'; // path utilities for file paths

//const dataStore = path.join(process.cwd(), 'data'); // absolute path to data directory

import got from 'got'; // HTTP request library

// define URL for rest API endpoint
const dataURL = 'https://dev-my-sql-test-site.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1';

// helper to fetch and parse JSON from the remote endpoint
async function fetchJson() {
  try {
    const res = await got(dataURL);
    return JSON.parse(res.body || '[]');
  } catch (err) {
    // return empty array on error to keep callers predictable
    console.error('fetchJson error:', err.message || err);
    return [];
  }
}

export async function getSortedPostsData() { // return posts sorted newest-first
  const jsonObj = await fetchJson();
  // if remote returns different shape, try fallback sorting
  jsonObj.sort(function (a, b) {
    // prefer date field, fallback to title
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.post_date && b.post_date) return b.post_date.localeCompare(a.post_date);
    return (b.title || b.post_title || '').localeCompare(a.title || a.post_title || '');
  });
  return jsonObj.map((item) => ({
    id: (item.id || item.ID || '').toString(),
    title: item.title || item.post_title || '',
    date: item.date || item.post_date || ''
  }));
}

export async function getAllPostIds() { // return list of params for getStaticPaths
  const jsonObj = await fetchJson();
  return jsonObj.map((item) => ({
    params: {
      id: (item.id || item.ID || '').toString()
    }
  }));
}

export async function getPostData(id) { // return a single post by id
  const jsonObj = await fetchJson();
  const objReturned = jsonObj.filter((obj) => {
    return (obj.id || obj.ID || '').toString() === id;
  });
  if (objReturned.length === 0) {
    return {
      id: id,
      title: 'Post Not Found',
      date: '',
      contentHtml: '<p>Sorry, the post you are looking for does not exist.</p>'
    };
  }
  return objReturned[0];
}