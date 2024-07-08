const $displayArea = document.querySelector('#display-area');
const $zookeeperForm = document.querySelector('#zookeeper-form');

// The html template for the zookeeper card
const printResults = resultArr => {
  console.log(resultArr);

  // Map through the array and collect specified parameters, pass it onto html template
  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  // Add the card onto the displayArea's inner html content
  $displayArea.innerHTML = animalHTML.join('');
};

const handleGetZookeepersSubmit = event => {
  event.preventDefault(); 

  // Collect the value of the name input and store it
  const nameHTML = $zookeeperForm.querySelector('[name="name"]');
  const name = nameHTML.value;

  // Collect the value of the age input and store it
  const ageHTML = $zookeeperForm.querySelector('[name="age"]');
  const age = ageHTML.value;

  // Pass both saved inputs into new object
  const zookeeperObj = { name, age };
  
  // Sends results to getZookeepers
  getZookeepers(zookeeperObj);
};

// Accepts formData (an object) and processes the data contained within it
const getZookeepers = (formData = {}) => {
  // Forms the api query url
  let queryUrl = '/api/zookeepers?';
 
  // Collect the formData object's key/value pair and chains it to the end of queryUrl
  Object.entries(formData).forEach(([key, value]) => {
    queryUrl += `${key}=${value}&`;
  });

  // Fetch the specified request
  fetch(queryUrl)
    .then(response => {
      // Handle for any errors
      if (!response.ok) {
        return alert(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(zookeeperArr => {
      // Prints the html template
      console.log(zookeeperArr);
      printResults(zookeeperArr);
    });
};

getZookeepers();

$zookeeperForm.addEventListener('submit', handleGetZookeepersSubmit);