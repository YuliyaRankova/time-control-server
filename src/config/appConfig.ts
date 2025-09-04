import serverConfig from "../../server-config/server-config.json" with {type: "json"};
import dotenv from "dotenv";

export interface AppConfig{
    port:number,
    mongoURI:string
};

dotenv.config();

export const configuration:AppConfig={
    ...serverConfig,
    mongoURI:process.env.MONGO_URI || "dev db address"
}