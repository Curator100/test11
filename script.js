const API_KEY = 'AIzaSyDC_aqgXAhScsYg85qTTs1fQcUtgn2Z2xQ'; // Your API Key
const SHEET_ID = '1SooENiPHUascCufx52Zw6Zr0iA5OH8_1MBYTw6D0zPo'; // Your Sheet ID
const RANGE = 'test10'; // Your Range

// Load the API client and auth2 library
function loadClient() {
  gapi.client.init({
    'apiKey': API_KEY,
    'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(() => {
    console.log('Client loaded');
  }).catch((error) => {
    console.error('Error loading the API client:', error);
  });
}

gapi.load('client', loadClient);

// Handle form submission
document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;
  const password = document.getElementById('password').value;

  if (name && roll && password) {
    // Prepare data to write to Google Sheets
    const data = [[name, roll, password]]; // Ensure the data is formatted correctly
    const request = gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      resource: {
        values: data,
      },
    });

    request.then((response) => {
      console.log('Data written to Google Sheets', response);
      alert('Data submitted successfully!');
    }).catch((error) => {
      console.error('Error writing to Google Sheets:', error);
      alert('Error submitting data. Please check your inputs and try again.');
      console.error("Error details:", error);  // Log detailed error in console
    });
  } else {
    alert('Please fill in all fields.');
  }
});
