"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "@/api/api";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/helper/helper";
import Cookies from "js-cookie";
import { CiSearch, CiUser } from "react-icons/ci";
import Image from "next/image";
import styles from "./Products.module.css";
import Table from "@/components/modules/Table";
import AddModal from "@/components/modules/AddModal";
import EditModal from "@/components/modules/EditModal";
import DeleteModal from "@/components/modules/DeleteModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "@/components/templates/Loder";
import Link from "next/link";

import { FaEye } from "react-icons/fa";

const Products = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isClient, setIsClient] = useState(false);
    const [search, setSearch] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [username, setUsername] = useState("");

    // Pagination state
    const initialPage = parseInt(searchParams.get("page")) || 1; // Get page from URL or default to 1
    const [currentPage, setCurrentPage] = useState(initialPage);
    const itemsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1); // Store total pages

    useEffect(() => {
        setIsClient(true);
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.push("/login");
        } else {
            // Check for login success query parameter
            if (searchParams.get("login") === "success") {
                toast.success("با موفقیت به حساب کاربری خود وارد شدید");
            }
        }
    }, [router]);

    const { data, error, isLoading, refetch } = useQuery(
        ["products", currentPage],
        () => fetchProducts(currentPage, itemsPerPage),
        {
            enabled: !!isClient,
            onSuccess: (data) => {
                console.log('API data', data)
                const fetchedProducts = data?.data || [];
                setProductsList(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                setTotalPages(data.totalPages || 1);
            }
        }
    );

    const openAddModal = () => setIsAddModalOpen(true);

    const updateProductList = (updatedProduct) => {
        setProductsList(prevProducts =>
            prevProducts.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod))
        );
        refetch();
    };

    const handleDeleteSuccess = (deletedProductId) => {
        setProductsList(prevProducts =>
            prevProducts.filter(product => product.id !== deletedProductId)
        );
        refetch();
    };

    useEffect(() => {
        if (isClient) setFilteredProducts(searchProducts(productsList, search));
    }, [search, productsList, isClient]);

    if (isLoading) return <Loader />;
    if (!isClient) return null;

    // Pagination handlers
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        router.push(`?page=${newPage}`, { scroll: false }); // Update URL without scrolling
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.search}>
                    <CiSearch />
                    <input
                        type="text"
                        placeholder="جستجو کالا"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div>
                        <div className={styles.profile}>
                            <CiUser />
                            <p>{username || "کاربر"}</p>
                        </div>
                        <p style={{ textAlign: "center" }}>مدیر</p>
                    </div>
                </div>
                <div className={styles.headTitle}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Link href="/"><FaEye /></Link>
                        <Image src="/images/setting-3.png" alt="تنظیمات" width={100} height={100} />
                        <h4>مدیریت کالا</h4>
                    </div>
                    <button onClick={openAddModal}>افزودن محصول</button>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        products={filteredProducts}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setSelectedProduct={setSelectedProduct}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                    />
                    <div className={styles.pagination}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            قبلی
                        </button>
                        <span>صفحه{currentPage.toLocaleString("fa-IR")}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages} // Disable if no next page
                        >
                            بعدی
                        </button>
                    </div>
                </div>
            </div>

            {isAddModalOpen && (
                <AddModal
                    setIsAddModalOpen={setIsAddModalOpen}
                    setProductsList={setProductsList}
                    name={name}
                    setName={setName}
                    price={price}
                    setPrice={setPrice}
                    quantity={quantity}
                    setQuantity={setQuantity}
                />
            )}

            {isEditModalOpen && selectedProduct && (
                <EditModal
                    setIsEditModalOpen={setIsEditModalOpen}
                    isEditModalOpen={isEditModalOpen}
                    setProductsList={updateProductList}
                    product={selectedProduct}
                />
            )}

            {isDeleteModalOpen && selectedProduct && (
                <DeleteModal
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    product={selectedProduct}
                    isDeleteModalOpen={isDeleteModalOpen}
                    onDeleteSuccess={handleDeleteSuccess}
                />
            )}

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick rtl={true}
                pauseOnFocusLoss
                pauseOnHover
            />
        </>
    );
};

export default Products;
