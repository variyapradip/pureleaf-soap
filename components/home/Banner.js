'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

export default function Banner() {

    const [banner, setBanner] = useState(null);
    const [loading, setLoading] = useState(true);

    // FETCH ONLY FIRST BANNER
    useEffect(() => {

        const fetchBanner = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'homepage'));
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    setBanner({ id: doc.id, ...doc.data() });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBanner();

    }, []);

    // LOADING
    if (loading) {
        return (
            <section className="main_banner d-flex align-items-center justify-content-center">
                <div className="text-center py-5">
                    <div className="spinner-border text-light" role="status" />
                    <p className="mt-3 text-white">Loading...</p>
                </div>
            </section>
        );
    }

    // NO BANNER
    if (!banner) return null;

    return (
        <section className="main_banner position-relative overflow-hidden">

            <div className="banner_slide">

                {/* IMAGE */}
                <Image
                    src={banner.image}
                    alt={banner.title}
                    width={1920}
                    height={900}
                    priority
                    className="banner_img"
                />

                {/* OVERLAY */}
                <div className="banner_overlay" />

                {/* CONTENT */}
                <div className="main_banner-content container">
                    <div className="row">
                        <div className="col-lg-7">

                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="banner_tag"
                            >
                                Herbal Handmade Soap
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {banner.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {banner.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href={banner.buttonLink || '/collections'}
                                    className="banner_btn"
                                >
                                    {banner.buttonText || 'Shop Now'}
                                    <Image
                                        src="/images/right-arrow.png"
                                        alt="arrow"
                                        width={18}
                                        height={18}
                                        className="arrow_icon"
                                    />
                                </Link>
                            </motion.div>

                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}