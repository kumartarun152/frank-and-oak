"use client";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { BsHeart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import LoginForm from "./LoginForm";
import Link from "next/link";
import Offcanvas from "./Offcanvas";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [ifCookie, setIfCookie] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { wishList } = useSelector((state) => state.wishList);

  const router = useRouter();
  let pathName = usePathname();

  const handleAccountClick = () => {
    if (ifCookie) {
      setShowLogin(false);
      pathName !== "/account/account-settings"
        ? router.push("/account/account-settings", undefined, { shallow: true })
        : "#";
    } else {
      setShowLogin(true);
    }
  };

  useEffect(() => {
    const cookie = Cookies.get("token");
    if (!cookie) {
      // alert("no cookies");
      setShowLogin(true);
      setIfCookie(false);
      router.push("/");
    } else {
      setIsMounted(true);
      setIfCookie(true);
    }
  }, [router]);
  if (!isMounted) {
    return null;
  }
  return (
    <header className="w-full h-[50px] border-b grid grid-cols-[10%_70%_20%] p-[0_30px] justify-between fixed top-0 z-50 bg-white">
      <div>
        <Link href="/" key="home-link">
          <span className="font-extrabold flex h-full items-center justify-center cursor-pointer ">
            Frank and Oak
          </span>
        </Link>
      </div>
      <div>
        <ul className="list-none w-full flex h-full items-center gap-[25px] px-[25px] ">
          <Link href="/shop-now/" key="shop-now-link">
            <li className="text-[#ed2e00] cursor-pointer">Shop now</li>
          </Link>
          {/* <li className=" cursor-pointer">Women</li> */}
          {/* <li className=" cursor-pointer">Men</li> */}
          <Link href="/our-story" key="story-link">
            <li className=" cursor-pointer">Our Story</li>
          </Link>
        </ul>
      </div>
      <div>
        <ul className="list-none w-full flex h-full items-center justify-end gap-[25px] px-[20px]">
          {/* <li className="cursor-pointer text-[20px]">
            <GoSearch />
          </li> */}
          <li
            className="cursor-pointer text-[20px] relative"
            onClick={handleAccountClick}
          >
            <VscAccount />
          </li>
          <Link href="/account/wishlist">
            <li className="cursor-pointer text-[20px] flex gap-[5px]">
              <BsHeart className="inline-block" />
              <sup className="w-[20px] h-[20px] bg-black text-white rounded-[50%] text-[13px] p-[10px_5px] box-border text-center">
                {wishList.length}
              </sup>
            </li>
          </Link>
          <li className="cursor-pointer text-[20px]">
            <IoBagOutline onClick={() => setShowOffcanvas(true)} />
          </li>
        </ul>
      </div>
      {/* Login Modal */}
      <div
        className={
          showLogin
            ? "w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 p-0 m-0 absolute"
            : "hidden"
        }
      >
        <LoginForm close={setShowLogin} />
      </div>
      {/* Offcanvas */}
      <div
        className={
          showOffcanvas
            ? "w-[100%] h-[100vh] bg-[rgba(0,0,0,0.5)] z-50 p-0 m-0 absolute"
            : "hidden"
        }
      >
        <Offcanvas close={setShowOffcanvas} />
      </div>
    </header>
  );
};

export default Header;
