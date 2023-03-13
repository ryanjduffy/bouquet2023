const { createClient } = require("@supabase/supabase-js");

// Initialize a new Supabase client with your Supabase URL and API key
const supabaseUrl = "https://stmbjgygayliaaaqiqrz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0bWJqZ3lnYXlsaWFhYXFpcXJ6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODA4MDMwMiwiZXhwIjoxOTkzNjU2MzAyfQ.nNXqdv0Z5uRSIEZ8mVEyXddieoyAjxrNdKFSMN_z_mU";
const supabase = createClient(supabaseUrl, supabaseKey);

// Define an array of your Supabase table names
const tableNames = ["bouquet2023", "bouquet", "bouquet_emoji_lookup"];

// Loop through each table and download its data
tableNames.forEach(async (tableName) => {
  const { data, error } = await supabase.from(tableName).select("*");
  if (error) {
    console.error(`Error downloading ${tableName}: ${error.message}`);
  } else {
    const table = convertToTable(data);
    const container = document.createElement("div");
    container.innerHTML = `<h2>${tableName}</h2>`;
    container.appendChild(table);
    document.body.appendChild(container);
  }
});

// Helper function to convert an array of objects to an HTML table
function convertToTable(data) {
  const table = document.createElement("table");
  const headers = Object.keys(data[0]);
  const headerRow = table.insertRow();
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  data.forEach((row) => {
    const tableRow = table.insertRow();
    headers.forEach((header) => {
      const cell = tableRow.insertCell();
      cell.textContent = row[header];
    });
  });
  return table;
}
