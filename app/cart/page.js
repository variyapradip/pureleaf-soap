'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    motion,
    AnimatePresence
} from 'framer-motion';

import {
    collection,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function CartPage() {

    const [cartItems, setCartItems] =
        useState([]);

    const [total, setTotal] =
        useState(0);

    // DELETE MODAL
    const [showModal, setShowModal] =
        useState(false);

    const [selectedProductId,
        setSelectedProductId] =
        useState(null);

    // REALTIME CART
    useEffect(() => {

        const unsubscribe =
            onSnapshot(

                collection(
                    db,
                    'cart'
                ),

                (snapshot) => {

                    const data = [];

                    let totalPrice = 0;

                    snapshot.forEach((docItem) => {

                        const item = {
                            id: docItem.id,
                            ...docItem.data()
                        };

                        data.push(item);

                        totalPrice +=
                            Number(item.price) *
                            Number(item.quantity);
                    });

                    setCartItems(data);

                    setTotal(totalPrice);

                }

            );

        return () => unsubscribe();

    }, []);

    // INCREASE QUANTITY
    const increaseQuantity =
        async (item) => {

            try {

                await updateDoc(

                    doc(
                        db,
                        'cart',
                        item.id
                    ),

                    {
                        quantity:
                            item.quantity + 1
                    }

                );

            } catch (error) {

                console.log(error);

            }
        };

    // DECREASE QUANTITY
    const decreaseQuantity =
        async (item) => {

            try {

                if (item.quantity <= 1) {

                    setSelectedProductId(
                        item.id
                    );

                    setShowModal(true);

                }

                else {

                    await updateDoc(

                        doc(
                            db,
                            'cart',
                            item.id
                        ),

                        {
                            quantity:
                                item.quantity - 1
                        }

                    );
                }

            } catch (error) {

                console.log(error);

            }
        };

    // OPEN DELETE MODAL
    const openDeleteModal =
        (id) => {

            setSelectedProductId(id);

            setShowModal(true);

        };

    // CONFIRM DELETE
    const confirmDelete =
        async () => {

            try {

                await deleteDoc(

                    doc(
                        db,
                        'cart',
                        selectedProductId
                    )

                );

                setShowModal(false);

                setSelectedProductId(null);

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <section className="cart_page">

            <div className="container">

                {/* HEADING */}
                <div className="cart_heading">

                    <h1>
                        Your Cart
                    </h1>

                    <p>
                        Handmade herbal soaps selected for your skincare.
                    </p>

                </div>

                <div className="cart_wrapper">

                    {/* CART ITEMS */}
                    <div className="cart_items">

                        {cartItems.length === 0 ? (

                            <div className="empty_cart">

                                <Image
                                    src="/images/empty-cart.png"
                                    alt="empty cart"
                                    width={220}
                                    height={220}
                                />

                                <h2>
                                    Your Cart Is Empty
                                </h2>

                                <p>
                                    Looks like you have not added any herbal soaps yet.
                                </p>

                            </div>

                        ) : (

                            cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="cart_card"
                                >

                                    {/* IMAGE */}
                                    <div className="cart_img">

                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            width={180}
                                            height={180}
                                        />

                                    </div>

                                    {/* CONTENT */}
                                    <div className="cart_content">

                                        <h3>
                                            {item.title}
                                        </h3>

                                        <p>
                                            ₹ {item.price}
                                        </p>

                                        {/* QUANTITY */}
                                        <div className="quantity_wrap">

                                            <button
                                                onClick={() =>
                                                    decreaseQuantity(item)
                                                }
                                            >
                                                -
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    increaseQuantity(item)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        {/* DELETE */}
                                        <button
                                            className="delete_btn"
                                            onClick={() =>
                                                openDeleteModal(item.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                    {/* SUMMARY */}
                    {cartItems.length > 0 && (

                        <div className="cart_summary">

                            <h2>
                                Order Summary
                            </h2>

                            <div className="summary_row">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹ {total}
                                </strong>

                            </div>

                            <button>
                                Proceed To Checkout
                            </button>

                        </div>

                    )}

                </div>

            </div>

            {/* DELETE MODAL */}
            <AnimatePresence>

                {showModal && (

                    <motion.div
                        className="modal_overlay"
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        exit={{
                            opacity: 0
                        }}
                    >

                        <motion.div
                            className="delete_modal"
                            initial={{
                                opacity: 0,
                                y: 120,
                                scale: 0.9
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            exit={{
                                opacity: 0,
                                y: 120,
                                scale: 0.9
                            }}
                            transition={{
                                duration: 0.35,
                                ease: 'easeOut'
                            }}
                        >

                            <h3>
                                Remove Product?
                            </h3>

                            <p>
                                Are you sure you want to remove this product from cart?
                            </p>

                            <div className="modal_actions">

                                <button
                                    className="cancel_btn"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="confirm_btn"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </section>
    );
}

export default CartPage;