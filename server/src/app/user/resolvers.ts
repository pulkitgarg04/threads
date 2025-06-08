import axios from "axios";
import UserService from "../../services/user";
import { GraphqlContext } from "../../interfaces";

const queries = {
    verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
        const resultToken = await UserService.verifyGoogleAuthToken(token);
        return resultToken;
    },
    getCurrentUser: async (parent: any, args: any, ctx: GraphqlContext) => {
        const id = ctx.user?.id;
        if (!id) return null;

        const user = await UserService.getUserById(id);
        return user;
    },
    getUserById: async (
        parent: any,
        { id }: { id: string },
        ctx: GraphqlContext
    ) => UserService.getUserById(id),
};

export const resolvers = { queries };