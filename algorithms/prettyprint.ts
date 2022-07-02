export function prettyPrintIrisMatrix(input) {
    console.log("     0    1     2")
    console.log("  ---------------")

    for (let index = 0; index < input.length; index++) {
        let element = input[index];
        element = element.toString()
        element = element.replace(/,/g, "    ")
        console.log(index + " |  " + element)
    }
}

export function prettyPrintBanknoteMatrix(input) {
    console.log("     0      1")
    console.log("  --------------")

    for (let index = 0; index < input.length - 1; index++) {
        let element = input[index];
        element = element.toString()
        element = element.replace(/,/g, "    ")
        console.log(index + " |  " + element)
    }
}