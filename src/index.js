import axios from 'axios';
import createGalleryCard from './gallery_list.hbs';

   const API_KEY = '2bcb7fdd81c3309c5e646690433e3287';  
   const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

     async function fetchVideo () {
        try {
            return await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };

const imagesList = document.querySelector('.gallery');

console.log(fetchVideo());

fetchVideo()
    .then(({ data }) =>
        imagesList.innerHTML = createGalleryCard(data.results))
    .catch(err => {
            console.log(err);
    });

const wathedFilmAdd = document.querySelectorAll('button');
const queueFilmAdd = document.querySelector('#Queue');
let watchedListFilm = [];

wathedFilmAdd.addEventListener('click', getWatchedListFilms);

function getWatchedListFilms(event) {
    console.log(event);
    const savedWatched = localStorage.setItem("watched", JSON.stringify()); 
    return savedWatched;
}

// const savedWatched = localStorage.getItem("Watched");

// const parsedWatched = JSON.parse(savedWatched);
// console.log(parsedWatched); 

// const savedSettings = localStorage.getItem("Watched");
