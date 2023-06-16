// Get select elements
const provinceSelect = document.querySelector('#province');
const citySelect = document.querySelector('#city');
const patioSelect = document.querySelector('#patio');
const searchButton = document.querySelector('#searchBtn');
const resultsContainer = document.querySelector('#results');

let selectedProvince = '';
let selectedCity = '';
let selectedPatio = '';

// Province change event handler
provinceSelect.addEventListener('change', () => {
  // Enable city select
  citySelect.disabled = false;

  // Clear city options
  citySelect.innerHTML = '<option value="">All</option>';

  // Get selected province
  const selectedProvince = provinceSelect.value;
  selectedCity = '';

  // Populate city options based on the selected province
  if (selectedProvince === 'Alberta') {
    addCityOption('Calgary');
    addCityOption('Edmonton');
    // Add more large city options for Alberta
  } else if (selectedProvince === 'British Columbia') {
    addCityOption('Vancouver');
    // Add more large city options for British Columbia
  } else if (selectedProvince === 'Manitoba') {
    addCityOption('Winnipeg');
    // Add more large city options for Manitoba
  } else if (selectedProvince === 'New Brunswick') {
    addCityOption('Moncton');
    addCityOption('Saint John');
    // Add more large city options for New Brunswick
  } else if (selectedProvince === 'Newfoundland and Labrador') {
    addCityOption('St. John\'s');
    // Add more large city options for Newfoundland and Labrador
  } else if (selectedProvince === 'Nova Scotia') {
    addCityOption('Halifax');
    // Add more large city options for Nova Scotia
  } else if (selectedProvince === 'Ontario') {
    addCityOption('Toronto');
    addCityOption('Ottawa');
    // Add more large city options for Ontario
  } else if (selectedProvince === 'Prince Edward Island') {
    addCityOption('Charlottetown');
    // Add more large city options for Prince Edward Island
  } else if (selectedProvince === 'Quebec') {
    addCityOption('Montreal');
    addCityOption('Quebec City');
    // Add more large city options for Quebec
  } else if (selectedProvince === 'Saskatchewan') {
    addCityOption('Saskatoon');
    addCityOption('Regina');
    // Add more large city options for Saskatchewan
  } else if (selectedProvince === 'Yukon') {
    addCityOption('Whitehorse');
    // Add more large city options for Yukon
  }

  // Function to add city option to the select element
  function addCityOption(cityName) {
    const option = document.createElement('option');
    option.value = cityName;
    option.textContent = cityName;
    citySelect.appendChild(option);
  }
});

// City change event handler
citySelect.addEventListener('change', () => {
  selectedCity = citySelect.value;
});

// Patio change event handler
patioSelect.addEventListener('change', () => {
  selectedPatio = patioSelect.value;
});

// Search button click event handler
searchButton.addEventListener('click', () => {
  if (selectedCity && selectedPatio) {
    // Perform a search for bars based on the selected city and patio preference
    searchBars(selectedCity, selectedPatio);
  }
});

// Function to search for bars based on the selected city and patio preference
function searchBars(city, patio) {
  // Filter the bars data based on the selected city and patio preference
  const barsInCity = barsData.filter(bar => bar.city === city && bar.patio === patio);

  // Get the container element where the search results will be displayed
  const resultsContainer = document.querySelector('#results-container');

  // Clear previous search results
  resultsContainer.innerHTML = '';

  // Create HTML elements for each matching bar and append them to the results container
  barsInCity.forEach(bar => {
    const barElement = createBarElement(bar);
    resultsContainer.appendChild(barElement);
  });

  // Update the UI with the search results or take any other required actions
  console.log(`Found ${barsInCity.length} bars in ${city} with patio=${patio}`);
}

// Function to create an HTML element representing a bar
function createBarElement(bar) {
  const barElement = document.createElement('div');
  barElement.classList.add('bar');

  // Create an anchor tag for the bar name with the link to the bar details
  const nameLinkElement = document.createElement('a');
  nameLinkElement.href = bar.website;
  nameLinkElement.textContent = bar.bar_name;

  // Create HTML elements for bar details (description, website, address)
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = bar.description;

  const websiteLinkElement = document.createElement('a');
  websiteLinkElement.href = bar.website;
  websiteLinkElement.textContent = 'Visit Website';

  const addressLinkElement = document.createElement('a');
  addressLinkElement.href = bar.address;
  addressLinkElement.textContent = 'View Address';

  // Append the bar details elements to the bar element
  barElement.appendChild(nameLinkElement);
  barElement.appendChild(descriptionElement);
  barElement.appendChild(websiteLinkElement);
  barElement.appendChild(addressLinkElement);

  return barElement;
}