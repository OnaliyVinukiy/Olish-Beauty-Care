/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */
import { useState, useEffect } from "react";
import { database, get } from "../../../firebase";
import { ref } from "firebase/database";
import { Product } from "../../../types/Products";
import { Carousel } from "flowbite-react";

export function FeaturedProducts({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });
  const customTheme = {
    root: {
      base: "relative h-full w-full",
      leftControl:
        "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
      rightControl:
        "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    },
    indicators: {
      active: {
        off: "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
        on: "bg-white dark:bg-gray-800",
      },
      base: "h-3 w-3 rounded-full", // Removed 'rounded-full' from here
      wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
    },
    item: {
      base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
      wrapper: {
        off: "w-full flex-shrink-0 transform cursor-default snap-center",
        on: "w-full flex-shrink-0 transform cursor-grab snap-center",
      },
    },
    control: {
      base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
      icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
    },
    scrollContainer: {
      base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth", // Removed 'rounded-lg' from here
      snap: "snap-x",
    },
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const productRef = ref(database, "products");
        const snapshot = await get(productRef);
        if (snapshot.exists()) {
          const productsArray = Object.keys(snapshot.val()).map((key) => {
            const product = snapshot.val()[key];
            return {
              id: key,
              name: product.productName,
              description: product.productDescription,
              price: product.productPrice,
              imageUrl: product.images.productImage,
            };
          });
          setProducts(productsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        console.log("Finished fetching. Setting loading to false.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setLoading]);
  useEffect(() => {
    console.log("Loading state:", setLoading);
  }, [setLoading]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Add to cart functionality
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div>
      <div className="h-48 sm:h-[600px] xl:h-[700px]">
        <Carousel theme={customTheme}>
          <img
            src="src/assets/carousel.png"
            alt="..."
            className="w-full h-full object-cover"
          />
          <img
            src="src/assets/carousel.png"
            alt="..."
            className="w-full h-full object-cover"
          />
          <img
            src="src/assets/carousel.png"
            alt="..."
            className="w-full h-full object-cover"
          />
        </Carousel>
      </div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end text-center justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
              <h2 className="mt-3 text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl">
                Featured Products
              </h2>
            </div>
          </div>
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="h-56 w-full">
                  <a href="#">
                    <img
                      className="mx-auto h-full dark:hidden"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <img
                      className="mx-auto hidden h-full dark:block"
                      src={product.imageUrl}
                      alt={product.name}
                    />
                  </a>
                </div>
                <div className="pt-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        data-tooltip-target="tooltip-quick-look"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        <span className="sr-only">Quick look</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                  >
                    {product.name}
                  </a>
                  <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Fast Delivery
                      </p>
                    </li>
                    <li className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                        />
                      </svg>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Best Price
                      </p>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                      Rs. {product.price}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg bg-cyan-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      onClick={() => addToCart(product)}
                    >
                      <svg
                        className="-ms-2 me-2 h-5 w-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                        />
                      </svg>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
