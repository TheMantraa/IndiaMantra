import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCarousel = () => {
  return (
    <section className="text-gray-600 body-font bg-white">
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
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGL6QeARVpiAQDOkK3RA3bgEXV-a06j2FplA&s"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-slate-200" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "Mantra Herbal Tea is now part of my daily routine. It's
                soothing, refreshing, and perfect for unwinding after a busy
                day."
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                Sophia Bennett
              </h2>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU53EcOIyxE7pOZJBvGHJGbDk39EYxvOhbdw&s"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "The taste and quality are outstanding. Mantra has shown me what
                real herbal tea should be like!"
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                James Peterson
              </h2>
            </div>
          </div>
          {/* Testimonial 3 */}
          <div className="lg:w-1/3 md:w-1/2 sm:w-full p-4">
            <div className="h-full bg-[#BBB1A6] shadow-md rounded-lg p-6 text-center">
              <img
                alt="testimonial"
                className="w-20 h-20 mb-4 object-cover object-center rounded-full inline-block border-2 border-gray-300"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQoGkzpdV8STUOwoWdKv4rz2mMp_C75G_RQ&s"
              />
              <div className="flex justify-center mb-2">
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-[#623c49]" />
                <FaStar className="text-slate-200" />
              </div>
              <p className="leading-relaxed text-[#3C0C1C] font-semibold text-md italic">
                "Mantra tea combines the goodness of Indian herbs in a way that
                feels Tasty and refreshing. It’s my go-to for a calm and
                relaxing moment."
              </p>
              <span className="inline-block h-1 w-10 rounded bg-[#3C0C1C] mt-4 mb-4"></span>
              <h2 className="text-black font-semibold text-lg">
                Olivia Brooks
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
