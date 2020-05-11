const searchTerm = document.querySelector("#searchText");
const form = document.querySelector("#searchForm");
const moviesCon = document.querySelector("#movies");
const moviesDetails = document.querySelector("#movie");

let searchText = "home";
const api_key = "60107917";
let movies;

const fetchMovies = async () => {
  await fetch(`https://www.omdbapi.com/?s=${searchText}&apikey=${api_key}`)
    .then((res) => res.json())
    .then((data) => {
      movies = data.Search;
      let output = "";
      movies.forEach((movie) => {
        output += `
          <div class="col-md-3">
          <div class="well text-center">
          <img src="${movie.Poster}" alt="movies poster"/>
          <h5>${movie.Title}</h5>
          <a onclick="movieSelected('${movie.imdbID}')" href="#" class="btn btn-warning">Movie Details</a>
          </div>
          </div> 
          `;
      });
      moviesCon.innerHTML = output;
    })
    .catch((err) => console.log(err));
};
fetchMovies();

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

const getMovie = async () => {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${api_key}`)
    .then((res) => res.json())
    .then((movie) => {
      let output = `
        <div class="row">
        <div class="col-md-4">
        <img src="${movie.Poster}" alt="movie-poster" class="thumbnail"/>
        </div>
        <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
        <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
        </div>
        </div>
        <div class="row">
        <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr/>
        <a href="https://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-warning">View IMDB</a>
        <a href="index.html" class="btn btn-primary">Go Back To Search</a>
        </div>
        </div>
        `;

      moviesDetails.innerHTML = output;
    })
    .catch((err) => console.log(err));
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchTerm.blur();
  searchText = searchTerm.value;
  fetchMovies();
});
