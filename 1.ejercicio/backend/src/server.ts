import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import cors from "cors";
import { User } from "./user.model";
import path from "path";
export class Server {
  private app: Application;
  private port: number;
  private Model: any;
  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
    this.connectDB();
    this.cors();
    this.routes();
    this.Model = User;
  }
  routes() {
    this.app.post("/api", async (req: Request, res: Response) => {
     

      const User = new this.Model(req.body);
      await User.save();
      res.status(200).send({ msg: "ok" });
    });
    this.app.get("/api", async (req: Request, res: Response) => {
        const results = await this.Model.find();
        res.status(200).send({ results})
    });
    this.app.put("/api/:id", async (req: Request, res: Response) => {
console.log(req.body)
        await this.Model.findByIdAndUpdate(req.params.id,req.body);
    })
    this.app.delete('/api/:id',async (req: Request, res: Response) => {
        await this.Model.findByIdAndDelete(req.params.id);
      res.status(200).send({msg: "ok"});  
    });
    this.app.use('*',(req, res) => {
      res.sendFile(path.resolve("public/index.html"));
    });
  }
  cors() {
    this.app.use(express.static("public"));
    this.app.use(cors());
this.app.use(express.json());
this.app.use(express.urlencoded());

  }
  connectDB = async () => {
    const uriDB = process.env.MONGO_URI || "";
    await connect(uriDB, {}, (err) => {
      if (err) {
        console.log("Error Connecting to the Database", err);
      } else {
        console.log("Connect to the database");
      }
    });
  };
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }
}
