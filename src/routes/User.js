import { Suspense, useEffect, useState } from "react"
import {
  Await,
  useNavigate,
  useLoaderData,
  Link,
  defer,
} from "react-router-dom"

async function getUserById(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  return res.json()
}

const loader = async ({ params: { id } }) => {
  return defer({
    user: getUserById(id),
    id,
  })
}

export default function User() {
  const [albums, setAlbums] = useState([])
  const { user, id } = useLoaderData()
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((json) => setAlbums(json))
  }, [])
  const goBack = () => navigate(-1)
  const goToNotfoundedpage = () => navigate("/undefined")

  return (
    <div className="flex justify-between flex-row-reverse px-0 py-4 md:px-10">
      <div className=" h-1/5 flex justify-end">
        <button
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
          onClick={goBack}
        >
          Go back
        </button>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={user}>
          {(resolved) => (
            <>
              {!resolved.username ? (
                goToNotfoundedpage()
              ) : (
                <div className="flex flex-col">
                  <div className="text-gray-500">
                    <h2 className="font-medium text-lg md:text-4xl text-gray-700">
                      {resolved.name}
                    </h2>
                    <ul className="list-none">
                      <li>Username: {resolved.username}</li>
                      <li>Email: {resolved.email}</li>
                      <li>Phone: {resolved.phone.replaceAll(".", "-")}</li>
                      <li>Site: {resolved.website}</li>
                    </ul>
                  </div>
                  <div className="my-6 text-gray-700">
                    <h2 className=" font-medium text-lg md:text-4xl">
                      Albums:{" "}
                    </h2>
                    {albums
                      .filter((a) => +a.userId === +id)
                      .map((album) => (
                        <Link key={album.id} to={`/albums/${album.id}`}>
                          <span className="flex items-center">
                            <img
                              src="/icons/album-icon.png"
                              className="w-4 mt-1 h-4 mr-1"
                              alt="album"
                            />
                            <p className="hover:underline first-letter:capitalize">
                              {album.title}
                            </p>
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

export { loader }
