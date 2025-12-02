import { AbstractRepository } from "@models/abstract.repository";
import { Admin } from "./admin.schema.js";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminRepository extends AbstractRepository<Admin>{
    constructor(@InjectModel(Admin.name) private readonly adminModel:Model<Admin>){
        super(adminModel)
    }
}