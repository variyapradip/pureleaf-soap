'use client';

import Image from 'next/image';

function Banner() {
    return (
        <section className="hero_banner">
            <div className="hero_content">
                <span className="hero_subtitle">
                    Handmade Herbal Soap
                </span>

                <h1 className="hero_title">
                    Pure Nature <br /> For Your Skin
                </h1>

                <p className="hero_text">
                    Discover handmade herbal soaps crafted with
                    aloe vera, turmeric, neem, and natural oils
                    for healthy glowing skin.
                </p>

                <button className="hero_btn">
                    Shop Collection
                </button>
            </div>

            <div className="hero_image">
                <Image
                    src="/images/pureleafsoap.png"
                    width={500}
                    height={500}
                    alt="PureLeaf Soap"
                    priority
                    className="banner_img"
                />
            </div>
        </section>
    );
}

export default Banner;