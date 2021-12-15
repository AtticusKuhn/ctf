import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArticle = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteArticle), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const article = await db.article.deleteMany({ where: { id } })

  return article
})
