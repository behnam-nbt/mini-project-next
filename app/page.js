// app/home/page.js
import Card from "@/components/modules/Card";
import styles from '../components/modules/Card.module.css';
import { notFound } from "next/navigation";
import MainLayout from "@/components/Layouts/MainLayout";

async function Home({ searchParams }) {
  // Get the current page from the query parameter; default to 1 if not provided
  const page = parseInt(searchParams.page) || 1;
  const limit = 12; // Number of items per page

  // Fetch data with ISR enabled
  const response = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}`, {
    next: { revalidate: 10 }
  });

  // Ensure the response is OK
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const products = await response.json();

  // Check if products exist
  if (!products.data) {
    notFound(); // Show 404 if products not found
  }

  return (
    <MainLayout>
      <div className={styles.cardContainer}>
        {products.data.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        {page > 1 && (
          <a href={`?page=${page - 1}`} className={styles.pageLink}>
            قبلی
          </a>
        )}
        {products.data.length === limit && (
          <a href={`?page=${page + 1}`} className={styles.pageLink}>
            بعدی
          </a>
        )}
      </div>
    </MainLayout>
  );
}

export default Home;
