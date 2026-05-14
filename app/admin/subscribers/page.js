'use client';

import { useEffect, useState } from 'react';

import {
    collection,
    getDocs
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function SubscribersPage() {

    const [subscribers, setSubscribers] =
        useState([]);

    useEffect(() => {

        const fetchSubscribers =
            async () => {

                try {

                    const querySnapshot =
                        await getDocs(
                            collection(
                                db,
                                'subscribers'
                            )
                        );

                    const data = [];

                    querySnapshot.forEach((doc) => {

                        data.push({
                            id: doc.id,
                            ...doc.data()
                        });

                    });

                    setSubscribers(data);

                } catch (error) {

                    console.log(error);

                }
            };

        fetchSubscribers();

    }, []);

    return (

        <div className="admin_subscribers">

            <h1>
                Subscribers Dashboard
            </h1>

            <div className="subscriber_list">

                {subscribers.map((item) => (

                    <div
                        key={item.id}
                        className="subscriber_item"
                    >

                        <p>
                            {item.email}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default SubscribersPage;