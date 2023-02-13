

// créer une fonction search avec mon fetch et l'api key et un argument qui reprend les data-tv
function search(tv) {
    fetch(`https://api.themoviedb.org/3/tv/${tv}?api_key=6631e5f1dc96088e0d26b86da29b5b6a&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(function(result) {
                // faire une variable template avec l'html en string + interpolation
                var template = `
                    <div class="serie">
                        <div class="clickable">
                            <h1>${result.name}</h1>
                            <div class="poster">
                                <img src="https://image.tmdb.org/t/p/w400/${result.poster_path}">
                            </div>
                            <div class="pop">
                                Popularité <span>${result.vote_average}/10</span>
                            </div>
                        </div>
                        <div class="hidden">
                            <div class="poster">
                            <img src="https://image.tmdb.org/t/p/w400/${result.poster_path}">
                            </div>
                            <div class="contenu">
                                <h1>${result.name}</h1>
                                <p>${result.overview}</p>
                                <div><strong>Note moyenne</strong> : ${result.vote_average}/10</div>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                        </div>
                    </div>
                `;
                document.querySelector('main').innerHTML += template;
            })
        })
        .catch(error => {    console.error("Erreur lors de la récupération des données :", error);
    });
}

// capturer les différents boutons et leur data attributes

var buttons = document.querySelectorAll('button');

// itérer à travers les boutons pour leur mettre un click listener
buttons.forEach(function (button) {
    button.addEventListener("click", function() {
        // je vide le main
        document.querySelector('main').innerHTML = "";
        // j'invoque la fonction search
        search(button.dataset.tv);
    })
})

document.querySelector('main').addEventListener("mouseenter", function() {
    // faire un nodelist des films
    var series = document.querySelectorAll('.serie');
    // itérer à travers la liste
    series.forEach(function(serie) {
        // pour ajouter un évènement clic à chaque film
        var hidden = serie.querySelector(".hidden");
        var xMark = serie.querySelector("i");
        serie.querySelector('.clickable').addEventListener("click", function() {
            // qui permet de changer le display de hidden
            hidden.style.display = "flex"
        })
        xMark.addEventListener("click", function() {
            hidden.style.display = "none";
        })
    })
})

