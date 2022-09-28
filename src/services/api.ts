import {BASE_URL, API_KEY} from '@env'

const getBookDetails = (id:string) => 
  fetch(`${BASE_URL}/${id}?key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

const searchBook = (searchTerm:String, page: Number) => 
  fetch(`${BASE_URL}?q=${searchTerm}&startIndex=${page}&maxResults=10&key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
      console.error(error);
    });

const featuredBooks = () => 
  fetch(`${BASE_URL}?q=emprendedorismo&orderBy=newest&maxResults=10&key=${API_KEY}`)
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch((error) => {
    console.error(error);
  });

export {
    getBookDetails,
    searchBook,
    featuredBooks
}