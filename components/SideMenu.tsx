'use client';
import React from 'react';
import { headerData } from '@/constants/data';
import Link from 'next/link';
import Logo from './Logo';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation'; 
import SocialMedia from './SocialMedia';
import { useOutsideClick } from '@/hooks';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname(); 
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose)

  return (
    <div
      onClick={onClose}
      className={`fixed inset-y-0 left-0 z-50 w-full h-screen bg-black/50 text-white/70 shadow-xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300`}
    >
      <div ref={sidebarRef}
      
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop-light-green flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />
          
          <button
            onClick={onClose}
            className="hover:text-shop-light-green hoverEffect"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => {
            const isActive = pathname === item?.href;

            return (
              <Link
                href={item?.href}
                key={item?.title}
                className={`hover:text-shop-light-green hoverEffect ${
                  isActive ? "text-white" : ""
                }`}
              >
                {item?.title}
              </Link>
            );
          })}
        </div>
        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;