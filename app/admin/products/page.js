"use client";

export default function ProductsPage() {
  return (
    <div >
      <div >
        <h1 >Products</h1>
        <button >+ Add Product</button>
      </div>

      {/* EMPTY STATE */}
      <div >
        <h2 >No Products Found</h2>
        <p >
          Start by adding your first product to manage your store.
        </p>

        <button >Create Product</button>
      </div>
    </div>
  );
}
