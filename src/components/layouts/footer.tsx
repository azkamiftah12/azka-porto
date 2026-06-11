// import Image from "next/image";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    // <footer className="flex items-center justify-center min-h-20 font-extrabold bg-custom-oil-black text-custom-yellow">Azka Miftah Muhammad</footer>
    <footer className="bg-custom-white md:grid md:grid-cols-5 px-16">
      {/* <div className="relative block h-32 md:col-span-2 md:h-full">
        <Image src={"/img/azka-1.jpg"} alt={"Azka Miftah Muhammad"} fill className="absolute inset-0 h-full w-full object-cover" />
      </div> */}

      {/* <div className="px-4 py-16 sm:px-6 md:col-span-4 md:px-8"> */}
      <div className="px-4 py-16 sm:px-6 md:col-span-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p>
              <span className="text-xs tracking-wide text-gray-500 uppercase"> Call me </span>

              <span className="block text-2xl font-medium text-custom-yellow font-bold hover:opacity-75 sm:text-3xl">+62 8788-6754-470</span>
            </p>

            {/* <ul className="mt-8 space-y-1 text-sm text-gray-700">
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul> */}

            <ul className="mt-8 flex gap-6">
              <li>
                <a href="https://wa.me/6287886754470?text=Hello%20Azka,%20I%20would%20like%20to%20know%20more%20about%20your%20services." rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Whatsapp</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.477 2 12c0 1.77.46 3.44 1.27 4.92L2 22l5.23-1.25A9.93 9.93 0 0012 22c5.52 0 10-4.477 10-10S17.52 2 12 2zm0 2c4.41 0 8 3.59 8 8 0 4.42-3.59 8-8 8-1.34 0-2.61-.33-3.73-.96l-.27-.15-3.09.74.66-3.02-.2-.31A7.93 7.93 0 014 12c0-4.41 3.59-8 8-8zm3.54 10.26c-.19-.1-1.13-.56-1.3-.62-.17-.07-.29-.1-.41.1-.12.19-.47.62-.58.74-.1.11-.21.12-.39.04-.19-.1-.8-.29-1.53-.93a5.72 5.72 0 01-1.07-1.33c-.11-.19-.01-.3.08-.39.08-.08.19-.21.29-.31.1-.11.13-.19.2-.31.06-.12.03-.23-.02-.32-.05-.1-.41-1-.56-1.36-.15-.36-.3-.31-.41-.32h-.35c-.12 0-.31.04-.47.23-.16.19-.62.6-.62 1.46 0 .86.63 1.7.72 1.82.1.12 1.24 1.9 3 2.66.42.18.75.29 1 .37.42.13.81.11 1.11.07.34-.05 1.13-.46 1.29-.9.16-.44.16-.82.11-.9-.05-.07-.17-.11-.36-.2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/azka-miftah-muhammad/" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Linkedin</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9.429 17.143H7.286V10h2.143v7.143zM8.357 9.048c-.69 0-1.19-.512-1.19-1.143 0-.647.514-1.143 1.19-1.143.69 0 1.19.496 1.19 1.143 0 .631-.5 1.143-1.19 1.143zm9 8.095h-2.142v-3.81c0-.952-.333-1.6-1.19-1.6-.65 0-1.048.444-1.219.873-.063.151-.079.36-.079.571v3.966H10.59V10h2.048v.984c.286-.46.794-1.127 1.937-1.127 1.413 0 2.782.889 2.782 3.016v4.27z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/azka_miftah/" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">Instagram</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://github.com/azkamiftah12" rel="noreferrer" target="_blank" className="text-gray-700 transition hover:opacity-75">
                  <span className="sr-only">GitHub</span>

                  <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-custom-yellow font-bold text-xl">Services</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Web Development
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Full Stack Development
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Frontend Development
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Backend Development
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    SEO Optimisation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-custom-yellow font-bold text-xl">Profile</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Projects
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:opacity-75">
                    Experiences
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-400 pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75">
                  Developer Notes
                </a>
              </li>

              {/* <li>
                <a href="#" className="text-gray-500 transition hover:opacity-75">
                  Privacy Policy
                </a>
              </li> */}
            </ul>

            <p className="mt-8 text-xs text-gray-500 sm:mt-0">&copy; 2025. Azka Miftah Muhammad.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
