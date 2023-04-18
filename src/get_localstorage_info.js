import axios from 'axios';
import { renderMarkup } from './render_markup';

// import './js/render-markup.js';
const STORAGE_KEY_WATCH = 'watched';
const STORAGE_KEY_QUEUE = 'queu';
const queueButton = document.querySelector('.js_queue');
const watchedButton = document.querySelector('.js_watched');
const galleryFilms = document.querySelector('.galleryFilms-js');
const nomoviesimages = document.querySelector('.start');

console.log(nomoviesimages);

console.log(galleryFilms);
console.log(queueButton);
console.log(watchedButton);

class ApiMovieSearch {
  #BASE_URL = 'https://api.themoviedb.org/3/';
  #API_KEY = '2bcb7fdd81c3309c5e646690433e3287';
 
  constructor() {
    this.page = 1;
  }

  async fetchMovies(film_Id) {
    try {
        return await axios.get(`https://api.themoviedb.org/3/movie/${film_Id}?api_key=${this.#API_KEY}`);
        
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const apiInfoMovies = new ApiMovieSearch();

function handleGetWatchedFilms() {
        galleryFilms.innerHTML = "";
        const savedData = localStorage.getItem('watched_id');
         
    nomoviesimages.classList.add('is-hidden');
    
        if (queueButton.classList.contains('is-active')) {
        queueButton.classList.remove('is-active');
        }
        watchedButton.classList.add('is-active');
    
    let films = {
        results: [],
    };
    
        if (savedData) {
        try {
            const filmData = JSON.parse(savedData);
            console.log(filmData);
            filmData.map((id) => {
                apiInfoMovies
                    .fetchMovies(id)
                    .then(({ data }) => {
                        console.log(data);
                        data.genre_ids = data.genres;
                        films.results.push(data);
                        console.log(films);
                    
                        renderMarkup(films); 
                    
                        })                                 
                    .catch(err => {
                        console.log(err)
                    })
            })
            }
        catch (error) {
            console.error("Get state error: ", error.message);
            }
        }        
};


function handleGetQueueFilms() {
        galleryFilms.innerHTML = "";
        const savedData = localStorage.getItem(STORAGE_KEY_QUEUE);
    
    if (watchedButton.classList.contains('is-active')) {
        watchedButton.classList.remove('is-active');
    }
    queueButton.classList.add('is-active');
     
        let films = {
        results: [],
    };

    if (savedData) {
        try {
            const filmData = JSON.parse(savedData);
            console.log(filmData);
            
            filmData.map((id) => {
                apiInfoMovies
                    .fetchMovies(id)
                    .then(({ data }) => {
                        console.log(data);
                        data.genre_ids = data.genres;
                        films.results.push(data);
                        console.log(films);
                    
                        renderMarkup(films);
                    
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
        catch (error) {
            console.error("Get state error: ", error.message);
    }
        }   
};

window.addEventListener('load', handleGetWatchedFilms);
watchedButton.addEventListener('click', handleGetWatchedFilms);
queueButton.addEventListener('click', handleGetQueueFilms);

