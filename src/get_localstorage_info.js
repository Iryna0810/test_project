import axios from 'axios';
import createGalleryCard from './gallery_list.hbs';

const STORAGE_KEY_WATCH = 'watched';
const STORAGE_KEY_QUEUE = 'queu';
const queueButton = document.querySelector('.btn_queue');
const filmList = document.querySelector('.gallery'); //необхідно проставити відповідні класи в бібліотеці
const watchedButton = document.querySelector('.btn_watched');

console.log(queueButton);
console.log(watchedButton);

watchedButton.addEventListener('click', handleGetWatchedLocalStorage);
queueButton.addEventListener('click', handleGetQueueLocalStorage);

    function handleGetWatchedLocalStorage(event) {
        
        filmList.innerHTML = "";
        const savedData = localStorage.getItem(STORAGE_KEY_WATCH);

        if (savedData) {
        try {
            const filmData = JSON.parse(savedData);
            console.log(filmData);

            const markup = filmData.map((data) => 
            createGalleryCard(data)).join('');
            filmList.innerHTML = markup;
            // console.log(createQueueMarkUp(filmData));
        }
        catch (error) {
            console.error("Get state error: ", error.message);
    }
        }   
};

function handleGetQueueLocalStorage(event) {
     filmList.innerHTML = "";
        const savedData = localStorage.getItem(STORAGE_KEY_QUEUE);

        if (savedData) {
        try {
            const filmData = JSON.parse(savedData);
            console.log(filmData);

            const markup = filmData.map((data) => 
            createGalleryCard(data)).join('');
            filmList.innerHTML = markup;
            // console.log(createQueueMarkUp(filmData));
        }
        catch (error) {
            console.error("Get state error: ", error.message);
    }
        }   
}


