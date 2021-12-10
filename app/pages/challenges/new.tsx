import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createChallenge, { CreateChallenge } from "app/challenges/mutations/createChallenge"
// import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import * as z from "zod";

const NewChallengePage: BlitzPage = () => {
  const router = useRouter()
  const [createChallengeMutation] = useMutation(createChallenge)

  return (
    <div>
      <h1>Create New Challenge</h1>

      <ChallengeForm
        submitText="Create Challenge"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateChallenge}
        initialValues={{ title: "helllo" }}
        
        onSubmit={async (values) => {
          try {
            const challenge = await createChallengeMutation(values)
            router.push(Routes.ShowChallengePage({ challengeId: challenge.id }))
          } catch (error: any) {
            // debugger
            // for(const err of error.issues){

            // }
            // if(error?.issues){
              if (error instanceof z.ZodError) {
                console.log(error.issues);
                return error.issues.map(issue=>({[issue.path[0]]: issue.code}))

              }
            // }
            console.log(error)
            // alert(errror)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ChallengesPage()}>
          <a>Challenges</a>
        </Link>
      </p>
    </div>
  )
}

NewChallengePage.authenticate = true
NewChallengePage.getLayout = (page) => <Layout title={"Create New Challenge"}>{page}</Layout>

export default NewChallengePage
