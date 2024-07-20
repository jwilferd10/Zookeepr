# Zookeepr

## 📂 Table of Contents 
- [Description](#wave-description)
- [User Story](#open_book-user-story)
- [Resources Used](#floppy_disk-resources-used)
- [Usage](#minidisc-usage)
- [Contributors](#paperclip-contributors)
- [Contact Information](#e-mail-contact-information)

## :wave: Description
### :page_with_curl: Manage and Explore Zoo Data
Zookeepr is a platform designed to showcase various animals and their respective zookeepers at the zoo. The data for both zookeepers and animals are stored in a JSON file. Using Express.js, users can access and interact with the API. The front-end code dynamically generates cards based on the API data, providing an interactive and seamless user experience.

### :heavy_plus_sign: Create and Search Zoo Records
Users can search for specific zookeepers and animals based on set parameters.  This allows for efficient and targeted searches within the zoo's database. Additionally, users can create and add new zookeepers and animals to the local API. This feature ensures that the platform remains up-to-date with the latest information and allows for continuous expansion of the zoo's records.

### :globe_with_meridians: Open
From the start Zookeepr was built to further learning. Because of this, the repository is open and it's my hope that someone views this codebase and finds some use from it.

### 💭 Developer Notes
Originally constructed in 2020, this project was designed to teach the use of Express.js and middleware for seamless interaction between the front and back ends. Since then, Zookeepr has been updated to provide further learning opportunities and more hands-on practice.

The objective of these updates was to replicate a real-life scenario where Zookeepr, initially built with CommonJS, needed to be modernized using ES6 modules. To align with this modernization, the HTML template has also been updated to use semantic elements.

### 🙏 Thank You!
So much for checking out Zookeepr. This project may be familiar to some people, but I've made the effort to go further and call this application my own. Thanks again and happy coding!

## :open_book: User Story
(Coming Soon)

## :floppy_disk: Resources Used
- JavaScript
- HTML
- CSS
- Node.js
  - This command is used to run Jest with ES6 Import support: `node --experimental-vm-modules node_modules/jest/bin/jest.js`
- NPM
- ES6 Modules
- Express (^4.19.2)
- Jest (^29.7.0)
  - Configured to prevent transforming ESM code to CommonJS with: `"transform": {}`

## :minidisc: Usage
### Submitting an Animal
- Enter the animal's name and species
- Select the animal's diet
- Select the personality traits of the animal (multiple choice)
- Submit

### Submitting a Zookeeper
- Enter the zookeepers name
- Input the zookeepers age
- Include zookeepers favorite animal

### Searching for Zookeeper
The website should automatically populate the list with existing zookeepers
- Query by Zookeeper Name
- Query by Zookeeper Age
- Search

### Searching for Zookeeper
The website should automatically populate the list with existing animals
- Query by Animal(s) diet
- Query by Animal(s) Personality Traits (multiple choice)
- Search
  
## :paperclip: Contributors
- GitHub: [jwilferd10](https://github.com/jwilferd10)
  - Email: jwilferd10@yahoo.com
