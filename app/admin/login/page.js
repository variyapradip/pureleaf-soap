'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import toast from 'react-hot-toast';

import {
    signInWithEmailAndPassword
} from 'firebase/auth';

import { auth } from '@/firebase/firebase';

function AdminLoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const handleLogin =
        async (e) => {

            e.preventDefault();

            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

                toast.success(
                    'Login successful'
                );

                router.push(
                    '/admin/dashboard'
                );

            }catch (error) {

                console.log(
                    'Firebase Error:',
                    error.code
                );
            
                console.log(
                    'Message:',
                    error.message
                );
            
            }
        };

        return (

            <section className="admin_login">
    
                <div className="admin_login_box">
    
                    <h1>
                        Admin Login
                    </h1>
    
                    <form onSubmit={handleLogin}>
    
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
    
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
    
                        <button type="submit">
                            Login
                        </button>
    
                    </form>
    
                </div>
    
            </section>
        );
    }
    
    export default AdminLoginPage;