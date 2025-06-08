"use client"

import React from "react"

export const Feed = () => {
    const { threads = [] } = useGetAllThreads();

    return (
        <>
            {
                threads?.map((thread) => thread ? <FeedCard key={thread?.id} thread={thread as Thread} /> : null)
            }
        </>
    )
}