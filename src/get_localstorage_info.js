import axios from 'axios';
import { renderMarkup } from './render_markup';

// import './js/render-markup.js';
const STORAGE_KEY_WATCH = 'watched_id';
const STORAGE_KEY_QUEUE = 'queue';
const queueButton = document.querySelector('.js_queue');
const watchedButton = document.querySelector('.js_watched');
const galleryFilms = document.querySelector('.gallery');
const nomoviesimages = document.querySelector('.img');

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
    
    const savedData = localStorage.getItem(STORAGE_KEY_WATCH);
    
    const filmData = JSON.parse(savedData);

    if (filmData.length === 0) {
        nomoviesimages.classList.remove('is-hidden');
    }
       
    
        if (queueButton.classList.contains('is-active')) {
        queueButton.classList.remove('is-active');
        }
        watchedButton.classList.add('is-active');
        watchedButton.classList.add('btn-active');
       queueButton.classList.remove('btn-active');
    
    let datagenre_ids = [];
    
    let films = {
        results: [],
    };
    
    if (filmData) {
            try {
            
            // console.log(filmData);
            filmData.map((id) => {
                apiInfoMovies
                    .fetchMovies(id)
                    .then(({ data }) => {
                        // console.log(data);
                        nomoviesimages.classList.add('is-hidden');
                        // data.genre_ids = data.genres;
                        datagenre_ids = data.genres.map(genre => genre.id);
                        data.genre_ids = datagenre_ids;
                        console.log(datagenre_ids)

                        films.results.push(data);
                        // console.log(films);
                    
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

