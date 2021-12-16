import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCategoriesInput
  extends Pick<Prisma.ArticleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCategoriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: articles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.article.count({ where }),
      query: (paginateArgs) => db.article.findMany({ ...paginateArgs, where, orderBy }),
    })
    const {
        items: challenges,
        // hasMore,
        // nextPage,
        // count,
      } = await paginate({
        skip,
        take,
        count: () => db.challenge.count({ where }),
        query: (paginateArgs) => db.challenge.findMany({ ...paginateArgs, where, orderBy }),
      })

    return {
        articles,
        challenges,
      nextPage,
      hasMore,
      count,
    }
  }
)
