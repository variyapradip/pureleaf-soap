'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import { db } from '@/firebase/firebase';

import {
    doc,
    getDoc,
    collection,
    addDoc,
    query,
    where,
    getDocs
} from 'firebase/firestore';

function Footer() {

    const [footer, setFooter] = useState(null);

    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');

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

    const handleSubscribe = async (e) => {

        e.preventDefault();

        if (!email) {

            setMessage(
                'Please enter your email'
            );

            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            setMessage(
                'Please enter valid email'
            );

            return;
        }

        try {

            const q = query(
                collection(db, 'subscribers'),
                where(
                    'email',
                    '==',
                    email.toLowerCase()
                )
            );

            const querySnapshot =
                await getDocs(q);

            if (!querySnapshot.empty) {

                setMessage(
                    'Email already subscribed'
                );

                return;
            }

            await addDoc(
                collection(db, 'subscribers'),
                {
                    email: email.toLowerCase(),
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