/*!
 * Bloodline Blood Bank Management System
 * Copyright (c) 2025 Onaliy Jayawardana
 * All rights reserved.
 *
 * Unauthorized copying, modification, or distribution of this code is prohibited.
 */
import { CarouselSlider } from "./components/Carousel";
import FeaturedProducts from "./components/Featured";
const Home = () => {
  return (
    <div>
      <CarouselSlider />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
