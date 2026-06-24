'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ingredients = [
    {
        name: 'Shea Butter',
        origin: 'West Africa',
        benefit: 'Deep moisture that lasts all day without clogging pores.',
        icon: '🌿',
        color: '#f5f5f5',
    },
    {
        name: 'Neem Oil',
        origin: 'India',
        benefit: 'Ancient antibacterial that calms irritated, acne-prone skin.',
        icon: '🍃',
        color: '#eeeeee',
    },
    {
        name: 'Turmeric',
        origin: 'Kerala, India',
        benefit: 'Brightens skin tone and reduces dark spots naturally.',
        icon: '🌾',
        color: '#f5f5f5',
    },
    {
        name: 'Coconut Oil',
        origin: 'Kerala, India',
        benefit: 'Rich lather that cleanses deeply while keeping skin soft.',
        icon: '🥥',
        color: '#eeeeee',
    },
    {
        name: 'Lavender',
        origin: 'Himalayan Foothills',
        benefit: 'Soothes the senses and gently heals sensitive skin.',
        icon: '💜',
        color: '#f5f5f5',
    },
    {
        name: 'Activated Charcoal',
        origin: 'Coconut Shell',
        benefit: 'Draws out impurities and unclogs pores like a magnet.',
        icon: '🖤',
        color: '#eeeeee',
    },
];

export default function AboutPage() {
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.15 }
        );

        cardsRef.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <main className="about_page">

                {/* ── HERO ── */}
                <section className="about_hero">
                    <div className="hero_leaf hero_leaf--1">🌿</div>
                    <div className="hero_leaf hero_leaf--2">🍃</div>
                    <div className="hero_inner">
                        <p className="hero_eyebrow">Pure · Natural · Handcrafted</p>
                        <h1 className="hero_title">
                            Soap made the way<br />
                            <em>nature intended.</em>
                        </h1>
                        <p className="hero_sub">
                            Every PureLeaf bar starts with one question — <br />
                            <strong>would you find this ingredient in a forest?</strong><br />
                            If the answer is no, it doesn't go in.
                        </p>
                        <Link href="/collections" className="hero_cta">
                            Explore Our Soaps
                        </Link>
                    </div>
                    <div className="hero_scroll_hint">↓</div>
                </section>

                {/* ── PROMISE STRIP ── */}
                <section className="promise_strip">
                    {['Zero Sulphates', 'No Parabens', 'Cruelty Free', 'Handcrafted in India'].map((p) => (
                        <span key={p} className="promise_item">
                            <span className="promise_dot" />
                            {p}
                        </span>
                    ))}
                </section>

                {/* ── INTRO ── */}
                <section className="about_intro">
                    <div
                        className="intro_card fade_in"
                        ref={(el) => (cardsRef.current[0] = el)}
                    >
                        <span className="intro_leaf">🌱</span>
                        <p className="intro_text">
                            We started PureLeaf because we couldn't find a soap that was
                            genuinely honest — one where every ingredient had a reason to
                            be there. So we went back to basics: cold-pressed oils, plant
                            botanicals, and recipes passed down through generations of
                            Ayurvedic tradition.
                        </p>
                        <p className="intro_text">
                            What you lather onto your skin every morning matters. We make
                            sure it's nothing but good.
                        </p>
                    </div>
                </section>

                {/* ── INGREDIENTS ── */}
                <section className="ingredients_section">
                    <div className="section_head">
                        <p className="section_eyebrow">What's inside</p>
                        <h2 className="section_title">Our Ingredients</h2>
                        <p className="section_sub">
                            Sourced carefully. Used purposefully. Nothing hidden.
                        </p>
                    </div>

                    <div className="ingredients_grid">
                        {ingredients.map((item, i) => (
                            <div
                                key={item.name}
                                className="ingredient_card fade_in"
                                ref={(el) => (cardsRef.current[i + 1] = el)}
                                style={{ '--card-bg': item.color, '--delay': `${i * 80}ms` }}
                            >
                                <div className="ingredient_icon">{item.icon}</div>
                                <div className="ingredient_body">
                                    <h3 className="ingredient_name">{item.name}</h3>
                                    <p className="ingredient_origin">From {item.origin}</p>
                                    <p className="ingredient_benefit">{item.benefit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CRAFT SECTION ── */}
                <section
                    className="craft_section fade_in"
                    ref={(el) => (cardsRef.current[ingredients.length + 2] = el)}
                >
                    <div className="craft_text">
                        <p className="section_eyebrow">How we make it</p>
                        <h2 className="section_title">Cold Process.<br />Slow Cure.</h2>
                        <p className="craft_body">
                            Unlike mass-produced soaps, every PureLeaf bar is cold-process
                            crafted — meaning we never use heat that strips away the natural
                            glycerin. Each bar then cures for 4–6 weeks so the oils fully
                            saponify and the lather becomes silk-smooth.
                        </p>
                        <p className="craft_body">
                            You can't rush good soap. We don't.
                        </p>
                    </div>
                    <div className="craft_stats">
                        <div className="stat_item">
                            <span className="stat_number">6</span>
                            <span className="stat_label">Weeks cured</span>
                        </div>
                        <div className="stat_item">
                            <span className="stat_number">0</span>
                            <span className="stat_label">Artificial fragrances</span>
                        </div>
                        <div className="stat_item">
                            <span className="stat_number">100%</span>
                            <span className="stat_label">Plant-based</span>
                        </div>
                    </div>
                </section>

                {/* ── CTA BANNER ── */}
                <section className="cta_banner">
                    <div className="cta_inner">
                        <h2 className="cta_title">Skin that feels like a forest walk.</h2>
                        <p className="cta_sub">Find your perfect PureLeaf bar today.</p>
                        <Link href="/collections" className="cta_btn">
                            Shop All Soaps
                        </Link>
                    </div>
                </section>

            </main>


       
        </>
    );
}
