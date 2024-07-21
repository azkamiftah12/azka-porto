"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isFaded, setIsFaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsFaded(true);
      } else {
        setIsFaded(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`flex items-center min-h-20 sticky top-1 m-6 rounded-md shadow-lg px-8 transition-opacity duration-500 ${isFaded ? 'opacity-50' : 'opacity-100'}`}>
      <Link href="/" passHref>
        <div className={`mr-4 text-lg hover:border-b-2 hover:border-custom-yellow ${pathname === '/' ? 'border-b-2 border-custom-yellow font-extrabold' : ''}`}>Home</div>
      </Link>
      <Link href="/about" passHref>
        <div className={`mr-4 text-lg hover:border-b-2 hover:border-custom-yellow ${pathname === '/about' ? 'border-b-2 border-custom-yellow font-extrabold' : ''}`}>About</div>
      </Link>
      {/* <div className="text-xl text-center font-extrabold mx-auto">
        Azka Muhammad
      </div> */}
    </nav>
  );
};

export default Navbar;

