let clients = []

module.exports = {
    postPerson: (req,res) => {
        const {name, weight, activity, goal} = req.body
        console.log(req.body)
        // new body
        const copy = {
            name,
            weight
        }
        //checking to see what activity level was input
       let maintenenceCal = 0

        if(activity === 14){
           maintenenceCal = weight * 14

        }
        if(activity === 15){
           maintenenceCal = weight * 15
        }
        if(activity === 16){
           maintenenceCal = weight * 16
        }
        
        


        //checking to see what radio button was selected
        if(goal === 'weight loss'){
            maintenenceCal = maintenenceCal - 500
        }else if(goal === 'weight gain'){
            maintenenceCal = maintenenceCal + 500
        }else if(goal === 'maintain weight'){
            maintenenceCal = maintenenceCal
        }



        copy.calories = maintenenceCal
        clients.push(copy)
        res.status(200).send(clients)
    }
}