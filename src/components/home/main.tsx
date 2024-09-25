import MainButton from "../utility/mainButton";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Main = () => {
    return(
        <div id="home" className="min-h-96 w-full grid grid-cols-2 grid-flow-row md:grid-flow-col text-custom-obsidian py-16">
            <div className="flex flex-col pl-20 px-10">
                <div className="text-4xl font-extrabold mb-4">Welcome <span className="text-3xl">to</span> My <span className="text-custom-yellow">Personal Website</span></div>
                <div className="text-3xl font-extrabold mb-10">My <span className="text-custom-yellow">Name</span> is ....</div>
                <div className="text-4xl font-extrabold mb-16"><span className="text-custom-yellow shadow-md shadow-custom-yellow p-1">AZKA</span> Miftah Muhammad</div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <div className="text-3xl font-extrabold mb-16">I'm a <span className="bg-custom-yellow shadow-md shadow-custom-yellow w-fit text-xl font-bold p-2">Web Developer</span></div>
                <div className="mb-8 inline-flex gap-8">
                <MainButton Text="Learn More" Icon="arrow_downward" Url="#services"/>
                <a href="https://www.linkedin.com/in/azka-miftah-muhammad/" target="blank"
                    className="flex justify-center items-center  border border-[#0077B5] border-b-8 shadow-2xl text-custom-obsidian font-bold text-center whitespace-nowrap py-2 px-5 mt-5 rounded-md mb-10 relative overflow-hidden hover:text-custom-white ease-linear duration-500">
                    <div className="inline-flex items-center z-10 text-xl">Linked In<FontAwesomeIcon className="ml-2" icon={faLinkedin} />
                    </div>
                    <span className="custom-ease-in absolute bg-[#0077B5] top-0 left-0 w-0 h-full"></span>
                </a>
                </div>
            </div>
            <div className="grid justify-center">
            <Image className="shadow-2xl shadow-custom-yellow rounded-md" src="/img/azka-2.jpg" width={300} height={0} alt="Photo Azka Miftah Muhammad"/>
            </div>
        </div>
    );
};

export default Main;