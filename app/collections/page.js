'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import {
    collection,
    getDocs
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function CollectionsPage() {

    const [collections, setCollections] =
        useState([]);

    useEffect(() => {

        const fetchCollections =
            async () => {

                try {

                    const querySnapshot =
                        await getDocs(
                            collection(
                                db,
                                'collections'
                            )
                        );

                    const data = [];

                    querySnapshot.forEach((doc) => {

                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });

                    });

                    setCollections(data);

                } catch (error) {

                    console.log(error);

                }
            };

        fetchCollections();

    }, []);

    return (

        <section className="collections_page">

            <div className="container">

                <div className="section_heading">

                    <h1>
                        Herbal Soap Collections
                    </h1>

                    <p>
                        Explore our natural handmade soap collections.
                    </p>

                </div>

                <div className="collections_grid">

                    {collections.map((item) => (

                        <Link
                            key={item.id}
                            href={`/collections/${item.slug}`}
                            className="collection_card"
                        >

                            <div className="collection_img">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className="img-fluid"
                                />

                            </div>

                            <div className="collection_content">

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>
                                <p>
                                    {item.prise}
                                </p>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CollectionsPage;