import React from "react";

const StoryAndVision = () => {
  return (
    <div className="bg-gray-50 px-4 sm:px-6 lg:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3C0C1C] mb-8 text-center baskervville-regular ">
          OUR STORY & VISION
        </h1>
        {/* Section 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/0904/1238/4538/files/38_Amazing_Herb_Garden_Ideas_for_Your_Outdoor_Oasis_a5047dbf-5bc0-4a83-9dd8-ce9a2b628626_480x480.jpg?v=1727772056"
              alt="A serene herb garden with sunrise in the background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base sm:text-lg lg:text-md text-gray-700 leading-relaxed space-y-6 text-justify">
              <p>
                When we moved away from India, we began to truly understand the
                depth and beauty of our roots. What stood out the most was how
                intertwined our food and culture was with wellness.
              </p>
              <p>
                Growing up, we had unknowingly embraced centuries-old traditions
                where the spices in our kitchens, the herbs in our gardens, and
                even the oils in our daily lives were more than just
                ingredients—they were elixirs of health, designed to nurture
                both body and soul.
              </p>
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-justify">
          <div className="flex flex-col justify-center">
            <div className="text-base sm:text-lg lg:text-md text-gray-700 leading-relaxed space-y-6">
              <p>
                In our new home abroad, we realized how rare it was to find such
                potent, natural ingredients that promote genuine well-being.
                This inspired us to start{" "}
                <strong>Mantra: Elixir of Wellness</strong>—a way to reconnect
                with these ancient practices and share their benefits with the
                world.
              </p>
              <p>
                Our range embraces the full spectrum of natural goodness that
                India is renowned for—Immunity Teas, pure spices, nutrient-rich
                pulses, cold-pressed oils, healing herbs, and natural powders.
                Each product is thoughtfully curated to honor the tradition it
                comes from, offering not just flavor but also the nourishment
                and balance that modern life often lacks.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://img.freepik.com/premium-photo/jug-herbal-tea-assortment-various-medicinal-herbs-green-background-top-view_535844-3585.jpg"
              alt="Assorted spices and herbs"
              className="w-full h-full object-cover "
            />
          </div>
        </div>
        {/* Section 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 text-justify">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDEC7R5QhdiNwLB925cPvOZWHaTpnE-qjqg&s"
              alt="Wellness practices"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-base sm:text-lg lg:text-md text-gray-700 leading-relaxed space-y-6">
              <p>
                Through Mantra, we aim to bring a taste of India’s wellness
                heritage into everyday lives, helping people around the world
                find their own mantra for healthy living.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryAndVision;
