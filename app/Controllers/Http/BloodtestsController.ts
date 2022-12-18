// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import BloodTest from 'App/Models/BloodTest';
import Pacient from 'App/Models/Pacient';

export default class BloodtestsController {

    public static async getResultById(id: any){
        const pacient = await Pacient.findBy("identification",id)
        const blood = await pacient.related("BloodTest").query()

        return { Pacients: pacient, BloodTest: blood }
    }

    public static async getAllResults(){
        const pacient = await Pacient.all()
        // const pacient = await Pacient.query().with("BloodTest")
        let data = pacient.map( async (datos) => {
            datos.blood = await BloodTest.find(datos.id)
            // console.log(datos)
            return datos
        })

        // let blood = await BloodTest.findBy("id",2)
        // pacient.push(
        //     pacient.map((datos, pos) => {
        //         // const blood = await pacient.related("BloodTest").query()
        //         let blood = BloodTest.find(pos.id)
        //         return blood
        //     })
        // )
        return { 
            Pacients: pacient, 
            BloodTest: data.blood
        }
    }

    private static getResult(blood){
        let response = "SIN DIAGNOSTICO"
        if( (blood.sugar > 70) && (blood.oxigen < 60) && (blood.bodyfat > 88,5) ){
            response = "ALTO"
        }else if((blood.sugar >= 50 && blood.sugar <= 70) && (blood.oxigen >= 60 && blood.oxigen <= 70) && (blood.bodyfat >= 62,2 && blood.bodyfat <= 88,5)){
            return "MEDIO"
        }else if((blood.sugar < 50) && (blood.oxigen > 70) && (blood.bodyfat < 62,2)){
            return "BAJO"
        }

        return response
    }

    public static async getBloodTest(request){
        const pacient = await Pacient.findBy("id",request.pacient_id)

        // Transaction created
        const trx = await Database.transaction()
        try{
            const blood = new BloodTest()
            blood.sugar = request.sugar
            blood.oxigen = request.oxigen
            blood.bodyfat = request.bodyfat
            blood.pacientId = pacient.id
            blood.result = this.getResult(request)
            await blood.save()

            await trx.commit()

            return { "status": true,"result": blood.result}
        }catch(error){
            trx.rollback()
            return { "status": false }
        }
    }

    public static async createPacient(request){
        // Transaction created
        const trx = await Database.transaction()
        
        try{
            const paciente = new Pacient()
            paciente.name = request.name.replace("%20"," ")
            paciente.identification = request.id
            await paciente.save()

            await trx.commit()

            return { "status": true }
        }catch(error){
            trx.rollback()
            return { "status": false }
        }
    }
}
