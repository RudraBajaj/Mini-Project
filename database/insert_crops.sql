-- Insert some realistic crop data
INSERT INTO sensor_data (crop_type, temperature, soil_moisture, irrigation_needed)
VALUES ('Potato', 22, 45, 'No');

INSERT INTO sensor_data (crop_type, temperature, soil_moisture, irrigation_needed)
VALUES ('Sugarcane', 30, 50, 'Yes');

INSERT INTO sensor_data (crop_type, temperature, soil_moisture, irrigation_needed)
VALUES ('Cotton', 28, 40, 'No');

-- Commit the changes
COMMIT;

-- Show all data
SELECT * FROM sensor_data ORDER BY crop_type; 