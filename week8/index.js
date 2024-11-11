// this code runs synchronously
function showData() {
    console.log("showData function finished")
}

// this code runs ascynchronously
async function getRandomFact() {
    const response = await fetch("https://yomomma-api.herokuapp.com/jokes")
    //console.log(response)
    const data = await response.json()
    console.log(data.text, "\n")
    //console.log("getData finished")
}

async function getTodaysFact() {
    const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today")
    //console.log(response)
    const data = await response.json()
    console.log(data.text, "\n")
    //console.log("getData finished")
}

getRandomFact()
getTodaysFact()

//getData()
//showData()