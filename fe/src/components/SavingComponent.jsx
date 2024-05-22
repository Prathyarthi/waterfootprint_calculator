
function SavingComponent({ src, title, alt, description }) {
    return (
        <>
            <div className="flex flex-col justify-center items-center m-3 text-white">
                <div className="rounded-full h-32 w-32 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        <img src={src} alt={alt} className="object-cover w-32 h-32 rounded-full" />
                    </div>
                </div>
                <p className="text-3xl text-white">{title}</p>
                <div className="text-start ">
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}

export default SavingComponent