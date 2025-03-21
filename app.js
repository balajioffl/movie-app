// login validation

document.addEventListener("DOMContentLoaded", function () {
  let loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      let username = document.getElementById("loginUsername").value;
      let email = document.getElementById("loginEmail").value;
      if (username && email) {
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(
          (user) => user.username === username && user.email === email
        );
        if (!user) {
          alert("User not found.");
          window.location.href = "signup.html";
          return;
        }
        window.location.href = "dashboard.html";
      } else {
        alert("Please enter both username and email.");
      }
    });
  }

  //   signin valildation

  let signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let username = document.getElementById("signupUsername").value;
      let name = document.getElementById("signupName").value;
      let email = document.getElementById("signupEmail").value;
      if (username && name && email) {
        localStorage.setItem("username", username);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        let user = {
          username: username,
          name: name,
          email: email,
        };
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "dashboard.html";
      } else {
        alert("Please fill in all fields !");
      }
    });
  }
});

// dashboard page

let dashboard = document.querySelector("#all-movies");

function getMovies(searchTitle='') {
  let movies = new XMLHttpRequest();
  movies.open("GET", `https://mimic-server-api.vercel.app/movies${searchTitle ? `?title=${searchTitle}` : ''}`);

  movies.onload = function () {
    let movieData = JSON.parse(movies.response);
    console.log(movieData);
    
    dashboard.innerHTML = '';
    
    let user = document.createElement("h2");
    user.textContent = "Welcome " + localStorage.getItem("username");
    user.classList.add("user");
    dashboard.appendChild(user);

    movieData.forEach((movie) => {
    
      let movieCard = document.createElement("div");
      movieCard.classList.add("movie-card");

      let title = document.createElement("h3");
      title.textContent = movie.title;
      title.classList.add("movie-title");

      let language = document.createElement("p");
      language.textContent = "Language " + ": " + movie.original_language;
      language.classList.add("movie-language");
      if (movie.original_language === "ta") {
        language.textContent = "Language " + ": " + "Tamil";
      } else {
        language.textContent = "Language " + ": " + "not a tamil movie";
      }

      let image = document.createElement("img");
      image.src = movie.poster_path;
      image.alt = movie.title;
      image.classList.add("movie-image");

      let vote = document.createElement("p", "i");
      vote.className = "fa fa-star";
      vote.style.fontSize = "11px";
      vote.textContent = "Rating " + ": " + movie.vote_average + "/10";
      vote.classList.add("movie-vote");

      let releaseDate = document.createElement("p");
      releaseDate.textContent = "Released Date " + ": " + movie.release_date;
      releaseDate.classList.add("movie-release-date");

      let adult = document.createElement("p");
      if (movie.adult === false) {
        adult.textContent = "Adult " + ": " + "16+";
        adult.style.color = "green";
        adult.style.fontWeight = "bold";
      } else {
        adult.textContent = "Adult " + ": " + "18+";
        adult.style.color = "red";
        adult.style.fontWeight = "bold";
      }
      adult.classList.add("movie-adult");

      let genre_id = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
      };
      movie.genre_ids = movie.genre_ids.map((id) => {
        return genre_id[id];
      });

      let genre = document.createElement("p");
      genre.textContent = "Genre " + ": " + movie.genre_ids;
      genre.classList.add("movie-genre");

      movieCard.appendChild(image);
      movieCard.appendChild(title);
      movieCard.appendChild(language);
      movieCard.appendChild(vote);
      movieCard.appendChild(releaseDate);
      movieCard.appendChild(adult);
      movieCard.appendChild(genre);
      dashboard.appendChild(movieCard);
    });
  };
  movies.send();
}
getMovies();

let logout = document.getElementById("Logout");
logout.addEventListener("click", () => {
  alert("logged out successfully");
  window.location.href = "index.html";
});

let addMovie = document.querySelector("#addMovieButton");
addMovie.addEventListener("click", () => {
  window.location.href = "addmovie.html";
});

// using seach api find the movie

let input = document.getElementById('searchBar');
let search = document.getElementById('searchButton');


search.addEventListener('click',()=>{
  let input = document.getElementById('searchBar').value.trim();
  getMovies(input);
  // console.log(true);
});


