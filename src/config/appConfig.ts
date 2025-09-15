// import serverConfig from "../../server-config/server-config.json" with {type: "json"};
import serverConfig from "../../server-config/server-config.json";
import dotenv from "dotenv";

export interface AppConfig{
    port:number,
    mongoURI:string,
    logLevel:string,
    minTimeBetweenShifts:number
}

dotenv.config();

export const configuration:AppConfig={
    ...serverConfig,
    mongoURI:process.env.MONGO_URI || "dev db address"
}