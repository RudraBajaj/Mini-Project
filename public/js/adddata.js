document.getElementById('analyze-btn').addEventListener('click', async () => {
  const loading = document.getElementById('loading');
  const dataTable = document.getElementById('data-table');
  const tableBody = dataTable.querySelector('tbody');

  // Show loading indicator
  loading.style.display = 'block';
  dataTable.style.display = 'none';

  try {
    console.log('Fetching data from server...');
    const response = await fetch('/data');
    if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received data:', data);

    // Clear previous data
    tableBody.innerHTML = '';

    // Insert new data
    data.forEach(row => {
      console.log('Processing row:', row);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.CROP_TYPE || 'N/A'}</td>
        <td>${row.TEMPERATURE || 'N/A'}</td>
        <td>${row.SOIL_MOISTURE || 'N/A'}</td>
        <td>${row.IRRIGATION_NEEDED || 'N/A'}</td>
      `;
      tableBody.appendChild(tr);
    });

    // Hide loading indicator and show table
    loading.style.display = 'none';
    dataTable.style.display = 'table';
  } catch (err) {
    console.error('Error:', err);
    alert('Failed to fetch data. Please try again.');
    loading.style.display = 'none';
  }
});