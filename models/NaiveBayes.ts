export class NaiveBayes {

    models = []
    mean = []
    std = []
    variance = []
    count = []
    y = []

    resArray = [0, 0, 0]

    accuracy_score = 0


    fit(x: number[][], y: number[]) { // void
        let oldX = JSON.parse(JSON.stringify(x))
        let results = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        this.y = y

        y.forEach(species => {
            this.mean.push([0, 0, 0, 0])
            this.std.push(0)
            this.variance.push([0, 0, 0, 0])
            this.count.push(0)
            
        });

        for (let index = 0; index < x.length; index++) {
            const element = x[index];
            let categoryIndex = element[4]
            this.count[categoryIndex]++
            results[categoryIndex][0] += element[0]
            results[categoryIndex][1] += element[1]
            results[categoryIndex][2] += element[2]
            results[categoryIndex][3] += element[3]
        }

        this.mean = this.average(results, this.count)
        this.variance = this.varianceCalc(oldX, this.mean)
        this.std = this.stDeviation(this.variance, this.count)
        //console.log("Finished modelling")
    }

    predict(x: number[][]) {
        let resArray = [0, 0, 0]

        let matrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        x.forEach(element => {
            let res: number = this.testOne(element)
            matrix[element[4]][res]++
            if (res === element[4]) {
                resArray[res]++
            }
        });

        this.resArray = resArray

        return matrix
    }

    getAccuracy_score() { // , y: number[]
        let totalCount = 0

        this.count.forEach(element => {
            totalCount += element
        });

        let totalCorrect = 0
        this.resArray.forEach(element => {
            totalCorrect += element
        });

        let percentage = (100 / totalCount) * totalCorrect
        let percentageRounded = percentage.toFixed(3)

        console.log(totalCorrect + "/" + totalCount + " - " + percentageRounded + "% correct")
    }

    testOne(x: number[]) {
        let pArray: number[] = []
        var pArraySum: number = 0
        let result: number[] =  []

        for (let index = 0; index < this.y.length; index++) {
            // foreach species
            let res1 = this.pdf(x[0], this.mean[index][0], this.std[index][0])
            let res2 = this.pdf(x[1], this.mean[index][1], this.std[index][1])
            let res3 = this.pdf(x[2], this.mean[index][2], this.std[index][2])
            let res4 = this.pdf(x[3], this.mean[index][3], this.std[index][3])
            
            res1 = Math.log(res1)
            res2 = Math.log(res2)
            res3 = Math.log(res3)
            res4 = Math.log(res4)
    
            let p: number = res1 + res2 + res3 + res4

            pArray.push(p)
            pArraySum += p
            //console.log("PDF for " + " is: " + res1);
        }

        for (let j = 0; j < pArray.length; j++) {
            let x: number = Math.exp(pArraySum)
            let pNorm: number = pArray[j] / x
            result.push(pNorm)
        }

        let winner = this.getWinner(result)
        return winner
    }

    average(array: number[][], count: number[]) {

        let meanArray = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        
        for (let index = 0; index < array.length; index++) {
            let category = array[index];

            for (let j = 0; j < category.length; j++) {
                let element = category[j];
                let newValue = element / count[index]
                meanArray[index][j] = newValue
            }
        }

        return meanArray
    }

    varianceCalc(array: number[][], mean: number[][]) {

        let variance = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        
        for (let index = 0; index < array.length; index++) {
            let flower = array[index];
            let varIndex = flower[4]

            variance[varIndex][0] += Math.pow(flower[0] - mean[varIndex][0], 2)
            variance[varIndex][1] += Math.pow(flower[1] - mean[varIndex][1], 2)
            variance[varIndex][2] += Math.pow(flower[2] - mean[varIndex][2], 2)
            variance[varIndex][3] += Math.pow(flower[3] - mean[varIndex][3], 2)
            
        }

        return variance
    }

    stDeviation(x: number[][], count: number[]) {
        let std = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
        
        for (let index = 0; index < x.length; index++) {
            let element = x[index];
            
            element[0] = element[0] / count[index]
            element[1] = element[1] / count[index]
            element[2] = element[2] / count[index]
            element[3] = element[3] / count[index]

            std[index][0] = Math.sqrt(element[0])
            std[index][1] = Math.sqrt(element[1])
            std[index][2] = Math.sqrt(element[2])
            std[index][3] = Math.sqrt(element[3])
        }

        return std
    }

    pdf(x: number, mean: number, std: number) {
        let result: number = (1 / (Math.sqrt(2 * Math.PI) * std)) * Math.pow(Math.E, (-(Math.pow((x - mean), 2)) / (2 * Math.pow(std, 2))))
        return result
    }

    getWinner(arr: number[]) {
        let greatest: number = Math.max(...arr)
        let greatestIndex: number = arr.indexOf(greatest)
        return greatestIndex
    }
}