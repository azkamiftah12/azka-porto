const icons: Record<string, JSX.Element> = {
  "Professional Background": (
    // Briefcase icon
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path d="M10.5 2a1.5 1.5 0 00-1.5 1.5V6H5.25A2.25 2.25 0 003 8.25v2.25h18V8.25A2.25 2.25 0 0018.75 6H15V3.5A1.5 1.5 0 0013.5 2h-3zM15 6h-6V3.5h6V6z" />
      <path d="M21 12H3v7.75A2.25 2.25 0 005.25 22h13.5A2.25 2.25 0 0021 19.75V12z" />
    </svg>
  ),
  "Collaborative & Reliable": (
    // Users / Team icon
    <svg viewBox="0 0 55 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white">
      <path
        d="M8.25 19.25C11.2836 19.25 13.75 16.7836 13.75 13.75C13.75 10.7164 11.2836 8.25 8.25 8.25C5.21641 8.25 2.75 10.7164 2.75 13.75C2.75 16.7836 5.21641 19.25 8.25 19.25ZM46.75 19.25C49.7836 19.25 52.25 16.7836 52.25 13.75C52.25 10.7164 49.7836 8.25 46.75 8.25C43.7164 8.25 41.25 10.7164 41.25 13.75C41.25 16.7836 43.7164 19.25 46.75 19.25ZM49.5 22H44C42.4875 22 41.1211 22.6102 40.1242 23.5984C43.5875 25.4977 46.0453 28.9266 46.5781 33H52.25C53.7711 33 55 31.7711 55 30.25V27.5C55 24.4664 52.5336 22 49.5 22ZM27.5 22C32.8195 22 37.125 17.6945 37.125 12.375C37.125 7.05547 32.8195 2.75 27.5 2.75C22.1805 2.75 17.875 7.05547 17.875 12.375C17.875 17.6945 22.1805 22 27.5 22ZM34.1 24.75H33.3867C31.5992 25.6094 29.6141 26.125 27.5 26.125C25.3859 26.125 23.4094 25.6094 21.6133 24.75H20.9C15.4344 24.75 11 29.1844 11 34.65V37.125C11 39.4023 12.8477 41.25 15.125 41.25H39.875C42.1523 41.25 44 39.4023 44 37.125V34.65C44 29.1844 39.5656 24.75 34.1 24.75ZM14.8758 23.5984C13.8789 22.6102 12.5125 22 11 22H5.5C2.46641 22 0 24.4664 0 27.5V30.25C0 31.7711 1.22891 33 2.75 33H8.41328C8.95469 28.9266 11.4125 25.4977 14.8758 23.5984Z"
        fill="white"
      />
    </svg>
  ),
  "Vision & Growth": (
    // Rocket / Growth icon
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white">
      <path d="M5.05 20.05a7.002 7.002 0 011.9-1.05L9 18l-2-2-1.05 2.05a7.002 7.002 0 01-1.9 1.9l1.95 1.1zm6.45-12.9l1.4-1.4a2.5 2.5 0 013.54 3.54l-1.4 1.4-3.54-3.54zM4.93 13.07l6-6 3.54 3.54-6 6H4.93v-3.54zM19 3a1 1 0 011 1v5.586a2 2 0 01-.586 1.414l-7.414 7.414A2 2 0 0111 19H6a1 1 0 01-1-1v-5c0-.265.105-.52.293-.707l9.414-9.414A2 2 0 0116.414 2H19z" />
    </svg>
  ),
};

const Contact = () => {
  const cards = [
    {
      title: "Professional Background",
      text: "I bring a solid foundation of technical and professional experience...",
      color: "bg-teal-400 shadow-teal-500/40",
    },
    {
      title: "Collaborative & Reliable",
      text: "I thrive in team settings and deliver consistent, reliable results...",
      color: "bg-rose-500 shadow-rose-500/40",
    },
    {
      title: "Vision & Growth",
      text: "I value continuous learning and always focus on growth...",
      color: "bg-sky-500 shadow-sky-500/40",
    },
  ];

  return (
    <div id="contact" className="sticky top-0">
      <div className="bg-custom-white min-h-8 w-full p-16 text-custom-yellow pb-48">
        <div className="text-4xl font-extrabold text-center">About Me</div>
      </div>

      <div className="h-72 bg-custom-obsidian p-16 m-6 rounded-xl">
        <div className="grid gap-14 md:grid-cols-3 md:gap-5">
          {cards.map((card, idx) => (
            <div key={idx} className="rounded-xl bg-white p-6 text-center shadow-xl -translate-y-48">
              <div className={`mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg ${card.color}`}>{icons[card.title]}</div>
              <h1 className="text-custom-yellow mb-3 text-xl font-bold md:px-14">{card.title}</h1>
              <p className="px-4 text-gray-500">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
