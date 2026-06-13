"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    setExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") {
      setExpanded(false);
      onChange("");
    }
  };

  const handleClear = () => {
    onChange("");
    inputRef.current?.focus();
  };

  // Auto-focus when expanded on mobile
  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  return (
    <>
      {/* ── Desktop search bar ───────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2 bg-white shadow-sm w-72 focus-within:border-shop-dark-green focus-within:shadow-md transition-all duration-300">
        <button onClick={handleSearch} className="shrink-0">
          <Search className="w-4 h-4 text-gray-400 hover:text-shop-dark-green transition" />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search jewellery..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full outline-none text-sm bg-transparent text-darkColor placeholder:text-gray-400"
        />

        {value && (
          <button onClick={handleClear} className="shrink-0">
            <X className="w-4 h-4 text-gray-400 hover:text-red-400 transition" />
          </button>
        )}
      </div>

      {/* ── Mobile search icon + expandable bar ─────────────────────── */}
      <div className="flex md:hidden items-center">
        {!expanded ? (
          <button
            onClick={() => setExpanded(true)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        ) : (
          <div className="fixed inset-x-0 top-0 z-50 bg-white px-4 py-3 shadow-lg flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />

            <input
              ref={inputRef}
              type="text"
              placeholder="Search jewellery..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-sm text-darkColor placeholder:text-gray-400"
            />

            {value && (
              <button onClick={handleClear}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}

            <button
              onClick={() => { setExpanded(false); onChange(""); }}
              className="text-sm text-gray-500 font-medium"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;