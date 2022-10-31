import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function Album() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [album, setAlbum] = useState({})
  const [user, setUser] = useState({})

  const goBack = () => navigate(-1)
  const goToUser = (album) => {
    return navigate(`/users/${album.userId}`)
  }

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((response) => response.json())
      .then((json) => (!json.userId ? navigate("/undefined") : setAlbum(json)))
  }, [id, navigate])

  useEffect(() => {
    if (album.userId !== undefined) {
      fetch(`https://jsonplaceholder.typicode.com/users/${album.userId}`)
        .then((response) => response.json())
        .then((json) => setUser(json))
    }
  }, [album])

  return (
    <>
      <div className="flex justify-between px-0 py-4 text-gray-700 md:px-10">
        <div>
          <h2 className="font-medium text-lg md:text-4xl first-letter:capitalize">
            {album.title}
          </h2>
          <div className="flex text-gray-500">
            <p className="mr-2">Created by: </p>
            <button className="hover:underline" onClick={() => goToUser(album)}>
              {user.name || "Loading..."}
            </button>
          </div>
        </div>
        <div className=" h-1/5 flex justify-end">
          <button
            className="border border-gray-400 mr-0 px-3 pb-1 rounded-sm md:mr-8 hover:border-blue-600 hover:text-blue-600"
            onClick={goBack}
          >
            Go back
          </button>
        </div>
      </div>
      <div className=" w-full lg:w-3/4 my-10 mx-auto grid gap-x-8 gap-y-8 grid-cols-2 sm:grid-cols-3">
        <div className="bg-slate-300 h-36 md:h-52 xl:h-80"></div>
        <div className="bg-slate-300"></div>
        <div className="bg-slate-300 "></div>
        <div className="bg-slate-300 h-36 md:h-52 xl:h-80"></div>
        <div className="bg-slate-300"></div>
        <div className="bg-slate-300 "></div>
        <div className="bg-slate-300 h-36 md:h-52 xl:h-80"></div>
        <div className="bg-slate-300"></div>
        <div className="bg-slate-300 "></div>
      </div>
    </>
  )
}
