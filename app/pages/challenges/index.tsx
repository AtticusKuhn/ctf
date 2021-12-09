import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getChallenges from "app/challenges/queries/getChallenges"

const ITEMS_PER_PAGE = 100

export const ChallengesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ challenges, hasMore }] = usePaginatedQuery(getChallenges, {
    orderBy: { id: "asc" },
    where:{},
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <Link href={Routes.ShowChallengePage({ challengeId: challenge.id })}>
              <a>{challenge.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ChallengesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Challenges</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewChallengePage()}>
            <a>Create Challenge</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ChallengesList />
        </Suspense>
      </div>
    </>
  )
}

ChallengesPage.authenticate = true
ChallengesPage.getLayout = (page) => <Layout>{page}</Layout>

export default ChallengesPage
