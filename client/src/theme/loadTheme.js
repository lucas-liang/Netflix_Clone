/*
JS Function to enact relevant css between light and dark mode

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

export function loadTheme(isDarkMode){
    if(!isDarkMode){
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            element.classList.add('light');
        });
        const genres = document.querySelectorAll('.Genre');
        genres.forEach((genre) =>{
        genre.classList.add('invert');
        })
        const categories = document.querySelectorAll('.Category');
        categories.forEach((category) =>{
        category.classList.add('invert');
        })
        const settings = document.querySelector('#SettingsIcon');
        settings.classList.add('invert');
        const favoriteMovie = document.querySelector('#favoriteMovie');
        if(favoriteMovie !== null){
            favoriteMovie.classList.add('invert');   
            }
        const favoriteActor = document.querySelector('#favoriteActor');
        if(favoriteActor !== null){
            favoriteActor.classList.add('invert');   
            }
        const mode = document.querySelector('#ModeIcon');
        mode.classList.add('invert');
        const home = document.querySelector('#HomeIcon');
        home.classList.add('invert');
        const search= document.querySelector('#SearchIcon');
        search.classList.add('invert');
    }
    else{
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            element.classList.remove('light');
        })
            const genres = document.querySelectorAll('.Genre');
            genres.forEach((genre) =>{
            genre.classList.remove('invert');
            })
            const categories = document.querySelectorAll('.Category');
            categories.forEach((category) =>{
            category.classList.remove('invert');
            })
            const settings = document.querySelector('#SettingsIcon');
            settings.classList.remove('invert');
            const mode = document.querySelector('#ModeIcon');
            mode.classList.remove('invert');
            const home = document.querySelector('#HomeIcon');
            home.classList.remove('invert');
            const search= document.querySelector('#SearchIcon');
            search.classList.remove('invert');
            const favoriteMovie = document.querySelector('#favoriteMovie');
            if(favoriteMovie !== null){
            favoriteMovie.classList.remove('invert');   
            }
            const favoriteActor = document.querySelector('#favoriteActor');
            if(favoriteActor !== null){
                favoriteActor.classList.remove('invert');   
                }
    };
    }