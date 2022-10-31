import Layout from "./routes/Layout"
import Albums, { loader as albumsLoader } from "./routes/Albums"
import Album from "./routes/Album"
import Users, { loader as usersLoader } from "./routes/Users"
import User, { loader as userLoader } from "./routes/User"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom"
import Notfoundpage from "./routes/Notfoundpage"
import CreateUser from "./routes/CreateUser"
import CreateAlbum from "./routes/CreateAlbum"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Navigate to="/users" />}></Route>
      <Route path="users" element={<Users />} loader={usersLoader}></Route>
      <Route path="users/create" element={<CreateUser />}></Route>
      <Route path="users/:id" element={<User />} loader={userLoader}></Route>
      <Route path="albums" element={<Albums />} loader={albumsLoader} />
      <Route path="albums/:id" element={<Album />} />
      <Route
        path="albums/create"
        element={<CreateAlbum />}
        loader={usersLoader}
      ></Route>
      <Route path="/*" element={<Notfoundpage />} />
    </Route>
  )
)

function App() {
  return (
    <div className="px-10">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
