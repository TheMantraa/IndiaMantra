import React from "react";

const WhyUs = () => {
  return (
    <div className="bg-[#eeebe9] py-12">
      <div className="text-center mb-10 px-4 md:px-12 lg:px-32">
        <h2 className="lg:text-3xl md:text-3xl font-extrabold mb-2 text-[#3C0C1C] baskervville-regular ">
          WHY MANTRA?
        </h2>
        <p className="text-sm md:text-lg text-[#4f2432]">
          At Mantra, we create a deep connection between nature’s finest
          offerings and your well-being.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl px-4">
        <div className="text-center p-6 rounded-lg border bg-[#623c49]  border-yellow-500 shadow-xl">
          <div className="flex justify-center mb-4 ">
            {/* <div className="bg-yellow-500 p-4 rounded-full"> */}
            <img
              src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735968740/tradition-removebg-preview_wlo7qk.png"
              alt="Certified Organic"
              className="lg:h-20 lg:w-24 md:h-12 md:w-12"
            />
            {/* </div> */}
          </div>
          <h4 className="text-lg text-white md:text-xl font-bold mb-2">
            Traditionally Crafted
          </h4>
          <p className="text-justify text-sm font-semibold  md:text-base text-white">
            We carefully handpick every herb to ensure it meets our highest
            standards. Using traditional, time-tested methods, we preserve the
            natural goodness of each ingredient, delivering only the finest,
            most potent herbs directly to your cup
          </p>
        </div>

        <div className="text-center p-6  rounded-lg border bg-[#623c49] border-yellow-500 shadow-xl">
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500 p-4 rounded-full">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4300/4300795.png"
                alt="Consciously Curated"
                className="lg:h-12 lg:w-12 md:h-12 md:w-12"
              />
            </div>
          </div>
          <h4 className="text-lg md:text-xl text-white font-bold mb-2">
            A Meticulous Process
          </h4>
          <p className=" text-justify text-sm font-semibold md:text-base text-white">
            From harvest to blending, every step of our process is done with
            precision and care. We combine ancient techniques with modern
            expertise to maintain the purity and potency of each herb, ensuring
            that you receive the highest quality in every sip.
          </p>
        </div>

        <div className="text-center p-6  rounded-lg border bg-[#623c49] border-yellow-500 shadow-xl">
          <div className="flex justify-center mb-4">
            {/* <div className="bg-yellow-500 p-4 rounded-full"> */}
            <img
              src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735968977/bowl-removebg-preview_kje7en.png"
              alt="Traditionally Processed"
              className="lg:h-20 lg:w-20 md:h-12 md:w-12"
            />
            {/* </div> */}
          </div>
          <h4 className="text-lg md:text-xl text-white font-bold mb-2">
            Crafted for Wellness
          </h4>
          <p className=" text-justify text-sm font-semibold md:text-base text-white">
            Every sip is crafted to nurture your body and soul. Our teas are
            more than just a drink—they are a mindful ritual for your
            well-being, created with care, intention, and a touch of nature's
            essence to bring peace, balance, and a moment of pure serenity to
            your day.
          </p>
        </div>

        <div className="text-center p-6 rounded-lg border bg-[#623c49] border-yellow-500 shadow-xl">
          <div className="flex justify-center mb-4">
            {/* <div className="bg-yellow-500 p-4 rounded-full"> */}
            <img
              src="https://res.cloudinary.com/dxyuojydi/image/upload/v1735984538/10645744-removebg-preview_vxnqrf.png"
              alt="Vegan"
              className="lg:h-20 lg:w-20 md:h-12 md:w-12"
            />
            {/* </div> */}
          </div>
          <h4 className="text-lg md:text-xl text-white font-bold mb-2">
            Authentic & Reliable
          </h4>
          <p className=" text-justify text-sm font-semibold md:text-base text-white">
            At Mantra, compassion is key. All our products are 100% Authentic,
            cruelty-free, and made with love. By choosing Mantra, you’re
            supporting a brand that prioritizes kindness to humanity while
            offering products that are good for both you and the planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
