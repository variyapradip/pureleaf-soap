'use client';

import { use } from 'react';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import Image from 'next/image';

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

function CollectionDetailPage({ params }) {

    // UNWRAP PARAMS
    const resolvedParams = use(params);

    const slug = resolvedParams.slug;

    const router = useRouter();

    const [product, setProduct] =
        useState(null);

    // FETCH PRODUCT
    useEffect(() => {

        if (!slug) return;

        const fetchProduct =
            async () => {

                try {

                    const q = query(

                        collection(
                            db,
                            'collections'
                        ),

                        where(
                            'slug',
                            '==',
                            slug
                        )

                    );

                    const querySnapshot =
                        await getDocs(q);

                    querySnapshot.forEach((doc) => {

                        const productData = {

                            id: doc.id,

                            ...doc.data()

                        };

                        console.log(
                            'Firebase Product:',
                            productData
                        );

                        setProduct(productData);

                    });

                } catch (error) {

                    console.log(error);

                    toast.error(
                        'Failed to load product'
                    );

                }
            };

        fetchProduct();

    }, [slug]);

    // ADD TO CART
    const handleAddToCart =
        async () => {

            try {

                // CHECK EXISTING PRODUCT
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

                // PRODUCT ALREADY EXISTS
                if (!querySnapshot.empty) {

                    const existingDoc =
                        querySnapshot.docs[0];

                    const existingData =
                        existingDoc.data();

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

                    // CUSTOM TOAST
                    toast((t) => (

                        <div className="cart_toast">

                            <p>
                                Cart quantity updated
                            </p>

                            <button
                                onClick={() => {

                                    toast.dismiss(t.id);

                                    router.push('/cart');

                                }}
                            >
                                View Cart
                            </button>

                        </div>

                    ));

                }

                // NEW PRODUCT
                else {

                    await addDoc(

                        collection(
                            db,
                            'cart'
                        ),

                        {
                            title: product.title,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                            slug: product.slug
                        }

                    );

                    // CUSTOM TOAST
                    toast((t) => (

                        <div className="cart_toast">

                            <p>
                                Product added to cart
                            </p>

                            <button
                                onClick={() => {

                                    toast.dismiss(t.id);

                                    router.push('/cart');

                                }}
                            >
                                View Cart
                            </button>

                        </div>

                    ));

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    'Something went wrong'
                );

            }
        };

    // LOADING
    if (!product) {

        return (
            <h2>
                Loading...
            </h2>
        );
    }

    return (

        <section className="product_detail">

            <div className="container">

                <div className="product_detail-wrap">

                    {/* PRODUCT IMAGE */}
                    <div className="product_detail-img">

                        <Image
                            src={product.image}
                            alt={product.title}
                            width={700}
                            height={700}
                        />

                    </div>

                    {/* PRODUCT CONTENT */}
                    <div className="product_detail-content">

                        <span className="product_tag">
                            Herbal Soap
                        </span>

                        <h1>
                            {product.title}
                        </h1>

                        <h3>
                            ₹ {product.price}
                        </h3>

                        <p>
                            {product.description}
                        </p>

                        <button
                            onClick={
                                handleAddToCart
                            }
                        >
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default CollectionDetailPage;