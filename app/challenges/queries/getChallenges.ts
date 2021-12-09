import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetChallengesInput
  extends Pick<Prisma.ChallengeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetChallengesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: challenges,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.challenge.count({ where }),
      query: (paginateArgs) => db.challenge.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      challenges,
      nextPage,
      hasMore,
      count,
    }
  }
)
