'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Header() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`header ${isSticky ? 'top_header' : ''}`}>
            {/* Left Navigation */}
            <div className="nav_left">
                <div className="nav_drop">
                    <button className="nav_drop-head">
                        Soap
                    </button>

                    <div className="nav_drop-list">
                        <Link href="/collections" className="nav_drop-link">
                            All Collection
                        </Link>

                        <Link href="/" className="nav_drop-link">
                            Gift Boxes
                        </Link>

                        <Link href="/" className="nav_drop-link">
                            Return Gift
                        </Link>

                        <Link href="/" className="nav_drop-link">
                            Personal Soap
                        </Link>
                    </div>
                </div>

                <Link href="/" className="nav_link">
                    About
                </Link>
            </div>

            {/* Logo */}
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

            {/* Right Navigation */}
            <div className="nav_right">
                <Link href="/" className="nav_link">
                    Connect
                </Link>

                <Link href="/" className="nav_link">
                    Account
                </Link>

                <div className="cart_wrap">
                    <Image
                        className="img-fluid"
                        src="/images/cart.png"
                        alt="Cart"
                        width={28}
                        height={28}
                    />

                    <span className="cart_badge">
                        12
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;