'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-gray-900 rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-purple-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
          <h1 className="text-2xl font-bold text-white">MeetingsADRES</h1>
        </div>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-purple-400 transition">
            Calendario
          </Link>
          <Link href="/meetings" className="text-white hover:text-purple-400 transition">
            Reuniones
          </Link>
          <Link href="/transcriptions" className="text-white hover:text-purple-400 transition">
            Transcripciones
          </Link>
          <Link href="/podcasts" className="text-white hover:text-purple-400 transition">
            Podcasts
          </Link>
        </div>
        
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16m-7 6h7" 
              />
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="mt-4 md:hidden">
          <div className="flex flex-col space-y-2">
            <Link href="/" className="text-white hover:text-purple-400 transition p-2">
              Calendario
            </Link>
            <Link href="/meetings" className="text-white hover:text-purple-400 transition p-2">
              Reuniones
            </Link>
            <Link href="/transcriptions" className="text-white hover:text-purple-400 transition p-2">
              Transcripciones
            </Link>
            <Link href="/podcasts" className="text-white hover:text-purple-400 transition p-2">
              Podcasts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
