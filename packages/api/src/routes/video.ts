import { VideoTable } from '../db/schema'
import { publicProcedure, router } from '../trpc'

export const videoRouter = router({
  all: publicProcedure.query(async ({ ctx }) => {
    const { db } = ctx
    const allVideos = await db.select().from(VideoTable).all()
    return allVideos
  }),
})
