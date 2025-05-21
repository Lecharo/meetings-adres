'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Calendario', path: '/calendar' },
    { name: 'Reuniones', path: '/meetings' },
    { name: 'Transcripciones', path: '/transcriptions' },
    { name: 'Podcasts', path: '/podcasts' },
  ];

  return (
    <nav className="navigation">
      <div className="logo">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image src="/Logo_Adres.png" alt="Logo ADRES" width={50} height={50} />
          <h1>MeetingsADRES</h1>
        </Link>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link 
              href={item.path} 
              className={pathname === item.path ? 'active' : ''}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
