'use client';

import Link from 'next/link';

function AdminSidebar() {

    return (

        <aside className="admin_sidebar">

            <h2>
                PureLeaf Admin
            </h2>

            <nav>

                <Link href="/admin/dashboard">
                    Dashboard
                </Link>

                <Link href="/admin/products">
                    Products
                </Link>

                <Link href="/admin/orders">
                    Orders
                </Link>

                <Link href="/admin/customers">
                    Customers
                </Link>

                <Link href="/admin/categories">
                    Categories
                </Link>

                <Link href="/admin/banners">
                    Banners
                </Link>

            </nav>

        </aside>
    );
}

export default AdminSidebar;