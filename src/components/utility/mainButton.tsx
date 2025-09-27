const MainButton = ({ Text, Icon, Url, ModalId }: { Text: string; Icon: string; Url?: string; ModalId?: string }) => {
  if (Url) {
    return (
      <a
        href={`${Url}`}
        className="flex justify-center items-center w-fit border border-custom-yellow hover-animate text-custom-obsidian font-bold text-center whitespace-nowrap py-2 px-5 mt-5 rounded-md mb-10 relative overflow-hidden hover:text-custom-white ease-linear duration-500"
      >
        <div className="inline-flex items-center z-10 text-xl">
          {Text}
          <span className="material-symbols-outlined ml-2">{Icon}</span>
        </div>
        <span className="custom-ease-in absolute bg-custom-yellow top-0 left-0 w-0 h-full"></span>
      </a>
    );
  }

  if (ModalId) {
    return (
      <div
        className="flex justify-center items-center w-fit border border-custom-yellow hover-animate text-custom-obsidian font-bold text-center whitespace-nowrap py-2 px-5 mt-5 rounded-md mb-10 relative overflow-hidden hover:text-custom-white ease-linear duration-500 cursor-pointer"
        data-bs-toggle="modal"
        data-bs-target={`#${ModalId}`}
      >
        <div className="inline-flex items-center z-10 text-xl">
          {Text}
          <span className="material-symbols-outlined ml-2">{Icon}</span>
        </div>
        <span className="custom-ease-in absolute bg-custom-yellow top-0 left-0 w-0 h-full"></span>
      </div>
    );
  }
};

export default MainButton;
