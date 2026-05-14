'use client';

import Link from 'next/link';

import {
    FaHome,
    FaBox,
    FaEnvelope,
    FaImage
} from 'react-icons/fa';

function Sidebar() {

    return (
        <aside className="admin_sidebar">

            <h2>
                PureLeaf Admin
            </h2>

            <nav>

                <Link href="/admin">
                    <FaHome /> Dashboard
                </Link>

                <Link href="/admin/banner">
                    <FaImage /> Banner
                </Link>

                <Link href="/admin/products">
                    <FaBox /> Products
                </Link>

                <Link href="/admin/subscribers">
                    <FaEnvelope /> Subscribers
                </Link>

            </nav>

        </aside>
    );
}

export default Sidebar;