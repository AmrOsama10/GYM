import { generateHashing } from "@common/index";
import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../dto/register.dto.js";
import { User } from "../entities/auth.entity.js";

@Injectable()
export class AuthFactoryService {
    
    async create(registerDTO:RegisterDto){
        const user = new User()

        user.userName=registerDTO.userName
        user.email=registerDTO.email
        user.password= await generateHashing(registerDTO.password)
        user.isVerified=false

        return user
    }
}