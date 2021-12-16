import { z } from "zod"

 const CreateChallengeSchema = z.object({
    body: z.string(),
    title: z.string(),
    difficulty: z.string(),
    solution: z.string(),
    categories: z.array(z.string()),
  })
  export default CreateChallengeSchema
  export type CreateChallengeType = z.infer<typeof CreateChallengeSchema>