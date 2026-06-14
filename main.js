const form = document.getElementById("searchForm");
const placeName = document.getElementById("placeName");
const results = document.getElementById("results");
const dateFilter = document.getElementById("dateFilter");

form.addEventListener("submit", searchPlaces);

async function searchPlaces(event) {
    event.preventDefault();

    const searchText = placeName.value;

    const response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${searchText}`);

    const data = await response.json();

    const placeId = data.results[0].id;

    getObservation(placeId);
}

async function getObservation(placeId) {
    const url = `https://api.inaturalist.org/v1/observations?place_id=${placeId}`;

    const response = await fetch(url);

    const data = await response.json();

    displayResults(data.results);
}

function displayResults(observation) {
    results.innerHTML = "";

    for (let i = 0; i < observation.length; i++) {

        const observations = observation[i];

        if (observations.taxon != null) {
            
            if (observations.taxon.default_photo != null) {

                const card = document.createElement("div");

                const image = document.createElement("img");
                image.src = observations.taxon.default_photo.medium_url;

                const name = document.createElement("h3");
                name.textContent = observations.taxon.name;

                card.appendChild(image);

                card.appendChild(name);

                results.appendChild(card);
            }
        }
    }
}
