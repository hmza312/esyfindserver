const config={
    production :{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default : {
        SECRET: 'mysecretkey',
        DATABASE: 'mongodb://localhost:27017/Users'
        // DATABASE: 'mongodb+srv://maryam:maryam@cluster0.812je.mongodb.net/<dbname>?retryWrites=true&w=majority'


    }
}


exports.get = function get(env){
    return config.default
}