
function Home() {
    return (
        <>
            <div className="h-[90vh] bg-white justify-center items-center max-w-7xl gap-4 mx-auto grid grid-cols-3">
                <div className="border border-black px-3 py-4 rounded-md bg-slate-800">
                    <img src="/magnify.png" alt="" className="object-cover" />
                    <div className="text-center text-white">
                        <button className="text-3xl" onClick={() => window.location.href = "/objectDetection"}>Object Detection</button>
                    </div>
                </div>
                <div className="border border-black px-3 py-4 rounded-md bg-slate-800">
                    <img src="/magnify.png" alt="" className="object-cover" />
                    <div className="text-center text-white">
                        <button className="text-3xl" onClick={() => window.location.href = "/imageClassification"}>Image Classificatoin</button>
                    </div>
                </div>
                <div className="border border-black px-3 py-4 rounded-md bg-slate-800">
                    <img src="/magnify.png" alt="" className="object-cover" />
                    <div className="text-center text-white">
                        <button className="text-3xl" onClick={() => window.location.href = "/input-detect"}>Input the item</button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home