"use client";

import Container from "./Container";
import React, { useState } from "react";
import Logo from "./Logo";
import HeaderMenu from "./HeaderMenu";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import FavoriteButton from "./FavoriteButton";
import SignIn from "./SignIn";
import MobileMenu from "./MobileMenu";
import { useUser, UserButton, ClerkLoaded } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useUser();
  const [search, setSearch] = useState("");

  return (
    <header className="bg-white py-5 sticky top-0 z-40 shadow-sm">
      <Container className="flex items-center justify-between text-lightColor">

        <div className="w-auto md:w-1/3 flex items-center gap-2.5">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar
            value={search}
            onChange={(val) => setSearch(val)}
          />

          <CartIcon />
          <FavoriteButton />

          <ClerkLoaded>
            {isSignedIn ? <UserButton /> : <SignIn />}
          </ClerkLoaded>
        </div>

      </Container>
    </header>
  );
};

export default Header;