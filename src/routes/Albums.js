import { Suspense } from "react"
import {
  defer,
  Await,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom"

async function getAlbums() {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums")
  return res.json()
}

const loader = async () => {
  return defer({
    albums: getAlbums(),
  })
}

export default function Albums() {
  const { albums } = useLoaderData()
  const navigate = useNavigate()
  const toCreateAlbumPage = () => navigate("create")

  return (
    <div className="flex flex-row-reverse justify-between my-5">
      <div className=" h-1/5 flex justify-end">
        <button
          className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
          onClick={toCreateAlbumPage}
        >
          Create new album
        </button>
      </div>
      <Suspense fallback={<h3>Loading...</h3>}>
        <Await resolve={albums}>
          {(resolved) => (
            <div className="text-gray-700 ml-8 flex flex-col justify-between">
              {resolved.map((album) => {
                return (
                  <Link key={album.id} to={`/albums/${album.id}`}>
                    <span className="flex items-center pb-1.5">
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
