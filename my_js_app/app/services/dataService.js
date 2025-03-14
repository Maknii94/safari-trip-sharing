// services/dataService.js
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/safari_trips.json');
/**
 * Reads the safari trips from the JSON file.
 * @returns {Array} An array of trip objects.
 */
function loadSafariTrips() {
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading or parsing safari_trips.json:', err);
    return [];
  }
}

/**
 * Writes the provided trips array to the JSON file.
 * @param {Array} trips - The updated array of trip objects.
 */
function saveSafariTrips(trips) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(trips, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to safari_trips.json:', err);
    throw err;
  }
}
module.exports = {
  loadSafariTrips,
  saveSafariTrips,
};