import Razorpay from "razorpay";

import { NextResponse } from "next/server";

export async function POST(req) {

    try {

        // GET BODY
        const body =
            await req.json();

        console.log(
            'REQUEST BODY:',
            body
        );

        // CHECK ENV
        console.log(
            'KEY ID:',
            process.env.RAZORPAY_KEY_ID
        );

        console.log(
            'SECRET:',
            process.env.RAZORPAY_SECRET
                ? 'SECRET FOUND'
                : 'SECRET MISSING'
        );

        // RAZORPAY INSTANCE
        const razorpay =
            new Razorpay({

                key_id:
                    process.env
                        .RAZORPAY_KEY_ID,

                key_secret:
                    process.env
                        .RAZORPAY_SECRET,

            });

        // ORDER OPTIONS
        const options = {

            amount:
                Number(body.amount) * 100,

            currency:
                "INR",

            receipt:
                `receipt_${Date.now()}`,

        };

        console.log(
            'ORDER OPTIONS:',
            options
        );

        // CREATE ORDER
        const order =
            await razorpay.orders.create(
                options
            );

        console.log(
            'ORDER CREATED:',
            order
        );

        // RETURN ORDER
        return NextResponse.json(order);

    } catch (error) {

        console.log(
            'RAZORPAY API ERROR:',
            error
        );

        return NextResponse.json(

            {
                success: false,
                error: error.message
            },

            {
                status: 500
            }

        );

    }

}