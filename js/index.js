// document.addEventListener("DOMContentLoaded", function () {
//     monsterPoster()
// })

fetchMonsters()

//Fetches monsters from  Monster API
function fetchMonsters() {
    fetch("http://localhost:3000/monsters/?_limit=10")
    .then(resp => resp.json())
    .then(monsterData => {
        monsterData.forEach(monster => monsterPoster(monster))
        // postNewMonster(monsterData)
    })
}


//creates DOM elements and posts monster to DOM
function monsterPoster(monster) {
    let monsterDiv = document.createElement('div')
    monsterDiv.className = "entry"
    let h2 = document.createElement('h2')
    let h4 = document.createElement('h4')
    let p = document.createElement('p')
    p.style.fontSize = "15px"
    h2.textContent = `Name: ${monster.name}`
    h4.textContent = `Age: ${monster.age}`
    p.textContent = `Bio: ${monster.description}`
    monsterDiv.appendChild(h2)
    h2.appendChild(h4)
    h4.appendChild(p)
    console.log(monsterDiv)
    document.querySelector("#monster-container").appendChild(monsterDiv)
}

document.querySelector("#monster-form").addEventListener("submit", handleCreateBtn)

//Takes user input from form and creates a monster Object to pass to JSON
function handleCreateBtn(event) {
    event.preventDefault()
    let monsterObj = {
    name: event.target.name.value, 
    age: event.target.age.value,
    description: event.target.description.value
    }
    postNewMonster(monsterObj)
}

//takes monster Object and POSTS then sends to the monsterPoster function to post to the DOM
function postNewMonster(newMonsterObj) {
    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(newMonsterObj),
    })
    .then(resp => resp.json())
    .then(monsterData => monsterPoster(monsterData))
}

document.querySelector("#forward").addEventListener("click", postNextMonsters)

function postNextMonsters() {
    const page = 2
    const limit = 5
    fetch(`http://localhost:3000/monsters/?_page=${page}&_limit=${limit}`)
    .then(resp => resp.json())
    .then(monsterData => {
        monsterData.forEach(monster => monsterPoster(monster))
        // postNewMonster(monsterData)
    })
}