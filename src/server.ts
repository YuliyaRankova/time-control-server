import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {configuration} from "./config/appConfig.js";
import {errorHandler} from "./errorHandler/errorHandler.js";
import {accountRouter} from "./routes/accountRouter.js";

export const launchServer = () => {
    dotenv.config();
    const app = express();
    app.listen(configuration.port, () => console.log(`Server runs at http://localhost:${configuration.port}`))

    app.use(express.json());

    app.use("/accounts", accountRouter);
    app.use((req: Request, res: Response) => {
        res.status(404).send("Page not found")
    });

    app.use(errorHandler);
};