import { prismaClient } from "../clients/db";
import { redisClient } from "../clients/redis";

export interface CreateThreadPayload {
    content: string;
    imageURL?: string;
    userId: string;
}

class ThreadService {
    public static async createThread(data: CreateThreadPayload) {
        const rateLimitFlag = await redisClient.get(
            `RATE_LIMIT:Thread:${data.userId}`
        );

        if (rateLimitFlag) throw new Error("Please wait....");
        
        const Thread = await prismaClient.thread.create({
            data: {
                content: data.content,
                imageURL: data.imageURL,
                author: { connect: { id: data.userId } },
            },
        });

        // Applied rate limiting for 10 seconds (so that user can't post another post in 10 seconds)
        await redisClient.setex(`RATE_LIMIT:Thread:${data.userId}`, 10, 1);

        await redisClient.del("ALL_THREADS");
        return Thread;
    }

    public static async getAllThreads() {
        const cachedThreads = await redisClient.get("ALL_THREADS");
        if (cachedThreads) return JSON.parse(cachedThreads);

        const Threads = await prismaClient.thread.findMany({
            orderBy: { createdAt: "desc" },
        });

        await redisClient.set("ALL_THREADS", JSON.stringify(Threads));
        return Threads;
    }
}

export default ThreadService;