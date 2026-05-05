'use client';

import Container from './Container';
import React from 'react';
import Logo from './Logo';  
import HeaderMenu from './HeaderMenu';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import FavoriteButton from './FavoriteButton';
import SignIn from './SignIn';
import MobileMenu from './MobileMenu';
import { useUser, UserButton, ClerkLoaded } from '@clerk/nextjs';

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white py-5">
      <Container className="flex items-center justify-between text-lightColor">
        
        <div className="w-auto md:w-1/3 flex items-center gap-2.5">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
          <SearchBar />
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