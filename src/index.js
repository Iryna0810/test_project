import axios from 'axios';
import createGalleryCard from './gallery_list.hbs';
import { renderMarkup } from './render_markup';
// import './get_localstorage_info';

   const API_KEY = '2bcb7fdd81c3309c5e646690433e3287';  
   const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';
   const STORAGE_KEY_WATCH = 'watched';
   const imagesList = document.querySelector('.galleryfilms-js');
   

// localStorage.setItem('watched_id', JSON.stringify(searchIdArray));

     async function fetchVideo () {
        try {
            return await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };

console.log(fetchVideo());


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
let searchIdArray = [];

filmAddEl.addEventListener("click", setWatchedListFilms);

function setWatchedListFilms(event) {
           
    if (event.target.nodeName !== "BUTTON") {
        return;
    }
    
    
    const searchQueryId = event.target.attributes.id.textContent;
    
    console.log(searchQueryId); 
    searchIdArray.push(searchQueryId);
    console.log(searchIdArray);
    // watched = load('watched') ? load('watched') : [];
    if (searchIdArray !== [] || searchIdArray !== null) {
        localStorage.setItem('watched_id', JSON.stringify(searchIdArray))
    } 
    

    fetchFilmByld(searchQueryId)
        .then(({ data }) => {
            console.log(data);
            try {
                const savedData = localStorage.getItem(STORAGE_KEY_WATCH);
                
                // console.log(savedData);
                filmData.push(data);
                console.log(filmData);
                localStorage.setItem(STORAGE_KEY_WATCH, JSON.stringify(filmData));


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
}
        
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

//     const queueButton = document.querySelector('.btn_queue');
 

//     queueButton.addEventListener('click', handleGetInfoLocalStorage);
//     console.log(queueButton);
//     const filmList = document.querySelector('.gallery');   

//     function handleGetInfoLocalStorage(event) {
        
//         filmList.innerHTML = "";
//         const savedData = localStorage.getItem(STORAGE_KEY_WATCH);

//         if (savedData) {
//         try {
//             const filmData = JSON.parse(savedData);
//             console.log(filmData);

//             const markup = filmData.map((data) => 
//                 makeGalleryCard(data)).join('');
            
//             filmList.innerHTML = markup;
//             // console.log(createQueueMarkUp(filmData));
//         }
//         catch (error) {
//             console.error("Get state error: ", error.message);
//     }
//         }   
//         }

// const makeGalleryCard = ({ backdrop_path, original_title, popularity, overview, id }) => {
// return `<a class="photo-card gallery__item" 
//   href="${backdrop_path}">
//   <img class="gallery__image" 
//   src="${backdrop_path}"
//   alt="${original_title}" />
// <div class="info">
//        <p class="info-item">
//             <b>Name ${original_title}</b>
//         </p>
//         <p class="info-item">
//             <b>Popularity ${popularity}</b>
//         </p>
//         <p class="info-item">
//             <b>Comments ${overview}</b>
//         </p>
//         <p class="info-item">
//             <b>client_id <span class="client_id">${id}</span></b>
//         </p>
//     </div>
// </a>`;   
// }

    // function createQueueMarkUp(array) {
    //      const markup = array.map((data) => 
    //          createGalleryCard(data)).join('');
    //     console.log(markup);
    //         filmList.innerHTML = markup;
    //         }
        
    //  filmIdArray.map((id) => {
    //                 fetchFilmByld(id)
    //                     .then(({ data }) => {
    //                         console.log(data);
    //                         filmList.insertAdjacentHTML('afterbegin', makeGalleryCard(data))
    //                     }                        )
    //                     .catch((error) => {
    //                         console.error("Get state error: ", error.message);
    //                     }
    //                     )
    //             })


    

    
    // filmAddEl.innerHTML = markupF;
    // console.log(fetchPokemonByld(searchQueryId));


    // const filmEl = document.querySelector(".client_id");
    
//     function makeGalleryCard ({ poster_path, genres, release_date, backdrop_path, original_title, popularity, overview, id }) {

//     return `<a class="photo-card gallery__item">
//    <img class="gallery__image"
//    src="${poster_path}"
//    alt="${original_title}">

// <div class="info">
//        <p class="info-item">
//             <b>${genres}</b>
//         </p>
//         <p class="info-item"> ${release_date}</b>
//         </p>
//         <p class="info-item">
//             <b>client_id <span class="client_id">${id}</span></b>
//         </p>
//     </div>
// </a>`;   
// }

// async function fetchFilmByld(film_Id) {
//     try {
//         return await axios.get(`https://api.themoviedb.org/3/movie/${film_Id}?api_key=${API_KEY}`);
//     }
//                catch (error) {
//             throw new Error(error.message);
//         }
// }


    // if () {
    //     return
    // }
    // const savedWatched = localStorage.setItem(STORAGE_KEY_WATCH); 
    // return savedWatched;


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

