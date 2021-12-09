import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateChallenge = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateChallenge), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const challenge = await db.challenge.create({ data: input })

  return challenge
})
