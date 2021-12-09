import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateChallenge = z.object({
  id: z.number(),
  title: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateChallenge),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const challenge = await db.challenge.update({ where: { id }, data })

    return challenge
  }
)
