// This file is responsible for the animals.html search
// It will query the /api/animals and fetch appropriate responses
// Automatically features all animals in the API, handles specified searches
// Prints out the card onto the html

const $animalForm = document.querySelector('#animals-form');
const $displayArea = document.querySelector('#display-area');

// The html template for the animals card
const printResults = resultArr => {
  console.log(resultArr);

  // Map through the array and collect specified parameters, pass it onto html template
  const animalHTML = resultArr.map(({ id, name, personalityTraits, species, diet }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Species: ${species.substring(0, 1).toUpperCase() + species.substring(1)}<br/>
      Diet: ${diet.substring(0, 1).toUpperCase() + diet.substring(1)}<br/>
      Personality Traits: ${personalityTraits
        .map(trait => `${trait.substring(0, 1).toUpperCase() + trait.substring(1)}`)
        .join(', ')}</p>
    </div>
  </div>
    `;
  });

  // Add the card onto the displayArea's inner html content
  $displayArea.innerHTML = animalHTML.join('');
};

// Accepts formData (an object) and processes the data contained within it
const getAnimals = (formData = {}) => {
  let queryUrl = '/api/animals?';

  // Collect the formData object's key/value pair and chains it to the end of queryUrl
  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  // Testing to see the queryUrl structure
  console.log(queryUrl);

  // Fetch the specified request
  fetch(queryUrl)
  .then(response => {
    // Handle for any errors
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(animalData => {
    // Prints the html template
    console.log(animalData);
    printResults(animalData.animals);
  })

};

const handleGetAnimalsSubmit = event => {
  event.preventDefault();
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  // Loop through the radio options and search for selected option
  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      // The value of the selected option will be packaged into the animals object
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  // Personality traits can have multiple entries. These will be saved into this array
  const personalityTraitArr = [];
  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;

  // Push the value of the selected traits into the array
  for (let i = 0; i < selectedTraits.length; i += 1) {
    // The selectedTraits' value is pushed into the array
    personalityTraitArr.push(selectedTraits[i].value);
  }

  // Join the words together
  const personalityTraits = personalityTraitArr.join(',');

  // The animal object contains the parameters users can search from
  const animalObject = { diet, personalityTraits };

  // search the api for the animal object (will later invoke the processprint the results)
  getAnimals(animalObject);
};

getAnimals();

$animalForm.addEventListener('submit', handleGetAnimalsSubmit);
