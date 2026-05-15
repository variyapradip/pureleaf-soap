'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import { motion, AnimatePresence } from 'framer-motion';

import {
    collection,
    onSnapshot
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

export default function Banner() {

    const [banners, setBanners] =
        useState([]);

    const [currentSlide, setCurrentSlide] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    // FETCH ALL BANNERS
    useEffect(() => {

        const unsubscribe =
            onSnapshot(

                collection(
                    db,
                    'homepage'
                ),

                (snapshot) => {

                    const data = [];

                    snapshot.forEach((docItem) => {

                        data.push({

                            id: docItem.id,

                            ...docItem.data()

                        });

                    });

                    setBanners(data);

                    setLoading(false);

                },

                (error) => {

                    console.log(error);

                    setLoading(false);

                }

            );

        return () => unsubscribe();

    }, []);

    // AUTO SLIDER
    useEffect(() => {

        if (banners.length <= 1) return;

        const interval = setInterval(() => {

            setCurrentSlide((prev) =>

                prev === banners.length - 1
                    ? 0
                    : prev + 1

            );

        }, 5000);

        return () => clearInterval(interval);

    }, [banners]);

    // LOADING
    if (loading) {

        return (

            <section className="main_banner d-flex align-items-center justify-content-center">

                <div className="text-center py-5">

                    <div
                        className="spinner-border text-light"
                        role="status"
                    />

                    <p className="mt-3 text-white">
                        Loading banners...
                    </p>

                </div>

            </section>

        );
    }

    // NO BANNERS
    if (banners.length === 0) {

        return null;

    }

    return (

        <section className="main_banner position-relative overflow-hidden">

            <AnimatePresence mode="wait">

                <motion.div
                    key={banners[currentSlide]?.id}
                    initial={{
                        opacity: 0,
                        scale: 1.05
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.8
                    }}
                    className="banner_slide"
                >

                    {/* IMAGE */}
                    <Image
                        src={
                            banners[currentSlide]?.image
                        }
                        alt={
                            banners[currentSlide]?.title
                        }
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
                                    initial={{
                                        opacity: 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay: 0.2
                                    }}
                                    className="banner_tag"
                                >

                                    Herbal Handmade Soap

                                </motion.span>

                                <motion.h1
                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay: 0.3
                                    }}
                                >

                                    {
                                        banners[currentSlide]?.title
                                    }

                                </motion.h1>

                                <motion.p
                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay: 0.4
                                    }}
                                >

                                    {
                                        banners[currentSlide]?.subtitle
                                    }

                                </motion.p>

                                {/* BUTTON */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 30
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}
                                    transition={{
                                        delay: 0.5
                                    }}
                                >

                                    <Link
                                        href={
                                            banners[currentSlide]?.buttonLink
                                            ||
                                            '/collections'
                                        }
                                        className="banner_btn"
                                    >

                                        {
                                            banners[currentSlide]?.buttonText
                                            ||
                                            'Shop Now'
                                        }

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

                </motion.div>

            </AnimatePresence>

            {/* SLIDER DOTS */}
            <div className="banner_dots">

                {banners.map((_, index) => (

                    <button
                        key={index}
                        className={
                            currentSlide === index
                                ? 'dot active'
                                : 'dot'
                        }
                        onClick={() =>
                            setCurrentSlide(index)
                        }
                    />

                ))}

            </div>

        </section>
    );
}