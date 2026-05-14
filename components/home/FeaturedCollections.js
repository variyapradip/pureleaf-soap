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

function FeaturedCollections() {

    const [products, setProducts] =
        useState([]);

    // FETCH COLLECTIONS
    useEffect(() => {

        const fetchProducts =
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

                    setProducts(data);

                } catch (error) {

                    console.log(error);

                }
            };

        fetchProducts();

    }, []);

    // ADD TO CART
    const handleAddToCart =
        async (product) => {

            try {

                // CHECK PRODUCT IN CART
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

                    // STOCK LIMIT CHECK
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

                    // OUT OF STOCK CHECK
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

                    // ADD NEW PRODUCT
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
                            quantity: 1,
                            stock: product.stock
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

        <section className="featured_collections">

            <div className="container">

                {/* SECTION TITLE */}
                <div className="section_heading">

                    <span>
                        Our Collection
                    </span>

                    <h2>
                        Featured Herbal Soaps
                    </h2>

                    <p>
                        Handmade herbal soaps crafted with natural ingredients for healthy glowing skin.
                    </p>

                </div>

                {/* PRODUCTS */}
                <div className="featured_grid">

                    {products.map((item) => (

                        <div
                            key={item.id}
                            className="featured_card"
                        >

                            {/* IMAGE */}
                            <Link
                                href={`/collections/${item.slug}`}
                                className="featured_img"
                            >

                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={500}
                                    height={500}
                                />

                            </Link>

                            {/* CONTENT */}
                            <div className="featured_content">

                                <h3>
                                    {item.title}
                                </h3>

                                <p>
                                    ₹ {item.price}
                                </p>

                                {/* STOCK */}
                                <span className="stock_text">

                                    Stock:
                                    {' '}
                                    {item.stock}

                                </span>

                                {/* BUTTON */}
                                <div className="featured_btns">

                                    <button
                                        className="cart_btn"
                                        onClick={() =>
                                            handleAddToCart(item)
                                        }
                                    >
                                        Add To Cart
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default FeaturedCollections;