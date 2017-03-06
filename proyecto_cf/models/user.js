var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/db_prueba");

var posibles_valores = ["M","F"];
var email_match = [/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Formato de email no valido"];

var user_schema = new Schema({
    name: String,
    last_name: String,
    username: { type: String,required:true,maxlength: [50,"Username muy grande"] },
    password: { type: String , minlength:[8,"El password es muy corto"] },
    age: { type: Number, min:[5,"La edad no puede ser menor que 5"] , max: [100,"La edad no puede ser mayor que 100"] },
    email: { type: String ,required: "El correo es obligatorio", match:email_match },
    date_of_birth: Date,
    sex: { type:String,enum:{values: posibles_valores,message: "Opcion no Valida"} }
});

user_schema.virtual("password_confirmation").get(()=>{
    return this.p_c;
}).set((password)=>{
    this.p_c = password;
});
var User = mongoose.model("User",user_schema);

module.exports = User;


