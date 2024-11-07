'use client'
import { useState, useEffect } from "react"; // Import hooks
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie"; // For cookie management
import styles from "./HeaderFooter.module.css";

function Header() {
  const [token, setToken] = useState(null); // State to hold token value
  const [loading, setLoading] = useState(true); // State to track loading

  // useEffect to read the cookie when the component mounts or cookies change
  useEffect(() => {
    const cookieToken = Cookies.get("token"); // Read the token from cookies
    setToken(cookieToken); // Update the state with the token value
    setLoading(false); // Stop loading after cookie check
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  const isAuthenticated = token && token !== "undefined" && token !== ""; // Ensure token is valid

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.menuContainer}>
          {!loading && (
            <ul>
              <li>
                <Link href="/">صفحه اصلی</Link>
              </li>
              {isAuthenticated ? (
                // If token exists, show profile link
                <li>
                  <Link href="/products">پروفایل</Link>
                </li>
              ) : (
                // If token doesn't exist, show login and register links
                <>
                  <li>
                    <Link href="/register">ثبت نام</Link>
                  </li>
                  <li>
                    <Link href="/login">ورود</Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
        <div>
          <Link href="/">
            <Image src="/images/Union.png" alt="logo" width={50} height={50} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
