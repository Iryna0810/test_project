import axios from 'axios';
import createGalleryCard from './gallery_list.hbs';

   const API_KEY = '2bcb7fdd81c3309c5e646690433e3287';  
   const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
   const STORAGE_KEY_WATCH = 'watched';


     async function fetchVideo () {
        try {
            return await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };

const imagesList = document.querySelector('.gallery');

// console.log(fetchVideo());

fetchVideo()
    .then(({ data }) =>
        imagesList.innerHTML = createGalleryCard(data.results))
    .catch(err => {
            console.log(err);
    });

const filmAddEl = document.querySelector('.gallery');
const savedData = localStorage.getItem(STORAGE_KEY_WATCH);

let watchedListFilm = [];

filmAddEl.addEventListener("click", setWatchedListFilms);

function setWatchedListFilms(event) {
           
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
   
    const searchQueryId = event.target.attributes.id.textContent;
    console.log(searchQueryId);

    fetchFilmByld(searchQueryId)
        .then(({ data }) => {
            try {
        
    
        if (savedData) {
            let filmIdLocalStorag = [];
            const filmData = JSON.parse(savedData);
        
            filmData.forEach(((filmData) => {
                filmIdLocalStorag.push(filmData.id)
                console.log(filmIdLocalStorag);
}
            ))
            for (const id of filmIdLocalStorag) {
                if (data.id === id) {
                    return;
                }
            }
}
            watchedListFilm.push(data);
            localStorage.setItem(STORAGE_KEY_WATCH, JSON.stringify(watchedListFilm));
            } 
            catch (error) {
            console.error("Get state error: ", error.message);
    }   
        })
        .catch(err => {
            console.log(err);
    });
 

    const queueButton = document.querySelector('.btn_queue');
    queueButton.addEventListener('click', createQueueMarkUp);

    function createQueueMarkUp() {
         filmAddEl.innerHTML = "";
        try {
        const filmData = JSON.parse(savedData);
                  
        if (savedData) {
          
            filmData.forEach((filmObject) => {
                imagesList.innerHTML = createGalleryCard(filmObject);
        })

        }
    } catch (error) {
            console.error("Get state error: ", error.message);
    }


    }

    
    // filmAddEl.innerHTML = markupF;
    // console.log(fetchPokemonByld(searchQueryId));


    // const filmEl = document.querySelector(".client_id");
    


    // if () {
    //     return
    // }
    // const savedWatched = localStorage.setItem(STORAGE_KEY_WATCH); 
    // return savedWatched;
}

async function fetchFilmByld(film_Id) {
    try {
        return await axios.get(`https://api.themoviedb.org/3/movie/${film_Id}?api_key=${API_KEY}`);
    }
               catch (error) {
            throw new Error(error.message);
        }
}

// const savedWatched = localStorage.getItem("Watched");

// const parsedWatched = JSON.parse(savedWatched);
// console.log(parsedWatched); 

// const savedSettings = localStorage.getItem("Watched");
