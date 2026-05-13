'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Banner() {
    return (
        <section className="main_banner">
            {/* Banner Image */}
            <Image
                src="/images/banner2.png"
                alt="soap banner"
                width={1920}
                height={900}
                priority
                className="banner_img"
            />

            {/* Banner Content */}
            <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="main_banner-content"
            >
                <h1>
                    Handcrafted Herbal Soaps for Gentle,
                    Natural Skin Care
                </h1>

                <p>
                    A collection of handcrafted herbal soaps
                    for radiant, healthy skin
                </p>

                <button>
                    Discover Your Glow

                    <Image
                        className="arrow_icon"
                        src="/images/right-arrow.png"
                        alt="arrow icon"
                        width={18}
                        height={18}
                    />
                </button>
            </motion.div>
        </section>
    );
}