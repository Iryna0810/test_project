import axios from 'axios';
import createGalleryCard from './gallery_list.hbs';

   const API_KEY = '2bcb7fdd81c3309c5e646690433e3287';  
   const BASE_URL = 'https://api.themoviedb.org/3/trending/movie/week';

// class MoviesDatabase {
 
//     media_type = 'movie';
//     time_window = 'week';

        
//     query = null;
//     page = 1;
//     count = 20;

//     baseSearchParameters = {
//         // per_page: this.count,
//         key: this.#API_KEY,

//         // orientation: 'horizontal',
//         // safesearch:'true',
//     };


// };

     async function fetchVideo () {

        // const searchParameters = new URLSearchParams({
        //     // q: this.query,
        //     // page: this.page,
        //     ...this.baseSearchParameters,
        // });

        try {
            return await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };

const imagesList = document.querySelector('.gallery');

console.log(fetchVideo());

const galleryItems = fetchVideo();

// console.log({ data });


const markup = galleryItems.map(({ data }) => createGalleryCard({ data })).join(" ");

imagesList.insertAdjacentHTML('afterbegin', markup);
