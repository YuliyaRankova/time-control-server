import {launchServer} from "./server.ts";
import * as mongoose from "mongoose";
import {configuration} from "./config/appConfig.js";

mongoose.connect(configuration.mongoURI).then(()=>{
    console.log("Mongo DB successfully connected");
    launchServer();
}).catch(() => console.log("Something went wrong"));
