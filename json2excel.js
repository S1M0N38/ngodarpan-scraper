const fs = require('fs');

const Excel = require('exceljs/modern.nodejs');

const options = {
  filename: './data.xlsx',
  useStyles: true,
  useSharedStrings: true
};

const data = JSON.parse(fs.readFileSync('data.json'));
const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

for (const [key, values] of Object.entries(data)) {
  const sheet = workbook.addWorksheet(key);
  for (const value of values) sheet.addRow(value);
  sheet.commit();
}

workbook.commit();
