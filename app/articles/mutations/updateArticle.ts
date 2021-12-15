import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateArticle = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateArticle),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const article = await db.article.update({ where: { id }, data })

    return article
  }
)
