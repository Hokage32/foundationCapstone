const Sequelize = require('sequelize')
require('dotenv').config()

const{ CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


let maintenenceCal = 0

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS clients;
        


        CREATE TABlE clients (
            client_id SERIAL PRIMARY KEY,
            full_name VARCHAR NOT NULL,
            weight INT NOT NULL,
            activity_level INT NOT NULL,
            goal VARCHAR NOT NULL,
            calories INT NOT NULL,
            protein INT,
            fats INT,
            carbs INT

        );
        `)
        .then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        })
        .catch(err => console.log('error seeding DB', err))
    },

    postPerson: (req,res) => {
        const {name, weight, activity, goal} = req.body
       
        //checking to see what activity level was input
       

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

        sequelize.query(`
            INSERT INTO clients (full_name, weight, activity_level, goal, calories)
            VALUES ('${name}', ${weight}, ${activity}, '${goal}', ${maintenenceCal})
        `).then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))

        
       
       
    },

    makeMacro: async (req,res) => {


        const {proteinNum, carbNum, fatNum} = req.body
        const {id} = req.params
        

        newProtein = proteinNum
        newFat = fatNum 
        
        // const dbRes = await sequelize.query(`SELECT weight
        // FROM clients
        // WHERE client_id = ${id}`)
        // .catch((err) => console.log(err))
        // console.log(dbRes[0][0].weight)

         sequelize.query(`
            UPDATE clients 
            SET protein =  weight * ${newProtein} ,
            fats = weight * ${newFat}
            WHERE client_id = ${id};
        `)

        sequelize.query(`
            UPDATE clients
            SET carbs = (calories - ((protein * 4) + (fats * 9)) ) / 4
            WHERE client_id = ${id};
        `)

        sequelize.query(`
            SELECT *
            FROM clients
            WHERE client_id = ${id}
        
        
        `)
        .then((dbRes) => {
            //console.log(dbRes)
            res.status(200).send(dbRes[0])
        }).catch((err) => console.log(err))
     },

    getNames: (req, res) => {
        sequelize.query(`
        SELECT full_name, client_id
        FROM clients;
        
        `).then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
    }
}