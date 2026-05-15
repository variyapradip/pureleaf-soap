'use client';

import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import {
    useRouter
} from 'next/navigation';

import {
    onAuthStateChanged
} from 'firebase/auth';

import { auth } from '@/firebase/firebase';

function AdminLayout({ children }) {

    const router = useRouter();

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const unsubscribe =
            onAuthStateChanged(

                auth,

                (user) => {

                    if (!user) {
                        router.push('/admin/login');
                    }

                    setLoading(false);
                }
            );

        return () => unsubscribe();

    }, []);

    if (loading) {

        return (
            <h2>
                Loading...
            </h2>
        );
    }

    return children;
}

export default AdminLayout;