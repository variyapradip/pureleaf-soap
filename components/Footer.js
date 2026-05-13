'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import { db } from '@/firebase/firebase';

import {
    doc,
    getDoc,
    collection,
    addDoc
} from 'firebase/firestore';

function Footer() {

    const [footer, setFooter] = useState(null);

    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

    // Fetch Footer Data
    useEffect(() => {

        const fetchFooter = async () => {

            try {

                const docRef = doc(
                    db,
                    'footer',
                    'content'
                );

                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {

                    setFooter(docSnap.data());

                }

            } catch (error) {

                console.log(error);

            }
        };

        fetchFooter();

    }, []);

    // Subscribe Function
    const handleSubscribe = async (e) => {

        e.preventDefault();

        if (!email) {

            setMessage(
                'Please enter your email'
            );

            return;

        }

        try {

            await addDoc(
                collection(
                    db,
                    'subscribers'
                ),
                {
                    email: email,
                    createdAt: new Date()
                }
            );

            setMessage(
                'Thank you for subscribing!'
            );

            setEmail('');

        } catch (error) {

            console.log(error);

            setMessage(
                'Something went wrong'
            );

        }
    };

    return (
        <footer className="footer">

            <div className="container">

                <div className="footer_top">

                    {/* Logo */}
                    <div className="footer_brand">

                        {footer?.logo && (

                            <Image
                                src={footer.logo}
                                alt="logo"
                                width={180}
                                height={60}
                            />

                        )}

                        <p>
                            {footer?.description}
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div className="footer_links">

                        <h4>
                            Quick Links
                        </h4>

                        {footer?.quickLinks?.map(
                            (link, index) => (

                                <Link
                                    key={index}
                                    href={link.url}
                                >
                                    {link.label}
                                </Link>

                            )
                        )}

                    </div>

                    {/* Collections */}
                    <div className="footer_links">

                        <h4>
                            Collections
                        </h4>

                        {footer?.collections?.map(
                            (item, index) => (

                                <Link
                                    key={index}
                                    href={item.url}
                                >
                                    {item.title}
                                </Link>

                            )
                        )}

                    </div>

                    {/* Newsletter */}
                    <div className="footer_newsletter">

                        <h4>
                            Stay Connected
                        </h4>

                        <p>
                            Subscribe for offers,
                            skincare tips &
                            new soap launches.
                        </p>

                        <form
                            onSubmit={handleSubscribe}
                            className="newsletter_form"
                        >

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                            <button type="submit">
                                Subscribe
                            </button>

                        </form>

                        {message && (

                            <p className="newsletter_message">
                                {message}
                            </p>

                        )}

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;