// import { resolver } from "blitz"
// import db from "db"
// import { z } from "zod"

// const UpdateChallenge = z.object({
//   id: z.number(),
//   title: z.string(),
// })

// export default resolver.pipe(
//   resolver.zod(UpdateChallenge),
//   resolver.authorize(),
//   async ({ id, ...data }) => {
//     // TODO: in multi-tenant app, you must add validation to ensure correct tenant
//     const challenge = await db.challenge.update({ where: { id }, data })

//     return challenge
//   }
// )

import { Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateChallenge = z.object({
  id: z.number(),
  body: z.string(),
  title: z.string(),
  difficulty: z.string(),
  categories: z.array(z.string()),
})

export default resolver.pipe(
  resolver.zod(UpdateChallenge),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    if (!ctx.session.userId) {
      throw new Error("no id")
    }
    // const author = await db.user.findFirst({where:{id:ctx.session.userId}})
    // if(!author){
    //   throw new Error("no author")
    // }
    const challenge = await db.challenge.update({
      where: {
        id: input.id,
      },
      data: {
        body: input.body,
        difficulty: input.difficulty,
        title: input.title,
        categories: {
          connectOrCreate: input.categories.map((tag) => ({
            create: { name: tag },
            where: { name: tag },
          })),
        },
      },
    })

    return challenge
  }
)
