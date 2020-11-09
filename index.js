
fetch("https://api.themoviedb.org/3/discover/movie?api_key=481c967c4a7bbdd6cdf43e6eb5abb239&primary_release_year=2016&language=en")

    .then((res) => res.json())
    .then(function (data) {

        movieResult(data);

    })
    .catch(function (err) {
        document.write(err);
    });

let filteredMovies, selectValue;
let body1 = document.getElementById('bdy');
let movieDetails = document.querySelector('#details');
let title = document.querySelector('#title');
let rating = document.querySelector('#rating');
let searchInput = document.querySelector('#search');
let year = document.querySelector('#year');
let excerpt = document.querySelector('#excerpt');
let imgDiv = document.getElementById('img');
let selectOrder = document.querySelector('#sortPopular');

function movieResult(data) {
    let genres = {
        28: 'action',
        12: 'adventure',
        16: 'animation',
        35: 'comedy',
        80: 'crime',
        99: 'documentary',
        18: 'drama',
        10751: 'family',
        14: 'fantasy',
        36: 'history',
        27: 'horror',
        10402: 'music',
        9648: 'mystery',
        10749: 'romance',
        878: 'scienceFiction',
        53: 'thriller',
        10752: 'war',
        37: 'western'
    }

    filteredMovies = data.results.filter(movie => movie.vote_average);

    selectOrder.addEventListener('change', function (e) {
        selectValue = e.target.value;
        if (selectValue === 'asc') {
            filteredMovies = data.results.sort(function (a, b) {
                return a.vote_average - b.vote_average;
            });
            sortedMovies(filteredMovies);
        } else if (selectValue === 'desc') {
            filteredMovies = data.results.sort(function (a, b) {
                return b.vote_average - a.vote_average;
            });
            sortedMovies(filteredMovies);
        } else {
            return;
        }

    });

    // https://image.tmdb.org/t/p/w500/ld7V9BjMk2xtiBNcR8savyyk5ca.jpg

    function checkGenre(movie) {
        const filtered = movie
            .reduce((obj, key) => ({ ...obj, [key]: genres[key] }), {});
        let res = Object.keys(filtered).map(k => filtered[k]);
        return [...res];
    }

    function movieTitle(movie) {
        return (
            `<div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-6">
                        <div id="imgDiv">
                            <img src=${'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path} alt="img" id="img" class="img-fluid" />
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-8">
                                <div id="title">
                                    <h3>
                                        ${movie.title}
                                    </h3>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div id="rating">
                                    <h4>
                                        ${movie.vote_average} <i class="fa fa-star"></i>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8">
                                <div id="genre">
                                   <i> ${checkGenre(movie.genre_ids)} </i>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div id="year">
                                    <h4>
                                        ${release_date} <i class="fa fa-calendar"></i>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <br/>   
                        <div class="row">
                            <div class="col-lg-12">
                                <div id="excerpt">
                                    ${movie.overview}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
            `
        )
    }

    let movieContent;

    function appendHr(movieDetails, movieContent) {
        movieDetails.innerHTML = movieContent.join('<hr/>');
    }

    function sortedMovies(filteredMovies) {
        searchInput.value = '';
        searchInput.focus();
        movieContent = filteredMovies.map((movie) => {
            release_date = movie.release_date.split('-')[0];
            return movieTitle(movie);
        })

        appendHr(movieDetails, movieContent);
    }

    movieContent = filteredMovies.map((movie) => {
        release_date = movie.release_date.split('-')[0];
        return movieTitle(movie);
    })
    appendHr(movieDetails, movieContent);

    searchInput.addEventListener('keyup', function (e) {
        let searchVal = e.target.value;
        movieContent = filteredMovies.filter(movie => movie.title.toLowerCase().indexOf(searchVal) > -1).map((movie) => {
            return movieTitle(movie);
        });
        appendHr(movieDetails, movieContent);

    })



}







