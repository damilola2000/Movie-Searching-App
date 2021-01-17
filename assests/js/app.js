const API_KEY = 'd7d9d174';
const endpoint = 'https://www.omdbapi.com/?apikey=d7d9d174&';

const searchButton = document.querySelector('#search');
const inputElement = document.querySelector('#inputVal');
const movieSearchable = document.querySelector('#movieSearchable')
const nominate = document.querySelector('#nominations');
const printResults = document.querySelector('#printResults');

printResults.innerHTML = 'Results for';

var nominations = [];

function nominateMovie() {
        if (nominations.length == 5) {
            window.alert('Nominations at full capacity');
        } else {
            nominations.push(this.id);
            const section = nominationTemplate()
            this.disabled = true; 
            if (nominate.hasChildNodes()){
                nominate.removeChild(nominate.lastChild);
            }
            nominate.appendChild(section); 
        }
    }
    
    function removeMovie() {
        console.log(nominations);
        console.log('Name:' + this.name);
        console.log('Index:' + this.id);
        nominations.splice(this.id,1);
        console.log('After:' + nominations);
        const section = nominationTemplate();
        if (nominate.hasChildNodes()){
            nominate.removeChild(nominate.lastChild);
        }
        nominate.appendChild(section); 
        if (document.getElementById(this.name) != null) {
            console.log('In if:' + this.name);
            button = document.getElementById(this.name);
            button.disabled = false; 
        }
    }
    
    function nominationTemplate() {
        const rowSection = document.createElement('div');
        rowSection.classList = 'row';

        index = 0;
        nominations.map((movie) => {
            const colSection = document.createElement('div');
            colSection.classList = 'col';
        
            const cardSection = document.createElement('div');
            cardSection.classList = 'card';
        
            const bodySection = document.createElement('div');
            bodySection.classList = 'card-body';
    
            const cardTitle = document.createElement('h5');
            cardTitle.classList = 'card-title';
            cardTitle.innerHTML = movie; 
            bodySection.appendChild(cardTitle);

            const remove = document.createElement('button');
            remove.innerHTML = 'Remove';
            remove.id = index;
            remove.name = movie;
            remove.classList = 'btn btn-dark active';
            bodySection.appendChild(remove);
            remove.onclick = removeMovie; 

            cardSection.appendChild(bodySection);
            colSection.appendChild(cardSection);
            rowSection.appendChild(colSection);

            index++; 
        })
        return rowSection;
    }
    
    function movieTemplate(movies) {
        const section = document.createElement('section');
        section.classList = 'section'
        movies.map((movie) => {
            const posterContainer = document.createElement('div');
            posterContainer.classList = 'poster';
    
            const header = document.createElement('h2');
            header.innerHTML = movie.Title + ' - ' + movie.Year;
            header.classList = 'poster_title';
            
            const img = document.createElement('img');
            img.src = movie.Poster;
            img['data-movie-id'] = movie.imdbID;
            img.classList = 'poster_img';
            
            const button = document.createElement('button');
            button.type = 'button';
            button.id = movie.Title + ' - ' + movie.Year;
            button.innerHTML = 'Nominate'; 
            button.classList = 'btn btn-dark active';
    
            posterContainer.appendChild(header);
            posterContainer.appendChild(img);
            posterContainer.appendChild(button);
            section.appendChild(posterContainer);
    
            button.onclick = nominateMovie; 
        })
        return section;
    }
    
    function createPosterTemplate(movies) {
        const movieElement = document.createElement('div');
        movieElement.setAttribute('class', 'movie');
    
        const section = movieTemplate(movies);
        movieElement.appendChild(section);
        return movieElement;
    }
    
    searchButton.onclick = function(event) {
        event.preventDefault();
        const title = inputElement.value;
        const url = endpoint + 's=' + title;
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const movies = data.Search;
                const movieBlock = createPosterTemplate(movies);
                if (movieSearchable.hasChildNodes()){
                    movieSearchable.removeChild(movieSearchable.lastChild);
                }
                movieSearchable.appendChild(movieBlock);
                console.log('Data: ', data);
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
        console.log(title);
    }
    
    inputElement.onkeyup = function() {
        printResults.innerHTML = 'Results for ' + inputElement.value;
    }    

