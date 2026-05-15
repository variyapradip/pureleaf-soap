'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Toaster } from 'react-hot-toast';

import {
    useRouter,
    usePathname
} from 'next/navigation';

import {
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import { auth } from '@/firebase/firebase';

function AdminLayout({ children }) {

    const router = useRouter();

    const pathname = usePathname();

    const [loading, setLoading] =
        useState(true);

    const [adminUser, setAdminUser] =
        useState(null);

    // CHECK ADMIN LOGIN
    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(

                auth,

                (user) => {

                    // LOGIN PAGE ACCESS
                    if (
                        !user &&
                        pathname !== '/admin/login'
                    ) {

                        router.push(
                            '/admin/login'
                        );

                    }

                    // REDIRECT AFTER LOGIN
                    if (
                        user &&
                        pathname === '/admin/login'
                    ) {

                        router.push(
                            '/admin/dashboard'
                        );

                    }

                    setAdminUser(user);

                    setLoading(false);

                }

            );

        return () => unsubscribe();

    }, [pathname, router]);

    // LOGOUT
    const handleLogout =
        async () => {

            try {

                await signOut(auth);

                router.push(
                    '/admin/login'
                );

            } catch (error) {

                console.log(error);

            }
        };

    // LOADING SCREEN
    if (loading) {

        return (

            <div className="admin_loading">

                <h2>
                    Loading Admin Panel...
                </h2>

            </div>

        );
    }

    // LOGIN PAGE WITHOUT SIDEBAR
    if (pathname === '/admin/login') {

        return (
            <>
                <Toaster
                    position="top-right"
                />

                {children}
            </>
        );
    }

    return (

        <div className="admin_layout">

            {/* TOASTER */}
            <Toaster
                position="top-right"
            />

            {/* SIDEBAR */}
            <aside className="admin_sidebar">

                <div className="admin_logo">

                    <h2>
                        PureLeaf Admin
                    </h2>

                </div>

                <nav className="admin_nav">

                    <Link
                        href="/admin/dashboard"
                        className={`admin_link ${
                            pathname === '/admin/dashboard'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/admin/products"
                        className={`admin_link ${
                            pathname === '/admin/products'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Products
                    </Link>

                    <Link
                        href="/admin/orders"
                        className={`admin_link ${
                            pathname === '/admin/orders'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Orders
                    </Link>

                    <Link
                        href="/admin/customers"
                        className={`admin_link ${
                            pathname === '/admin/customers'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Customers
                    </Link>

                    <Link
                        href="/admin/categories"
                        className={`admin_link ${
                            pathname === '/admin/categories'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Categories
                    </Link>

                    <Link
                        href="/admin/banners"
                        className={`admin_link ${
                            pathname === '/admin/banners'
                                ? 'active'
                                : ''
                        }`}
                    >
                        Banners
                    </Link>

                </nav>

                {/* ADMIN INFO */}
                <div className="admin_bottom">

                    <p>
                        {adminUser?.email}
                    </p>

                    <button
                        onClick={handleLogout}
                        className="logout_btn"
                    >
                        Logout
                    </button>

                </div>

            </aside>

            {/* MAIN CONTENT */}
            <main className="admin_main">

                {children}

            </main>

        </div>

    );
}

export default AdminLayout;