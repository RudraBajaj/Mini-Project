-- Start transaction
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Insert sample data

-- Commit the transaction
COMMIT;

-- Verify the data
SELECT COUNT(*) as total_rows FROM sensor_data;
SELECT * FROM sensor_data ORDER BY crop_type;