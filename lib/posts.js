import fs from 'fs';
import path from 'path';


// Absolute path to the posts directory
const dataStore = path.join(process.cwd(), 'data');

// Read all posts, parse metadata, and return them sorted by date
export function getSortedPostsData() {
  const filePath = path.join(dataStore, 'posts.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj = JSON.parse(jsonString);
  jsonObj.sort(function(a, b) {
    return a.title.localeCompare(b.title);
  });
  return jsonObj.map(item => {
    return {
      id: item.id,
      title: item.title,
      date: item.date
    };
  })


}
  
// Return an array of objects with params for getStaticPaths()
export function getAllPostIds() {
 
}

// Read a single markdown file, parse metadata, and convert markdown to HTML
export async function getPostData(id) {
  
}