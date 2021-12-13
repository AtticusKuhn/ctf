import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getUser from "../../users/queries/getUser"

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "number")
  if(!userId){
    console.log("help me", userId)
  }
  const [user] = useQuery(getUser, userId || 1 )
  if(!user){
    return <>oh no we couldn't find this dude</>
  }

  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div>
        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

   

      </div>
    </>
  )
}

const ShowUserPage: BlitzPage = () => {
  return (
    <div>
      <p>
        
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowUserPage
