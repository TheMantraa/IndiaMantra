import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCarousel = () => {
  return (
    <section className="text-gray-600 body-font bg-[#eeebe9]">
      <div className="px-5 py-16 lg:mx-32">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-12 baskervville-regular">
          MANTRA MOMENTS : YOUR EXPERIENCES
        </h1>
        <div className="flex flex-wrap -m-4 justify-center">
          {/* Testimonial 1 */}
          <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                src="https://res.cloudinary.com/dxyuojydi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1739276120/WhatsApp_Image_2025-02-11_at_17.44.58_48e9dbc0_gtcv8l.jpg"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-slate-200" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "When I travel, I miss my milk tea, so instant masala chai premix is a lifesaver. It only takes a minute to make and tastes the same.
                "
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                Amit Kumar Malhotra
              </h2>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                src="https://res.cloudinary.com/dxyuojydi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1739275766/WhatsApp_Image_2025-02-11_at_17.38.52_053a4b1e_e3e879.jpg"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "The quality of this tea is amazing—fresh, fragrant, and full of flavor. You can really taste the difference compared to regular store-bought teas. "
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                Payal Bedi
              </h2>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                src="https://res.cloudinary.com/dxyuojydi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1739264552/WhatsApp_Image_2025-02-11_at_14.32.02_2d34acbe_lcjkbh.jpg"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-slate-200" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "The tea is really fresh, and the ingredients taste premium. You can tell it’s made with care. Will definitely buy again!"
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                Sudesh Malhotra
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
