// import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import { ChallengeForm, FORM_ERROR } from "app/challenges/components/ChallengeForm"
import createChallenge from "app/challenges/mutations/createChallenge"
import CreateChallengeSchema from "app/challenges/mutations/createChallengeSchema"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes, useMutation, useRouter } from "blitz"
import { Suspense } from "react"


const NewChallenge: BlitzPage = () => {
  const router = useRouter()
  // const [createChallengeMutation] = useMutation(createChallenge)
//  return <>hi</>
  return (
    <div>
      <h1>Create New Challenge</h1>
    {/* <Suspense fallback="I have no clue why this is here but if I don't I get an error"> */}
      <ChallengeForm
        submitText="Create Challenge"
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateChallengeSchema}
        initialValues={{
          title: "string",
          body: "# hello",
          difficulty: "hard",
          categories: ["xss", "bugs"],
        }}
        onSubmit={async (values) => {
          try {
            // const challenge = await createChallengeMutation(values)
            router.push(Routes.ShowChallengePage({ challengeId: 1 }))
          } catch (error: any) {
            // debugger
            // for(const err of error.issues){

            // }
            // if(error?.issues){

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
      {/* </Suspense> */}

    </div>
  )
}

NewChallenge.authenticate = true
NewChallenge.getLayout = (page) => <Layout title={"Create New Challenge"}>{page}</Layout>

export default NewChallenge
