'use client';
import { AlignLeft } from 'lucide-react';
import React, { useState } from 'react';
import SideMenu from './SideMenu';

const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <AlignLeft className="block hover:text-black hoverEffect cursor-pointer" />
      </button>
      <div className="block">
        <SideMenu
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </>
  );
};

export default MobileMenu;