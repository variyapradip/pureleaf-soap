'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    collection,
    getDocs,
    query,
    where
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function ProductDetailPage({ params }) {

    const [product, setProduct] =
        useState(null);

    useEffect(() => {

        const fetchProduct =
            async () => {

                try {

                    const q = query(
                        collection(
                            db,
                            'products'
                        ),
                        where(
                            'slug',
                            '==',
                            params.slug
                        )
                    );

                    const querySnapshot =
                        await getDocs(q);

                    querySnapshot.forEach((doc) => {

                        setProduct({
                            id: doc.id,
                            ...doc.data()
                        });

                    });

                } catch (error) {

                    console.log(error);

                }
            };

        fetchProduct();

    }, [params.slug]);

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

                    {/* Product Image */}
                    <div className="product_detail-img">

                        <Image
                            src={product.image}
                            alt={product.title}
                            width={600}
                            height={700}
                            className="img-fluid"
                        />

                    </div>

                    {/* Product Content */}
                    <div className="product_detail-content">

                        <h1>
                            {product.title}
                        </h1>

                        <h3>
                            ₹ {product.price}
                        </h3>

                        <p>
                            {product.description}
                        </p>

                        <button>
                            Add To Cart
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ProductDetailPage;