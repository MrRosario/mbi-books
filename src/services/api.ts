import { API_KEY, BASE_URL } from "./apiConfig";

const getBookDetails = (id:string) => 
    fetch(`${BASE_URL}/${id}?key=${API_KEY}`)
        .then((response) => response.json())
        .then((json) => {
        return json;
        })
        .catch((error) => {
        console.error(error);
        });

const searchBook = (searchTerm:string) => 
    fetch(`${BASE_URL}?q=${searchTerm}&key=${API_KEY}`)
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