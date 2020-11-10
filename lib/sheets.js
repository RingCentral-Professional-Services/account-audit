const XLSX = require('xlsx')

/**
 * Takes in the path to an excel sheet then returns a big JSON array of all the data in it.
 * Only pays attention to what's on the first sheet in the file. 
 * 
 * @param {string} filePath 
 */
async function parseExcelSheet(filePath) {

    /**
     * Workbook object loaded from actual data file
     */
    let workbook = XLSX.readFile(filePath, {
        raw: true
    })
    /**
     * Name of the first sheet in the workbook object
     */
    let sheetName = workbook.SheetNames[0]

    // console.log(Object.values(workbook.Sheets[sheetName]))
    // process.exit()

    /**
     * Data from the first sheet in the workbook object
     */
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
}

/**
 * This will take an array of JSON data and write it to a .xslx sheet for you. 
 * You need to supply the array, and the full path with name of the file, like './documents/example.xlsx'
 * 
 * @param {array} data Array of JSON data you want written to file
 * @param {string} fileName name and path where the file will be written
 */
async function writeExcelSheet(data, fileName) {
    let workBook = XLSX.utils.book_new()

    let sheetData = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(workBook, sheetData)

    XLSX.writeFile(workBook, fileName, {
        bookType: 'xlsx'
    })
}

module.exports = { parseExcelSheet, writeExcelSheet }