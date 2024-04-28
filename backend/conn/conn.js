const mongoose = require('mongoose');

// const connectToDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://suvashneupane4:Ws7C9yBw0fvEN0t1@todolist.djxfpcf.mongodb.net/",
//             {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
          
//             }
//         );
//         console.log("Connection established");
//     } catch (error) {
//         console.error("Error connecting to database:", error);
//     }
// };

//  connectToDB();
const connectToDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://suvashneupane4:Ws7C9yBw0fvEN0t1@todolist.djxfpcf.mongodb.net/",
        
        {
            usenewUrlParser:true,
            useUnifiedTopology:true,
            
        }
        
        )
        console.log("connection made")
    }
    catch(error){
        console.log("Error conneting to the database",error)

    }
};
connectToDB();