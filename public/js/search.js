// Get select elements
const searchButton = document.querySelector('#searchBtn');
const provinceSelect = document.querySelector('#province');
const citySelect = document.querySelector('#city');
const patioSelect = document.querySelector('#patio');

// Global variables to store bar data
let barData;
let selectedProvince;
let selectedCity;
let selectedPatio;

// Search button click event handler
searchButton.addEventListener('click', async () => {
  // Get selected province and city
  selectedProvince = provinceSelect.value;
  selectedCity = citySelect.value;
  selectedPatio = patioSelect.value;
  console.log(selectedPatio);

  // Get all bars from the database
  const response = await fetch('/api/bars', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  barData = await response.json();

  // Filter bars based on the selected province
  const filteredBarsByProvince = barData.filter((bar) => {
    if (selectedProvince === 'All') {
      return true;
    } else {
      return bar.Province.province_name === selectedProvince;
    }
  });

  console.log(filteredBarsByProvince);

  // Filter bars based on the selected city
  const filteredBarsByCity = filteredBarsByProvince.filter((bar) => {
    if (selectedCity === 'All') {
      return true;
    } else {
      return bar.city_name === selectedCity;
    }
  });
  console.log(filteredBarsByCity);

  // Filter bars based on the selected patio
  const filteredBarsByPatio = filteredBarsByCity.filter((bar) => {
    if (selectedPatio === 'All') {
      return true;
    } else if (selectedPatio === 'Yes') {
      return bar.patio === true;
    } else if (selectedPatio === 'No') {
      return bar.patio === false;
    }
  });
  const filteredBars = filteredBarsByPatio;

  // POST filtered bars to the server
  const postResponse = await fetch('/api/bars/search', {
    method: 'POST',
    body: JSON.stringify({ filteredBars }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(!postResponse.ok) {
    console.error(postResponse.statusText);
  } else {
    document.location.replace('/search-results');
  }
});

// Province change event handler
provinceSelect.addEventListener('change', () => {
  // Enable city select
  citySelect.disabled = false;

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
    addCityOption("St. John's");
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
