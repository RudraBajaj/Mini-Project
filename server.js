require('dotenv').config();
const express = require('express');
const oracledb = require('oracledb');
const app = express();
const port = 3000;



// Middleware to parse JSON bodies
app.use(express.json());


// Oracle database connection details
const dbConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING
};

// Route to fetch data from the database
app.get('/data', async (req, res) => {
    let connection;
    try {
        // Step 1: Connect to the Oracle database using the configuration
        connection = await oracledb.getConnection(dbConfig);
        
        // Step 2: Run a SQL query to get sensor data
        const result = await connection.execute(
            // This query gets 4 pieces of information for each crop:
            // - What type of crop it is
            // - Current temperature
            // - How moist the soil is
            // - Whether irrigation is needed
            'SELECT crop_type, temperature, soil_moisture, irrigation_needed FROM sensor_data',
            [], // We don't need any parameters for this simple query
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // Get results as easy-to-use objects
        );
        
        // Step 3: Send the data back to the user
        res.json(result.rows);
    } catch (err) {
        // If anything goes wrong, log the error and tell the user
        console.error(err);
        res.status(500).send('Error fetching data');
    } finally {
        // Step 4: Always make sure to close the database connection
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
});

// Serve static files from the "public" directory
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});