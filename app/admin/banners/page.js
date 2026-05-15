'use client';

import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import {
    collection,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';

import { db } from '@/firebase/firebase';

function AdminBannerPage() {

    const [banners, setBanners] =
        useState([]);

    const [title, setTitle] =
        useState('');

    const [subtitle, setSubtitle] =
        useState('');

    const [image, setImage] =
        useState('');

    const [buttonText, setButtonText] =
        useState('');

    const [buttonLink, setButtonLink] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    const [search, setSearch] =
        useState('');

    // REALTIME FETCH BANNERS
    useEffect(() => {

        const unsubscribe =
            onSnapshot(

                collection(
                    db,
                    'homepage'
                ),

                (snapshot) => {

                    const data = [];

                    snapshot.forEach((docItem) => {

                        data.push({

                            id: docItem.id,

                            ...docItem.data()

                        });

                    });

                    setBanners(data);

                }

            );

        return () => unsubscribe();

    }, []);

    // RESET FORM
    const resetForm = () => {

        setTitle('');

        setSubtitle('');

        setImage('');

        setButtonText('');

        setButtonLink('');

        setEditId(null);

    };

    // ADD / UPDATE BANNER
    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                // UPDATE
                if (editId) {

                    await updateDoc(

                        doc(
                            db,
                            'homepage',
                            editId
                        ),

                        {
                            title,
                            subtitle,
                            image,
                            buttonText,
                            buttonLink,
                            updatedAt:
                                serverTimestamp()
                        }

                    );

                    toast.success(
                        'Banner updated successfully'
                    );

                }

                // ADD
                else {

                    await addDoc(

                        collection(
                            db,
                            'homepage'
                        ),

                        {
                            title,
                            subtitle,
                            image,
                            buttonText,
                            buttonLink,
                            createdAt:
                                serverTimestamp()
                        }

                    );

                    toast.success(
                        'Banner added successfully'
                    );

                }

                resetForm();

            } catch (error) {

                console.log(error);

                toast.error(
                    'Something went wrong'
                );

            } finally {

                setLoading(false);

            }
        };

    // EDIT BANNER
    const handleEdit =
        (banner) => {

            setTitle(
                banner.title || ''
            );

            setSubtitle(
                banner.subtitle || ''
            );

            setImage(
                banner.image || ''
            );

            setButtonText(
                banner.buttonText || ''
            );

            setButtonLink(
                banner.buttonLink || ''
            );

            setEditId(
                banner.id
            );

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

    // DELETE BANNER
    const handleDelete =
        async (id) => {

            const confirmDelete =
                window.confirm(
                    'Delete this banner?'
                );

            if (!confirmDelete) return;

            try {

                await deleteDoc(

                    doc(
                        db,
                        'homepage',
                        id
                    )

                );

                toast.success(
                    'Banner deleted successfully'
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    'Delete failed'
                );

            }
        };

    // FILTER SEARCH
    const filteredBanners =
        banners.filter((banner) =>

            banner.title
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )

        );

    return (

        <section className="py-5 bg-light min-vh-100">

            <div className="container">

                {/* PAGE HEADING */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">

                    <div>

                        <h1 className="fw-bold mb-1">
                            Banner Manager
                        </h1>

                        <p className="text-muted mb-0">
                            Manage homepage banners dynamically
                        </p>

                    </div>

                    {/* SEARCH */}
                    <div className="mt-3 mt-lg-0">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search banners..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>

                {/* FORM */}
                <div className="card border-0 shadow-sm mb-5">

                    <div className="card-body p-4">

                        <form
                            onSubmit={handleSubmit}
                        >

                            <div className="row">

                                {/* TITLE */}
                                <div className="col-lg-6 mb-3">

                                    <label className="form-label fw-semibold">
                                        Banner Title
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter banner title"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                {/* IMAGE */}
                                <div className="col-lg-6 mb-3">

                                    <label className="form-label fw-semibold">
                                        Banner Image URL
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="/images/banner.jpg"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                {/* BUTTON TEXT */}
                                <div className="col-lg-6 mb-3">

                                    <label className="form-label fw-semibold">
                                        Button Text
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Shop Now"
                                        value={buttonText}
                                        onChange={(e) =>
                                            setButtonText(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                {/* BUTTON LINK */}
                                <div className="col-lg-6 mb-3">

                                    <label className="form-label fw-semibold">
                                        Button Link
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="/collections"
                                        value={buttonLink}
                                        onChange={(e) =>
                                            setButtonLink(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                {/* SUBTITLE */}
                                <div className="col-12 mb-3">

                                    <label className="form-label fw-semibold">
                                        Banner Subtitle
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder="Enter banner subtitle"
                                        value={subtitle}
                                        onChange={(e) =>
                                            setSubtitle(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                {/* IMAGE PREVIEW */}
                                {image && (

                                    <div className="col-12 mb-4">

                                        <label className="form-label fw-semibold">
                                            Banner Preview
                                        </label>

                                        <div className="border rounded overflow-hidden">

                                            <img
                                                src={image}
                                                alt="banner preview"
                                                className="img-fluid w-100"
                                                style={{
                                                    height: '300px',
                                                    objectFit: 'cover'
                                                }}
                                            />

                                        </div>

                                    </div>

                                )}

                                {/* BUTTONS */}
                                <div className="col-12 d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-dark px-4"
                                        disabled={loading}
                                    >

                                        {
                                            loading
                                                ? 'Saving...'
                                                : editId
                                                    ? 'Update Banner'
                                                    : 'Add Banner'
                                        }

                                    </button>

                                    {editId && (

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={resetForm}
                                        >
                                            Cancel Edit
                                        </button>

                                    )}

                                </div>

                            </div>

                        </form>

                    </div>

                </div>

                {/* TABLE */}
                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-light">

                                    <tr>

                                        <th>
                                            Banner
                                        </th>

                                        <th>
                                            Title
                                        </th>

                                        <th>
                                            Button
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {filteredBanners.length > 0 ? (

                                        filteredBanners.map((banner) => (

                                            <tr key={banner.id}>

                                                {/* IMAGE */}
                                                <td width="220">

                                                    <img
                                                        src={banner.image}
                                                        alt={banner.title}
                                                        className="img-fluid rounded"
                                                        style={{
                                                            width: '200px',
                                                            height: '110px',
                                                            objectFit: 'cover'
                                                        }}
                                                    />

                                                </td>

                                                {/* TITLE */}
                                                <td>

                                                    <h6 className="mb-1 fw-bold">

                                                        {banner.title}

                                                    </h6>

                                                    <p className="mb-0 text-muted small">

                                                        {banner.subtitle}

                                                    </p>

                                                </td>

                                                {/* BUTTON */}
                                                <td>

                                                    <div>

                                                        <span className="badge bg-dark mb-2">

                                                            {
                                                                banner.buttonText
                                                            }

                                                        </span>

                                                        <p className="small text-muted mb-0">

                                                            {
                                                                banner.buttonLink
                                                            }

                                                        </p>

                                                    </div>

                                                </td>

                                                {/* ACTIONS */}
                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    banner
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    banner.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-5"
                                            >

                                                <h5 className="mb-1">
                                                    No banners found
                                                </h5>

                                                <p className="text-muted mb-0">
                                                    Add your first homepage banner
                                                </p>

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default AdminBannerPage;