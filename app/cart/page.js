'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import toast from 'react-hot-toast';

import {
    motion,
    AnimatePresence
} from 'framer-motion';

import {
    collection,
    onSnapshot,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    query,
    where
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
                            Number(item.price)
                            *
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

                const q = query(

                    collection(
                        db,
                        'collections'
                    ),

                    where(
                        'slug',
                        '==',
                        item.slug
                    )

                );

                const querySnapshot =
                    await getDocs(q);

                if (querySnapshot.empty) {

                    toast.error(
                        'Product not found'
                    );

                    return;
                }

                const latestProduct =
                    querySnapshot.docs[0].data();

                const latestStock =
                    Number(
                        latestProduct.stock
                    );

                // STOCK LIMIT CHECK
                if (

                    Number(item.quantity)
                    >=
                    latestStock

                ) {

                    toast(
                        `Only ${latestStock} items left in stock`,
                        {
                            icon: '🧡',

                            duration: 2500,

                            style: {
                                borderRadius: '16px',
                                background: '#fff7ed',
                                color: '#c2410c',
                                border: '1px solid #fdba74',
                                padding: '16px',
                                boxShadow:
                                    '0 10px 30px rgba(0,0,0,0.08)',
                                fontSize: '15px',
                                fontWeight: '600'
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
                        item.id
                    ),

                    {
                        quantity:
                            Number(item.quantity) + 1,

                        stock:
                            latestStock
                    }

                );

            } catch (error) {

                console.log(error);

                toast.error(
                    'Something went wrong'
                );

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
                                Number(item.quantity) - 1
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

                toast.success(
                    'Product removed from cart'
                );

            } catch (error) {

                console.log(error);

            }
        };

    // RAZORPAY PAYMENT
    // RAZORPAY PAYMENT
const handlePayment = async () => {

    try {

        const response = await fetch(
            '/api/razorpay',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    amount: total
                })
            }
        );

        const order =
            await response.json();

        // DEBUG ORDER
        console.log(
            'ORDER DATA:',
            order
        );

        const options = {

            key:
                process.env
                    .NEXT_PUBLIC_RAZORPAY_KEY,

            amount:
                order.amount,

            currency:
                order.currency,

            name:
                'Pureleaf Soap',

            description:
                'Herbal Soap Order',

            image:
                '/logo.png',

            order_id:
                order.id,

            handler:
                async function (
                    response
                ) {

                    console.log(
                        'PAYMENT SUCCESS:',
                        response
                    );

                    toast.success(
                        'Payment Successful'
                    );

                    // CLEAR CART
                    for (const item of cartItems) {

                        await deleteDoc(

                            doc(
                                db,
                                'cart',
                                item.id
                            )

                        );

                    }

                },

            prefill: {

                name:
                    'Pureleaf Customer',

                email:
                    'demo@gmail.com',

                contact:
                    '9999999999'

            },

            notes: {

                address:
                    'Pureleaf Soap Store'

            },

            theme: {
                color: '#4e3524'
            },

            modal: {

                ondismiss: function () {

                    toast.error(
                        'Payment Cancelled'
                    );

                }

            }

        };

        // DEBUG RAZORPAY
        console.log(
            'RAZORPAY SDK:',
            window.Razorpay
        );

        // CHECK SDK
        if (!window.Razorpay) {

            toast.error(
                'Razorpay SDK Failed To Load'
            );

            return;
        }

        // OPEN PAYMENT
        const razorpay =
            new window.Razorpay(
                options
            );

        razorpay.open();

    } catch (error) {

        console.log(
            'PAYMENT ERROR:',
            error
        );

        toast.error(
            'Payment Failed'
        );

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
                                            Delete
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

                            <button
                                onClick={handlePayment}
                            >
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