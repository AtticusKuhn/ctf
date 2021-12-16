import { AuthenticationError, Ctx, resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateArticle = z.object({
  title: z.string(),
  body: z.string(),
  categories: z.array(z.string()),
})

export default resolver.pipe(resolver.zod(CreateArticle), resolver.authorize(), async (input,  ctx: Ctx) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  if(!ctx.session.userId){
    throw new AuthenticationError("you are not logged in")
  }
  const article = await db.article.create({
    data: {
      ...input,
      categories: {
        connectOrCreate: input.categories.map((tag) => ({
          create: { name: tag },
          where: { name: tag },
        })),
      },
      author: {
        connect: { id: ctx.session.userId },
      },
    },
  })
  // const article = await db.article.create({ data:{ ...input,
  //   categories: {
  //     connectOrCreate: input.categories.map((tag) => ({
  //       create: { name: tag },
  //       where: { name: tag },
  //     })),
  //   },
  //   author: {
  //     connect: { id: ctx.session.userId },
  //   }  })
  // }

  return article
})
