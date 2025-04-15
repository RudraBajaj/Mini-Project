// Crop requirements data (optimal conditions)
const cropRequirements = {
    wheat: {
        optimalTemp: 25,
        optimalMoisture: 60,
        tempTolerance: 3,  // ±3°C tolerance
        moistureTolerance: 5  // ±5% tolerance
    },
    rice: {
        optimalTemp: 30,
        optimalMoisture: 80,
        tempTolerance: 2,
        moistureTolerance: 5
    },
    sugarcane: {
        optimalTemp: 28,
        optimalMoisture: 75,
        tempTolerance: 3,
        moistureTolerance: 5
    },
    maize: {
        optimalTemp: 27,
        optimalMoisture: 65,
        tempTolerance: 3,
        moistureTolerance: 5
    },
    mustard: {
        optimalTemp: 22,
        optimalMoisture: 55,
        tempTolerance: 2,
        moistureTolerance: 5
    },
    cotton: {
        optimalTemp: 32,
        optimalMoisture: 70,
        tempTolerance: 3,
        moistureTolerance: 5
    },
    potato: {
        optimalTemp: 20,
        optimalMoisture: 60,
        tempTolerance: 2,
        moistureTolerance: 5
    },
    barley: {
        optimalTemp: 24,
        optimalMoisture: 55,
        tempTolerance: 2,
        moistureTolerance: 5
    },
    chickpea: {
        optimalTemp: 25,
        optimalMoisture: 50,
        tempTolerance: 2,
        moistureTolerance: 5
    },
    soybean: {
        optimalTemp: 28,
        optimalMoisture: 65,
        tempTolerance: 3,
        moistureTolerance: 5
    }
};

// Helper function to determine if a value is within optimal range
function isWithinRange(value, optimal, tolerance) {
    return value >= (optimal - tolerance) && value <= (optimal + tolerance);
}

// Helper function to get status class based on value comparison
function getStatusClass(value, optimal, tolerance) {
    if (isWithinRange(value, optimal, tolerance)) {
        return 'optimal';
    } else if (value < optimal - tolerance) {
        return 'below-optimal';
    } else {
        return 'above-optimal';
    }
}

document.getElementById('analyze-btn').addEventListener('click', async () => {
    const loading = document.getElementById('loading');
    const dataTable = document.getElementById('data-table');
    const tableBody = dataTable.querySelector('tbody');
    const cropSelect = document.getElementById('crop-select');
    const selectedCrop = cropSelect.value;

    if (!selectedCrop) {
        alert('Please select a crop type');
        return;
    }

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

        // Get current sensor data for the selected crop
        const cropData = data.find(item => item.CROP_TYPE.toLowerCase() === selectedCrop);
        
        if (!cropData) {
            throw new Error('No data available for the selected crop');
        }

        // Get optimal requirements for the selected crop
        const requirements = cropRequirements[selectedCrop];

        // Calculate status for temperature and moisture
        const tempStatus = getStatusClass(cropData.TEMPERATURE, requirements.optimalTemp, requirements.tempTolerance);
        const moistureStatus = getStatusClass(cropData.SOIL_MOISTURE, requirements.optimalMoisture, requirements.moistureTolerance);

        // Calculate if irrigation is needed
        const needsIrrigation = cropData.SOIL_MOISTURE < (requirements.optimalMoisture - requirements.moistureTolerance);

        // Insert new data with status indicators
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</td>
            <td>${requirements.optimalTemp}°C</td>
            <td>${requirements.optimalMoisture}%</td>
            <td class="${tempStatus}">${cropData.TEMPERATURE || 'N/A'}°C</td>
            <td class="${moistureStatus}">${cropData.SOIL_MOISTURE || 'N/A'}%</td>
            <td class="${needsIrrigation ? 'needs-irrigation' : 'no-irrigation'}">${needsIrrigation ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(tr);

        // Hide loading indicator and show table
        loading.style.display = 'none';
        dataTable.style.display = 'table';
    } catch (err) {
        console.error('Error:', err);
        alert('Not available in dataset');
        loading.style.display = 'none';
    }
});