import { Appbar } from "./Appbar"
import { Outlet } from "react-router-dom"
function Layout() {
    return (
        <>
            <Appbar />
            <Outlet />
        </>
    )
}

export default Layout