import JWT from "jsonwebtoken";
import { User } from "../generated/prisma";
import { JWTUser } from "../interfaces";

const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";

class JWTService {
    public static generateTokenForUser(user: User) {
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email,
        };
        
        const token = JWT.sign(payload, JWT_SECRET);
        return token;
    }

    public static decodeToken(token: string) {
        try {
            return JWT.verify(token, JWT_SECRET) as JWTUser;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;