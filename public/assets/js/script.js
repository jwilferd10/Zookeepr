// This file is responsible for the index.html functionality
// The forms will collect the user's inputs and create objects 
// These objects are then posted to the application/json file

const $animalForm = document.querySelector('#animal-form');
const $zookeeperForm = document.querySelector('#zookeeper-form')

// Adding an animal to api/animals
const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // Collect the user's inputs
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;

  // Select all elements with name="diet" attribute
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  
  let diet; // mutable variable to store selected diet

  // Iterate through dietRadioHTML to find the checked element
  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value; // Assign value to diet
    }
  }

  // Set diet to an empty string if no value is selected
  if (diet === undefined) {
    diet = '';
  }

  // Connects to the personality <select> elment 
  // Multiple options can be selected
  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  
  // Array to hold multiple selected personality traits
  const personalityTraits = [];

  // Loop through each selected traits
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value); // Push trait value to array
  }

  // Create the animal object with collected data
  const animalObject = { name, species, diet, personalityTraits };

  // Post the newly created animal object to api/animals
  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject) 
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    alert('Error; ' + response.statusText);
  })
  .then(postResponse => {
    console.log(postResponse); // Log the successful response
    alert('Thank you for adding an animal'); // Alert user of successful submission
  });
};

// Adding zookeepers to api/zookeeper
const handleZookeeperFormSubmit = event => {
  event.preventDefault();

  // Collect all the user's inputs 
  const name = $zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt($zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = $zookeeperForm.querySelector('[name="favorite-animal"]').value;

  // Create a zookeeper object with collected data
  const zookeeperObj = { name, age, favoriteAnimal }
  
  // View the created zookeeper
  // console.log(zookeeperObj)

  // Post the newly created zookeeper to api/zookeepers
  fetch('/api/zookeepers', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } 
    alert('Error; ' + response.statusText)
  })
  .then(postResponse => {
    console.log(postResponse); // Log the successful response
    alert('Thank you for adding a zookeeper'); // Alert user of successful submission
  });
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
$zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);