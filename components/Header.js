'use client';

import Link from 'next/link';
import Image from 'next/image';

function Header() {
    return (
        <header className="header">
            <div className="nav_center">
                <Link href="/">
                    <Image
                        src="/images/pureleafsoap.png"
                        alt="PureLeaf Soap"
                        width={180}
                        height={60}
                    />
                </Link>
            </div>
        </header>
    );
}

export default Header;