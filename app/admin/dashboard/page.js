'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import {
    collection,
    addDoc
} from 'firebase/firestore';

import {
    signOut
} from 'firebase/auth';

import {
    db,
    auth
} from '@/firebase/firebase';

function AdminDashboardPage() {

    const [title, setTitle] = useState('');

    const [price, setPrice] = useState('');

    const [image, setImage] = useState('');

    const [stock, setStock] = useState('');

    const [category, setCategory] = useState('');

    const [description, setDescription] = useState('');

    const createSlug =
        (text) => {

            return text
                .toLowerCase()
                .replace(/\s+/g, '-');
        };

    // ADD PRODUCT
    const handleAddProduct =
        async (e) => {

            e.preventDefault();

            try {

                await addDoc(

                    collection(
                        db,
                        'collections'
                    ),

                    {
                        title,
                        price,
                        image,
                        stock,
                        category,
                        description,
                        slug: createSlug(title)
                    }
                );

                toast.success(
                    'Product added'
                );

                setTitle('');
                setPrice('');
                setImage('');
                setStock('');
                setCategory('');
                setDescription('');

            } catch (error) {

                console.log(error);

                toast.error(
                    'Failed to add product'
                );
            }
        };

    // LOGOUT
    const handleLogout =
        async () => {

            await signOut(auth);
        };

    return (

        <section className="admin_dashboard">

            <div className="admin_topbar">

                <h1>
                    Admin Dashboard
                </h1>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

            <form
                className="admin_form"
                onSubmit={handleAddProduct}
            >

                <input
                    type="text"
                    placeholder="Product Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) =>
                        setImage(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) =>
                        setStock(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button type="submit">
                    Add Product
                </button>

            </form>

        </section>
    );
}

export default AdminDashboardPage;