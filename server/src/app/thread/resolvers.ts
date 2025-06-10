import { Thread } from "../../generated/prisma";
import { GraphqlContext } from "../../interfaces";
import UserService from "../../services/user";
import ThreadService, { CreateThreadPayload } from "../../services/thread";

const queries = {
  getAllThreads: () => ThreadService.getAllThreads(),
  getSignedURLForThread: async (
    parent: any,
    { imageType, imageName }: { imageType: string; imageName: string },
    ctx: GraphqlContext
  ) => {
    // to be done later
  },
};

const mutations = {
  createThread: async (
    parent: any,
    { payload }: { payload: CreateThreadPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    const thread = await ThreadService.createThread({
      ...payload,
      userId: ctx.user.id,
    });

    return thread;
  },
};

const extraResolvers = {
  Thread: {
    author: (parent: Thread) => UserService.getUserById(parent.authorId),
  },
};

export const resolvers = { mutations, extraResolvers, queries };