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
let protein = document.getElementById('protein')
let fats = document.getElementById('fats')
let carbs = document.getElementById('carbs')

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