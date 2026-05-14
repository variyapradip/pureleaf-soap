'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { db } from '@/firebase/firebase';

import {
    doc,
    getDoc
} from 'firebase/firestore';

export default function Banner() {

    const [banner, setBanner] = useState(null);

    useEffect(() => {

        const fetchBanner = async () => {

            try {

                const docRef = doc(
                    db,
                    'homepage',
                    'banner'
                );

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    console.log(
                        'Firebase Data:',
                        docSnap.data()
                    );

                    setBanner(docSnap.data());

                }

            } catch (error) {

                console.log(error);

            }
        };

        fetchBanner();

    }, []);

    return (
        <section className="main_banner">

            {/* Banner Image */}
            {banner?.image && (

                <Image
                    src={banner?.image}
                    alt="soap banner"
                    width={1920}
                    height={900}
                    priority
                    className="banner_img"
                />

            )}

            {/* Banner Content */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: -60 }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut'
                }}
                className="main_banner-content"
            >

                <h1>
                    {banner?.title}
                </h1>

                <p>
                    {banner?.subtitle}
                </p>

                <Link
                    href="/collections"
                    className="banner_btn"
                >

                    Discover Your Glow

                    <Image
                        src="/images/right-arrow.png"
                        alt="arrow icon"
                        width={18}
                        height={18}
                        className="arrow_icon"
                    />

                </Link>

            </motion.div>

        </section>
    );
}