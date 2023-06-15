// Get select elements
const provinceSelect = document.querySelector('#province');
const citySelect = document.querySelector('#city');

// Province change event handler
provinceSelect.addEventListener('change', () => {
  // Enable city select
  citySelect.disabled = false;

  // Clear city options
  citySelect.innerHTML = '<option value="">All</option>';

  // Get selected province
  const selectedProvince = provinceSelect.value;

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
