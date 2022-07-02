import { prettyPrintBanknoteMatrix, prettyPrintIrisMatrix } from "./algorithms/prettyprint";
import { getBanknotes, getIris } from "./algorithms/setup";
import { NaiveBayes } from "./models/NaiveBayes";

let testIris = [6.5,3.0,5.8,2.2]
let testSetosa = [5.1,3.5,1.4,0.2]
let testVersicolor = [5.0,2.0,3.5,1.0]
let testVirginica = [5.8,2.8,5.1,2.4]


let data = getIris()
let irisLabels = [0, 1, 2]
let bayes1 = new NaiveBayes()
bayes1.fit(data, irisLabels)
let result = bayes1.predict(data)
prettyPrintIrisMatrix(result)
bayes1.getAccuracy_score()

console.log("")

let data2 = getBanknotes()
let bankLabels = [0, 1]
let bayes2 = new NaiveBayes()
bayes2.fit(data2, bankLabels)
let result2 = bayes2.predict(data2)
result2[0].pop()
result2[1].pop()
prettyPrintBanknoteMatrix(result2)
bayes2.getAccuracy_score()
