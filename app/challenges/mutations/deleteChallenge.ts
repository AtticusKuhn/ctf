import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteChallenge = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteChallenge),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const challenge = await db.challenge.deleteMany({ where: { id } })

    return challenge
  }
)
