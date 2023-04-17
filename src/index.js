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


let filmLocalStorag = [];
let filmData = [];

filmAddEl.addEventListener("click", setWatchedListFilms);

function setWatchedListFilms(event) {
           
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
   
    const searchQueryId = event.target.attributes.id.textContent;
    console.log(searchQueryId);

    fetchFilmByld(searchQueryId)
        .then(({ data }) => {
            console.log(data);
            try {
                
                const savedData = localStorage.getItem(STORAGE_KEY_WATCH);
                
                // console.log(savedData);
                filmData.push(data);
                console.log(filmData);
                // filmLocalStorag.push(data);
                localStorage.setItem(STORAGE_KEY_WATCH, JSON.stringify(filmData));

                    // filmData.push(JSON.parse(savedData))
      
                                       
                    // let filmIdLocalStorag = [];

                    // filmData.forEach(((filmEl) => {
                    //     console.log(filmEl)
                    //     filmIdLocalStorag.push(filmEl.id);
                    //     }));
                    // console.log(filmIdLocalStorag);
                    
                    // for (const id of filmIdLocalStorag) {
                    //     if (data.id === id) {
                    //         return;
                    //     }
                    // }             
           }               
            catch (error) {
                console.error("Get state error: ", error.message);
            }

        })
        .catch((error) => {
            console.error("Set state error: ", error.message);
        });
        
function save (key, value) {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

 function load (key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

    const queueButton = document.querySelector('.btn_queue');
    queueButton.addEventListener('click', createQueueMarkUp);
    console.log(queueButton);

    function createQueueMarkUp() {
         filmAddEl.innerHTML = "";
        try {
        const savedData = localStorage.getItem(STORAGE_KEY_WATCH);
        const filmData = JSON.parse(savedData);
            console.log(filmData);
        if (filmData) {
          
        //     filmData.forEach((filmObject) => {
                
        //         filmAddEl.innerHTML = createGalleryCard(filmObject);
        // })

            const markup = filmData.map((data) => 
             {createGalleryCard(data);}   
            ).join('');
            filmAddEl.innerHTML = markup;

            }
        }
     catch (error) {
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
