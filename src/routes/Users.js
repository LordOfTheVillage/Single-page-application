import { Suspense } from "react"
import {
  defer,
  Link,
  useLoaderData,
  Await,
  useNavigate,
} from "react-router-dom"

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")

  return res.json()
}

const loader = async () => {
  return defer({
    users: getUsers(),
  })
}

export default function Users() {
  const { users } = useLoaderData()
  const navigate = useNavigate()
  const toCreateUserPage = () => navigate("create")
  return (
    <div className="flex flex-row-reverse justify-between my-5">
      <div className=" h-1/5 flex justify-end">
        <button
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
          onClick={toCreateUserPage}
        >
          Create new user
        </button>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={users}>
          {(resolved) => (
            <div className="text-gray-700 ml-8 flex flex-col justify-between">
              {resolved.map((user) => {
                return (
                  <Link key={user.id} to={`${user.id}`}>
                    <p className="pb-1.5 hover:underline">{user.name}</p>
                  </Link>
                )
              })}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

export { loader }
