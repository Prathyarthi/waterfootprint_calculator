import SavingComponent from "../components/SavingComponent"

function HowToSave() {
    return (
        <div className="h-[95vh] bg-black flex flex-col justify-start items-center">
            <h1 className="text-5xl text-[#0095ff]">How To Save Water</h1>
            <div className="grid grid-cols-3 mx-auto max-w-7xl">
                <SavingComponent src={"/diet.png"} alt={"water"} title={"Change your Diet"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity. "} />
                < SavingComponent src={"/Indoor.png"} alt={"water"} title={"Cut Indoor water waste"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity."} />
                <SavingComponent src={"/outdoor.png"} alt={"water"} title={"Use Less Water OutSide"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity."} />
                <SavingComponent src={"/energy.png"} alt={"water"} title={"Save Energy, Save Water"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity. "} />
                <SavingComponent src={"/changebuying.png"} alt={"water"} title={"Change Buying Habits"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity. "} />
                <SavingComponent src={"/dive.png"} alt={"water"} title={"Dive Deeper"} description={"In a world where water scarcity is becoming increasingly prevalent, every drop counts. Water conservation is not just a choice; it's a necessity. "} />

            </div>
        </div>
    )
}

export default HowToSave