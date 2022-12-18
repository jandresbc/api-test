import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
    public static async login({ request, auth, response }) {
        const req = request.all()
        const email = req.email;
        const password = req.pass;

        // Lookup user manually
        const user = await User.query().where('email', email).where('password', password).first()

        // Verify password
        if (!(user)) {
            return response.unauthorized('Invalid credentials')
        } 
        
        const token = await auth.use('api').generate(user, {
            expiresIn: '60 mins'
        })

        return token.toJSON();
    }
    
    public static async register({ request, auth }: HttpContextContract) {
        const req = request.all()
        const email = req.input("email");
        const password = req.input("password");
        
        /**
        * Create a new user
        */
        
        const user = new User();
        user.email = email;
        user.password = password;
        await user.save();
        
        const token = await auth.use("api").login(user, {
        	expiresIn: "60 mins",
        });
        
        return token.toJSON();
    }
}