"use client"
import React, { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { registerUser } from '@/api/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';
import styles from "../login/Login.module.css";
import Image from 'next/image';
import { decodeToken } from '@/helper/helper';
import Cookies from 'js-cookie';

const Register = () => {
    const router = useRouter(); // Initialize useRouter here
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(true);

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

    const { mutate, isLoading, isError, error, isSuccess } = useMutation(registerUser, {
        onSuccess: () => {
            router.push('/login'); // Redirect to login on success
        },
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg(''); // Reset error message

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("رمز عبور یکسان نیست");
            return;
        }

        console.log("Registering user:", formData); // Log the data

        // Submit registration form
        mutate({ username: formData.username, password: formData.password });
    };

    if (loading) {
        return null;
    }


    return (
            <div className={styles.mainContainer}>
                <div className={styles.loginContainer}>
                    <div className={styles.title}>
                        <Image src="/images/Union.png" alt="logo" width={100} height={100} />
                        <h2>فرم ثبت نام</h2>
                    </div>
                    {isError && <p style={{ color: 'red' }}>{error.message}</p>}
                    {isSuccess && <p style={{ color: 'green' }}>ثبت نام با موفقیت انجام شد!در حال انتقال...</p>}
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
                                    placeholder='رمز عبور'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder='تکرار رمز عبور'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? 'درحال ثبت نام...' : 'ثبت نام'}
                            </button>
                            <div className={styles.navigate}>
                                <Link href="/login">حساب کاربری دارید؟</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div> 
    );
};

export default Register;
