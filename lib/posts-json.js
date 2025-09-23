import fs from 'fs'; // filesystem module for reading files
import path from 'path'; // path utilities for building file paths

const dataStore = path.join(process.cwd(), 'data'); // absolute path to the data directory

export function getSortedPostsData() { // return posts sorted by date
  const filePath = path.join(dataStore, 'posts.json'); // path to posts.json
  const jsonString = fs.readFileSync(filePath, 'utf8'); // read JSON file as string
  const jsonObj = JSON.parse(jsonString); // parse string into JS object/array
  jsonObj.sort(function(a, b) { // sort array in place
    return b.date.localeCompare(a.date); // compare dates for descending order
  }); // end sort
  return jsonObj.map(item => { // map to a lighter-weight object
    return { // return mapping object
      id: item.id, // post id value
      title: item.title, // post title value
      date: item.date // post date value
    }; // end returned object
  }); // end map and return
} // end getSortedPostsData

export function getAllPostIds() { // return array of params objects for Next.js paths
    const filePath = path.join(dataStore, 'posts.json'); // path to posts.json
    const jsonString = fs.readFileSync(filePath, 'utf8'); // read file
    const jsonObj = JSON.parse(jsonString); // parse JSON
    return jsonObj.map(item => { // map each item to { params: { id } }
      return { // return object for path
        params: { // params object required by Next.js
          id: item.id.toString() // ensure id is a string
        } // end params
      }; // end returned object
    }); // end map
} // end getAllPostIds

export function getPostData(id) { // return full post data for given id
    const filePath = path.join(dataStore, 'posts.json'); // path to posts.json
    const jsonString = fs.readFileSync(filePath, 'utf8'); // read file
    const jsonObj = JSON.parse(jsonString); // parse JSON
    const objReturned = jsonObj.filter(obj => { // filter for matching id
       return obj.id.toString() === id; // compare as strings
    }); // end filter
    if (objReturned.length === 0) { // if no post found
        return { // return a not-found placeholder object
            id: id, // echo requested id
            title: "Post Not Found", // placeholder title
            date: "", // empty date
            contentHtml: "<p>Sorry, the post you are looking for does not exist.</p>" // message
        } // end placeholder
    } else { // if found
        return objReturned[0]; // return the first matching post
    }   // end if/else

} // end getPostData