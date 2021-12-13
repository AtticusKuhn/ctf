import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetChallenge = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetChallenge), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const challenge = await db.challenge.findFirst({
    where: { id },
    include: {
      categories: true,
      author: true,
      solvers: {
        take: 2,
      },
    },
  })

  if (!challenge) throw new NotFoundError()

  return challenge
})
