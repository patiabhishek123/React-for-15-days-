import { useLoaderData } from "react-router-dom"

type GitHubUser = {
  avatar_url: string
  followers: number
}

export default function Github() {
  const data = useLoaderData() as GitHubUser
  return (
    <div className="bg-amber-900 w-full h-60 flex flex-row gap-3.5 ">
      {data && <img src={data.avatar_url} alt="logo" width={300} />}
      <div>Github followers: {data?.followers ?? "-"}</div>
    </div>
  )
}

export async function getUserInfo({ params }: { params: { username?: string } }) {
  const username = params.username ?? ""
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) {
    throw new Response("Failed to fetch user", { status: response.status })
  }
  return (await response.json()) as GitHubUser
}