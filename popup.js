document.getElementById('fetchDetails')
.addEventListener('click', () => {
    const product = document.getElementById('product').value;
  
    if (product) {
      // Call the USDA API
      fetchNutritionData(product);
    }
  });
  
  async function fetchNutritionData(product) {
    const apiKey = 'FiihDn5NYyYkvwNyGt2nxQVrhQw3kiZ1y12omxMo';
    const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(product)}&api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayNutritionInfo(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('output').innerText = 'Failed to fetch product data';
    }
  }
  
  function displayNutritionInfo(data) {
    const productInfo = data.foods[0]; // Assuming we want the first result
    if (!productInfo) {
      document.getElementById('output').innerText = 'Product not found';
      return;
    }
  
    const { description, foodNutrients } = productInfo;
  
    let html = `<strong>${description}</strong><ul>`;
    foodNutrients.forEach(nutrient => {
      html += `<li>${nutrient.nutrientName}: ${nutrient.value} ${nutrient.unitName}</li>`;
    });
    html += '</ul>';
  
    document.getElementById('output').innerHTML = html;
  }
  