
function PageNotFound() {
    return (
        <div className="h-screen bg-black text-white flex justify-center items-center">
            <div className="font-bold">
                404
            </div>
            <hr className="text-white pl-4 pr-4 rotate-90" />
            <div className="text-lg">
                Page Not Found
            </div>
        </div>
    )
}

export default PageNotFound