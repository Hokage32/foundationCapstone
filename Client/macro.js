//info form
let postInfoForm = document.getElementById('info-form')
let personName = document.getElementById('name')
let personWeight = document.querySelector('.weight')
let activityLvl = document.getElementById('activity')
let weightLoss = document.getElementById('weight-loss')
let weightGain = document.getElementById('weight-gain')
let maintain = document.getElementById('maintain')


//macro form
let macroForm = document.getElementById('macro-form')
let nameSelect = document.getElementById('name-select')
let protein = document.getElementById('protein')
let fats = document.getElementById('fats')
let carbs = document.getElementById('carbs')
let div = document.getElementById('pop-up')

//URL

let baseUrl = 'http://localhost:4000'



postInfoForm.addEventListener('submit', (e) => {
    e.preventDefault()


    let selectedValue = undefined

    if(weightLoss.checked){
        selectedValue = 'weight loss'
    }else if(weightGain.checked){
        selectedValue = 'weight gain'
    }else if(maintain.checked){
        selectedValue = 'maintain weight'
    }
    

    let newClient = {
        name: personName.value,
        weight: +personWeight.value,
        activity: +activityLvl.value,
        goal: selectedValue
        
        
    }

    axios.post('http://localhost:4000/person', newClient)
    .then((res) => {
        console.log(res.data)
        alert('Information has been added!')
    })
})

macroForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let macros = {
        proteinNum: +protein.value,
        
        fatNum: +fats.value,
        weight: +personWeight.value
    }
    console.log(macros)
    axios.put('http://localhost:4000/macro/' + nameSelect.value, macros)
    .then((res) => {
        console.log(res.data)
        alert('Macros have been created!')

        let displayName = res.data[0].full_name
        let displayCal = res.data[0].calories
        let displayPro = res.data[0].protein
        let displayCarb = res.data[0].carbs
        let displayFat = res.data[0].fats

        let divName = document.createElement('div')
        let divCal = document.createElement('div')
        let divPro = document.createElement('div')
        let divCarb = document.createElement('div')
        let divFat = document.createElement('div')

        divName.innerHTML = `<h2>${displayName}</h2>`
        divCal.innerHTML = `<h2>Calories: ${displayCal}</h2>`
        divPro.innerHTML = `<h2>Protein: ${displayPro}g</h2>`
        divCarb.innerHTML = `<h2>Carbs: ${displayCarb}g</h2>`
        divFat.innerHTML = `<h2>Fats: ${displayFat}g</h2>`

        div.appendChild(divName)
        div.appendChild(divCal)
        div.appendChild(divPro)
        div.appendChild(divCarb)
        div.appendChild(divFat)

        

        
        div.appendChild(list)
        

        





    })
})


function getNames() {
    

    axios.get('http://localhost:4000/names')
    .then((res) => {
        selectDropdown(res.data)
        
        
    })
    .catch((err) => {
        console.log(err)
    })
}

function selectDropdown(data) {
    nameSelect.innerHTML = ''

    let defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Select User'
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true

    nameSelect.appendChild(defaultOption)

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = data[i].full_name + ' (id: ' + data[i].client_id + ')'
        option.value = data[i].client_id
       
        nameSelect.appendChild(option)
    }
    
}

getNames()