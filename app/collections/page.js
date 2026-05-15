'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import Image from 'next/image';

import toast from 'react-hot-toast';

import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    updateDoc,
    doc
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function CollectionsPage() {

    const [collections, setCollections] =
        useState([]);

    // FILTER STATE
    const [selectedCategory,
        setSelectedCategory] =
        useState('All');

    // FETCH COLLECTIONS
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

                    querySnapshot.forEach((docItem) => {

                        data.push({

                            id: docItem.id,

                            ...docItem.data()

                        });

                    });

                    setCollections(data);

                } catch (error) {

                    console.log(error);

                }
            };

        fetchCollections();

    }, []);

    // UNIQUE CATEGORIES
    const categories = [

        'All',

        ...new Set(

            collections.map(
                (item) =>
                    item.category
            )

        )

    ];

    // FILTERED PRODUCTS
    const filteredCollections =

        selectedCategory === 'All'

            ? collections

            : collections.filter(

                (item) =>

                    item.category ===
                    selectedCategory

            );

    // ADD TO CART
    const handleAddToCart =
        async (
            e,
            product
        ) => {

            e.preventDefault();

            try {

                const q = query(

                    collection(
                        db,
                        'cart'
                    ),

                    where(
                        'slug',
                        '==',
                        product.slug
                    )

                );

                const querySnapshot =
                    await getDocs(q);

                // PRODUCT EXISTS
                if (!querySnapshot.empty) {

                    const existingDoc =
                        querySnapshot.docs[0];

                    const existingData =
                        existingDoc.data();

                    // STOCK LIMIT
                    if (

                        Number(existingData.quantity)
                        >=
                        Number(product.stock)

                    ) {

                        toast(

                            `Only ${product.stock} items available in stock`,

                            {
                                icon: '⚠️',

                                style: {
                                    borderRadius: '12px',
                                    background: '#fff7ed',
                                    color: '#ea580c',
                                    border: '1px solid #fdba74',
                                    padding: '14px 18px'
                                }
                            }

                        );

                        return;
                    }

                    // UPDATE QUANTITY
                    await updateDoc(

                        doc(
                            db,
                            'cart',
                            existingDoc.id
                        ),

                        {
                            quantity:
                                existingData.quantity + 1
                        }

                    );

                    toast.success(
                        'Cart quantity updated'
                    );

                }

                // NEW PRODUCT
                else {

                    // OUT OF STOCK
                    if (
                        Number(product.stock) <= 0
                    ) {

                        toast(

                            'Product out of stock',

                            {
                                icon: '⚠️',

                                style: {
                                    borderRadius: '12px',
                                    background: '#fff7ed',
                                    color: '#ea580c',
                                    border: '1px solid #fdba74',
                                    padding: '14px 18px'
                                }
                            }

                        );

                        return;
                    }

                    // ADD PRODUCT
                    await addDoc(

                        collection(
                            db,
                            'cart'
                        ),

                        {
                            title: product.title,
                            price: product.price,
                            image: product.image,
                            slug: product.slug,
                            stock: product.stock,
                            quantity: 1
                        }

                    );

                    toast.success(
                        'Product added to cart'
                    );

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    'Something went wrong'
                );

            }
        };

    return (

        <section className="collections_page">

            <div className="container">

                {/* HEADING */}
                <div className="section_heading">

                    <h1>
                        Herbal Soap Collections
                    </h1>

                    <p>
                        Explore our natural handmade soap collections.
                    </p>

                </div>

                {/* FILTER BUTTONS */}
                <div className="filter_wrap">

                    {categories.map((category) => (

                        <button
                            key={category}
                            className={`filter_btn ${

                                selectedCategory === category
                                    ? 'active'
                                    : ''

                            }`}
                            onClick={() =>
                                setSelectedCategory(
                                    category
                                )
                            }
                        >

                            {category}

                        </button>

                    ))}

                </div>

                {/* COLLECTION GRID */}
                <div className="collections_grid">

                    {filteredCollections.map((item) => (

                        <Link
                            key={item.id}
                            href={`/collections/${item.slug}`}
                            className="collection_card"
                        >

                            {/* IMAGE */}
                            <div className="collection_img">

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                    className="img-fluid"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="collection_content">

                                <span className="category_badge">

                                    {item.category}

                                </span>

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    {item.description}
                                </p>

                                <h4>
                                    ₹ {item.price}
                                </h4>

                                {/* BUTTON */}
                                <div className="collection_btns">

                                    <button
                                        className="cart_btn"
                                        onClick={(e) =>
                                            handleAddToCart(
                                                e,
                                                item
                                            )
                                        }
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default CollectionsPage;