const spreadsheet = "https://sheetdb.io/api/v1/xapcfl7s9o69q";
fetch (spreadsheet)
    .then (response => response.json())
    .then(data => console.log(data.Location))
    .catch(error => console.log(err));