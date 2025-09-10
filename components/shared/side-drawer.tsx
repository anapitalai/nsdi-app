"use client";
import Link from "next/link";
import { useState } from "react";

export default function SideDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-white border rounded-full shadow p-2 hover:bg-orange-100"
        onClick={() => setOpen(o => !o)}
        aria-label="Open navigation menu"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />
      )}
      <nav
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <span className="font-bold text-lg text-orange-500">Menu</span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-gray-400 hover:text-orange-500">
            ×
          </button>
        </div>
        <ul className="mt-4 space-y-2 px-4">
          <li>
            <Link href="/satellite-map" className="block px-3 py-2 rounded hover:bg-orange-50 text-gray-800 font-medium" onClick={() => setOpen(false)}>
              🗺️ Map
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
