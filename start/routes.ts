/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AuthController from "App/Controllers/Http/AuthController";
import BloodtestsController from "App/Controllers/Http/BloodtestsController";

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware("auth:api")

//Authentication
Route.post('/auth', async ({ request, auth, response }) => {
  const authschema = schema.create({
    email: schema.string({}, [
      rules.email()
    ]),
    pass: schema.string()
  })

  const payload = await request.validate({ schema: authschema })

  return AuthController.login( { request, auth, response } )
})

//Create Pacient
Route.post('/createPacient/:name/:id', async ( { params }) => {
  return BloodtestsController.createPacient(params)
}).middleware("auth:api")

//Calculate the Blood Test
Route.post('/bloodtest', async ( { request } ) => {
  
  const bloodschema = schema.create({
    pacient_id: schema.number(),
    sugar: schema.number(),
    oxigen: schema.number(),
    bodyfat: schema.number()
  })

  const payload = await request.validate({ schema: bloodschema })

  return BloodtestsController.getBloodTest(request.all())
}).middleware("auth:api")

//Consult the result de blood test for pacient
Route.get('/getResults/:identification', async ({ params }) => {
  return BloodtestsController.getResultById(params.identification)
}).middleware("auth:api")

//Consult the result de blood test for pacient
Route.get('/getAllResults', async () => {
  return BloodtestsController.getAllResults()
}).middleware("auth:api")