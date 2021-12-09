import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateChallenge = z.object({
  body: z.string(),
  title: z.string(),
  difficulty: z.string(),
  tags: z.string(),
})

export default resolver.pipe(resolver.zod(CreateChallenge), resolver.authorize(), async (input, ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  if(!ctx.session.userId){
    throw new Error("no id")
  }
  const author = await db.user.findFirst({where:{id:ctx.session.userId}})
  if(!author){
    throw new Error("no author")
  }
  const challenge = await db.challenge.create({data:{...input,
  author: {
    connect:{id:ctx.session.userId}}
  } })

  return challenge
})
