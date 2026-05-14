'use client';

import { useEffect, useState } from 'react';

import {
    doc,
    getDoc,
    updateDoc
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function BannerAdmin() {

    const [title, setTitle] =
        useState('');

    const [subtitle, setSubtitle] =
        useState('');

    useEffect(() => {

        const fetchBanner =
            async () => {

                const docRef = doc(
                    db,
                    'homepage',
                    'banner'
                );

                const docSnap =
                    await getDoc(docRef);

                if (docSnap.exists()) {

                    const data =
                        docSnap.data();

                    setTitle(data.title);

                    setSubtitle(
                        data.subtitle
                    );
                }
            };

        fetchBanner();

    }, []);

    const handleUpdate =
        async (e) => {

            e.preventDefault();

            try {

                await updateDoc(
                    doc(
                        db,
                        'homepage',
                        'banner'
                    ),
                    {
                        title,
                        subtitle
                    }
                );

                alert(
                    'Banner Updated'
                );

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <div>

            <h1>
                Banner Admin
            </h1>

            <form
                onSubmit={handleUpdate}
            >

                <input
                    type="text"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <textarea
                    value={subtitle}
                    onChange={(e) =>
                        setSubtitle(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Update Banner
                </button>

            </form>

        </div>
    );
}

export default BannerAdmin;