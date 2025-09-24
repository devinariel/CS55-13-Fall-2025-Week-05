import fs from 'fs'; // filesystem module for reading files
import path from 'path'; // path utilities for file paths

const dataStore = path.join(process.cwd(), 'data'); // absolute path to data directory

export function getSortedPostsData() { // return posts sorted newest-first
  const filePath = path.join(dataStore, 'posts.json'); // path to posts.json
  const jsonString = fs.readFileSync(filePath, 'utf8'); // read file as utf8
  const jsonObj = JSON.parse(jsonString); // parse JSON string into object
  jsonObj.sort(function(a, b) { // sort array in-place by date descending
    return b.date.localeCompare(a.date); // compare dates as strings
  });
  return jsonObj.map(item => { // map to pared-down post objects
    return {
      id: item.id, // post id
      title: item.title, // post title
      date: item.date // post date
    };
  })

} // end getSortedPostsData

export function getAllPostIds() { // return list of params for getStaticPaths
    const filePath = path.join(dataStore, 'posts.json'); // posts.json path
    const jsonString = fs.readFileSync(filePath, 'utf8'); // read file
    const jsonObj = JSON.parse(jsonString); // parse JSON
    return jsonObj.map(item => { // map each post to params object
      return {
        params: {
          id: item.id.toString() // ensure id is a string
        }
      };
    });
} // end getAllPostIds

export function getPostData(id) { // return a single post by id
  const filePath = path.join(dataStore, 'posts.json'); // posts.json path
  const jsonString = fs.readFileSync(filePath, 'utf8'); // read file
  const jsonObj = JSON.parse(jsonString); // parse JSON
  const objReturned = jsonObj.filter(obj => { // filter for matching id
     return obj.id.toString() === id; // compare as strings
  });
  if (objReturned.length === 0) { // not found fallback
    return {
      id: id, // requested id
      title: "Post Not Found", // fallback title
      date: "", // empty date
      contentHtml: "<p>Sorry, the post you are looking for does not exist.</p>" // fallback HTML
    }
  } else {
    return objReturned[0]; // return the found post
  }   

} // end getPostData