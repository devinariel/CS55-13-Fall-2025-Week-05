import fs from 'fs';
import path from 'path';

const dataStore = path.join(process.cwd(), 'data');

export function getSortedPostsData() {
  const filePath = path.join(dataStore, 'posts.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj = JSON.parse(jsonString);
  jsonObj.sort(function(a, b) {
    return b.date.localeCompare(a.date);
  });
  return jsonObj.map(item => {
    return {
      id: item.id,
      title: item.title,
      date: item.date
    };
  })


}

export function getAllPostIds() {
    const filePath = path.join(dataStore, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    return jsonObj.map(item => {
      return {
        params: {
          id: item.id.toString()
        }
      };
    });
}

export function getPostData(id) {
    const filePath = path.join(dataStore, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    const jsonObj = JSON.parse(jsonString);
    const objReturned = jsonObj.filter(obj => {
       return obj.id.toString() === id;
    });
    if (objReturned.length === 0) {
        return {
            id: id,
            title: "Post Not Found",
            date: "",
            contentHtml: "<p>Sorry, the post you are looking for does not exist.</p>"
        }
    } else {
        return objReturned[0];
    }   

}