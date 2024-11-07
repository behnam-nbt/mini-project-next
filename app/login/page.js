"use client";
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { loginUser } from '@/api/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import { decodeToken } from '@/helper/helper';
import Image from 'next/image';
import styles from './Login.module.css';
import Cookies from 'js-cookie';
import MainLayout from '@/components/Layouts/MainLayout';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter(); // Initialize useRouter here

    // Check if user is already logged in
    useEffect(() => {
        const token = Cookies.get('token'); // Get the token from cookies
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken?.username) {
                redirect('/'); // Redirect if token and username exist
            } else {
                setLoading(false); // Show login page if token is invalid
            }
        } else {
            setLoading(false); // Show login page if no token is found
        }
    }, [router]);


    // Mutation for logging in the user
    const { mutate, isLoading } = useMutation(loginUser, {
        onSuccess: (data) => {
            const token = data.token;  // Assuming data contains the token
            if (token) {
                Cookies.set('token', token);
                const decodedToken = decodeToken(token);
                const username = decodedToken.username;

                if (username) {
                    localStorage.setItem('username', username);
                } else {
                    console.error('نام کاربری در توکن پیدا نشد');
                }

                // Navigate to products page after successful login
                router.push("/products");
            } else {
                console.error('توکن یافت نشد');
            }
        },
        onError: (error) => {
            setErrorMsg(error.message);
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        mutate({ username: formData.username, password: formData.password });
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (loading) {
        return null;
    }


    return (
        <MainLayout>
            <div className={styles.mainContainer}>
                <div className={styles.loginContainer}>
                    <div className={styles.title}>
                        <Image src="/images/Union.png" alt="logo" width={100} height={100} />
                        <h2>فرم ورود</h2>
                    </div>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputBox}>
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="نام کاربری"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="رمز عبور"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'صبر کنید...' : 'ورود'}
                            </button>
                            <div className={styles.navigate}>
                                <Link href="/register">ایجاد حساب کاربری!</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
};

export default Login;
