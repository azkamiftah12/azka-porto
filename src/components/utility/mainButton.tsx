const MainButton = ({ Text, Icon, Url }: { Text: string, Icon:string, Url:string }) => {
    return(
        <a href={`${Url}`}
            className="flex justify-center items-center w-fit border border-custom-yellow text-custom-obsidian font-bold text-center whitespace-nowrap py-2 px-5 mt-5 rounded-md mb-10 relative overflow-hidden hover:text-custom-obsidian ease-linear duration-500">
            <div className="inline-flex items-center z-10 text-xl">{Text}<span className="material-symbols-outlined ml-2">{Icon}</span>
            </div>
            <span className="custom-ease-in absolute bg-custom-yellow top-0 left-0 w-0 h-full"></span>
        </a>
    );
};

export default MainButton;