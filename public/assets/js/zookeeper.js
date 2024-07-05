const $displayArea = document.querySelector('#display-area');


const printResults = resultArr => {
  console.log(resultArr);

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

const getZookeepers = () => {
  fetch('/api/zookeepers')
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(zookeeperArr => {
      console.log(zookeeperArr);
      printResults(zookeeperArr);
    });
};

getZookeepers();
