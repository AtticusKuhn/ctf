import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(id:number) {
  const user = await db.user.findFirst({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}
