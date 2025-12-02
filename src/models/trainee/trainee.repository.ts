import { AbstractRepository } from "@models/abstract.repository";
import { Trainee } from "./trainee.schema.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TraineeRepository extends AbstractRepository<Trainee>{
    constructor(@InjectModel(Trainee.name) private readonly traineeModel:Model<Trainee>){
        super(traineeModel)
    }
}