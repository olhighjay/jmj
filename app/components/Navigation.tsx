'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

const navItems = [
    { href: '/', label: 'The Oluwasemowo Legacy' },
    { href: '/', label: 'The JMJ' },
    { href: '/jmj-saint-felicia', label: 'JMJ & Saint Felicia' },
    { href: '/photo-gallery', label: 'Photo Gallery' },
    { href: '/tributes', label: 'Tributes' },
    { href: '/funeral-details', label: 'Funeral and Thanksgiving Details' },
];

export function Navigation() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-red-100">
            <div className="container mx-auto px-4">
                <div className="flex md:flex-wrap items-center justify-between py-4">
                    {/* Logo/Brand */}
                    <div className='flex items-center gap-2'>
                        <Image src="/images/logo/jmj2.png" alt="The Oluwasemowo Legacy" width={48} height={48} />
                        <Link
                            href="/"
                            className="text-xl md:text-2xl font-bold text-red-800 hover:text-red-900 transition-colors"
                            onClick={closeMobileMenu}
                        >
                            The Oluwasemowo Legacy
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex gap-4">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href
                                    ? 'text-red-700 border-b-2 border-red-700'
                                    : 'text-gray-700 hover:text-red-700'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-gray-700 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-2 border-t border-gray-200 mt-2">
                        {navItems.slice(1).map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className={`block px-4 py-3 text-base font-medium transition-colors rounded-md ${pathname === item.href
                                    ? 'text-red-700 bg-red-50 border-l-4 border-red-700'
                                    : 'text-gray-700 hover:text-red-700 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

