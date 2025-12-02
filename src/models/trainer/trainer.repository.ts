import { AbstractRepository } from "@models/abstract.repository";
import { Trainer } from "./trainer.schema.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TrainerRepository extends AbstractRepository<Trainer>{
    constructor(@InjectModel(Trainer.name) private readonly trainerModel:Model<Trainer>){
        super(trainerModel)
    }
}