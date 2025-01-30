/*!
 * Olish Beauty Care & Cosmetics Official Website
 * Copyright (c) 2025 Olish Beauty Care & Cosmetics (Pvt) Ltd.
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */

import { FeaturedProducts } from "./components/Featured";
import { TypewriterEffect } from "./components/TextEffect";
import { ParaEffect } from "./components/ParaEffect";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Loading state in Home:", loading);
  }, [loading]);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-400 border-t-transparent"></div>
        </div>
      )}
      <FeaturedProducts setLoading={setLoading} />
      {!loading && (
        <>
          <section className="mb-12 bg-pink-50 py-8 md:ml-20 md:mr-20 ml-8 mr-8 antialiased dark:bg-gray-900 md:py-16 rounded-lg">
            <TypewriterEffect
              words={[
                { text: "Beauty" },
                { text: "&" },
                { text: "Wellness" },
                { text: "In" },
                { text: "Every" },
                { text: "Drop!" },
              ]}
            />
            <ParaEffect
              words={
                "Experience the perfect blend of nature and science with Olish Beauty Care. Our carefully crafted formulas nourish your skin, enhance your natural glow, and bring out the beauty in every drop. Elevate your skincare routine with the essence of purity and wellness."
              }
            />
          </section>
        </>
      )}
    </div>
  );
};

export default Home;
