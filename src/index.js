import axios from 'axios';
import createGalleryCard from '/gallery_list.hbs';

class MoviesDatabase {
    #API_KEY = '2bcb7fdd81c3309c5e646690433e3287';  
    #BASE_URL = 'https://developers.themoviedb.org/3/trending/get-trending';

    query = null;
    page = 1;
    count = 20;

    baseSearchParameters = {
        // per_page: this.count,
        key: this.#API_KEY,
        original_title: 'original_title',
        // orientation: 'horizontal',
        // safesearch:'true',
    };

    async fetchVideo () {

        const searchParameters = new URLSearchParams({
            q: this.query,
            // page: this.page,
            ...this.baseSearchParameters,
        });

        try {
            return await axios.get(`${this.#BASE_URL}/?${searchParameters}`);
        }
        
        catch (error) {
            throw new Error(error.message);
        }
    };
}

const imagesList = document.querySelector('.gallery');

const galleryItems = MoviesDatabase.fetchVideo(data);

const markup = galleryItems.map((data) => createGalleryCard(data)).join("");