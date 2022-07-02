const fs = require('fs');
const csvToJson = require('convert-csv-to-json');
const irisData = "./data/iris.csv"
const banknoteData = "./data/banknote_authentication.csv"

export function getIris() {
    try {
        let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(irisData);
        let result: number[][] = []

        json.forEach(element => {
            let species: number = 0
            if (element.species === "Iris-setosa") {
                species = 0
            } else if (element.species === "Iris-versicolor") {
                species = 1
            } else {
                species = 2
            }
            result.push([
                parseFloat(element.sepal_length),
                parseFloat(element.sepal_width),
                parseFloat(element.petal_length),
                parseFloat(element.petal_width),
                species
            ]);
        });
        return result

      } catch (error) {
          throw error;
      }
}

export function getBanknotes() {
    try {
        let json = csvToJson.fieldDelimiter(",").getJsonFromCsv(banknoteData);
        let result: number[][] = []
        //console.log(json)
        
        json.forEach(element => {
            result.push([
                parseFloat(element.varianceofWaveletTransformedimage),
                parseFloat(element.skewnessofWaveletTransformedimage),
                parseFloat(element.curtosisofWaveletTransformedimage),
                parseFloat(element.entropyofimage),
                parseFloat(element.class)
            ]);
        });
        return result

      } catch (error) {
          throw error;
      }
}