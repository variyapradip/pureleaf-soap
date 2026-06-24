'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

function Header() {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    // STICKY HEADER
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // REALTIME CART COUNT
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'cart'),
            (snapshot) => {
                let totalItems = 0;
                snapshot.forEach((docItem) => {
                    const item = docItem.data();
                    totalItems += Number(item.quantity);
                });
                setCartCount(totalItems);
            }
        );
        return () => unsubscribe();
    }, []);

    // CLOSE MENU ON ROUTE CHANGE
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // PREVENT BODY SCROLL WHEN MENU IS OPEN
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <header
                className={`
                    header
                    ${isSticky ? 'top_header' : ''}
                    ${pathname === '/' ? 'home_header' : 'inner_header'}
                `}
            >
                {/* LEFT NAVIGATION — desktop only */}
                <div className="nav_left">
                    <div className="nav_drop">
                        <button className="nav_drop-head">Soap</button>
                        <div className="nav_drop-list">
                            <Link href="/collections" className="nav_drop-link">All Collection</Link>
                            <Link href="/" className="nav_drop-link">Gift Boxes</Link>
                            <Link href="/" className="nav_drop-link">Return Gift</Link>
                            <Link href="/" className="nav_drop-link">Personal Soap</Link>
                        </div>
                    </div>
                    <Link href="/" className="nav_link">About</Link>
                </div>

                {/* LOGO */}
                <div className="nav_center">
                    <Link href="/" className="main_logo">
                        <Image
                            className="img-fluid"
                            src="/images/pureleafsoap.png"
                            alt="PureLeaf Soap Logo"
                            width={180}
                            height={60}
                            priority
                        />
                    </Link>
                </div>

                {/* RIGHT NAVIGATION — desktop only */}
                <div className="nav_right">
                    <Link href="/" className="nav_link">Connect</Link>
                    <Link href="/" className="nav_link">Account</Link>

                    {/* CART */}
                    <Link href="/cart" className="cart_wrap">
                        <Image
                            className="img-fluid"
                            src="/images/cart.png"
                            alt="Cart"
                            width={28}
                            height={28}
                        />
                        <span className="cart_badge">{cartCount}</span>
                    </Link>
                </div>

                {/* MOBILE RIGHT — cart + burger */}
                <div className="nav_mobile_right">
                    <Link href="/cart" className="cart_wrap">
                        <Image
                            className="img-fluid"
                            src="/images/cart.png"
                            alt="Cart"
                            width={28}
                            height={28}
                        />
                        <span className="cart_badge">{cartCount}</span>
                    </Link>

                    <button
                        className={`burger_btn ${menuOpen ? 'burger_btn--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <span className="burger_line" />
                        <span className="burger_line" />
                        <span className="burger_line" />
                    </button>
                </div>
            </header>

            {/* MOBILE DRAWER OVERLAY */}
            {menuOpen && (
                <div
                    className="drawer_overlay"
                    onClick={() => setMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* MOBILE DRAWER */}
            <nav className={`mobile_drawer ${menuOpen ? 'mobile_drawer--open' : ''}`} aria-label="Mobile navigation">
                <div className="drawer_header">
                    <Link href="/" className="main_logo" onClick={() => setMenuOpen(false)}>
                        <Image
                            src="/images/pureleafsoap.png"
                            alt="PureLeaf Soap Logo"
                            width={140}
                            height={46}
                            priority
                        />
                    </Link>
                    <button
                        className="drawer_close"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                <div className="drawer_nav">
                    <p className="drawer_category">Soap</p>
                    <Link href="/collections" className="drawer_link" onClick={() => setMenuOpen(false)}>All Collection</Link>
                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>Gift Boxes</Link>
                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>Return Gift</Link>
                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>Personal Soap</Link>

                    <div className="drawer_divider" />

                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>Connect</Link>
                    <Link href="/" className="drawer_link" onClick={() => setMenuOpen(false)}>Account</Link>
                </div>
            </nav>

           
        </>
    );
}

export default Header;
