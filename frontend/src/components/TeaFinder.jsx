import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { FaAmazon } from "react-icons/fa";
import axios from "axios";

const healthConcerns = [
  "Relax and Unwind",
  "Improve Digestion",
  "Feel Energized",
  "Boost Immunity",
  "Find Inner Calm",
  "Wake Up",
];

const healthConcernMapping = {
  "Relax and Unwind": "Stress Reduction",
  "Improve Digestion": "Digestive Support",
  "Feel Energized": "Energy Boost",
  "Boost Immunity": "Digestive Support",
  "Find Inner Calm": "Stress Reduction",
  "Wake Up": "Energy Boost",
};

const flavors = [
  "Cool and Refreshing",
  "Tangy and Zesty",
  "Sweet and Juicy",
  "Bold and Warming",
  "Soft and Aromatic",
];

const flavorsMapping = {
  "Cool and Refreshing": ["Minty"],
  "Tangy and Zesty": ["Minty"],
  "Sweet and Juicy": ["Fruity"],
  "Bold and Warming": ["Spicy"],
  "Soft and Aromatic": ["Fruity", "Spicy"],
};

const teaTypes = ["Black Tea", "Herbal Tea", "Green Tea"];

const teaTypesMapping = {
  "Black Tea": "Black Tea",
  "Herbal Tea": "Herbal Tea",
  "Green Tea": "Green Tea",
};

const teas = [
  {
    name: "Chamomile Pure",
    type: "Herbal Tea",
    benefits: ["Stress Reduction"],
    flavors: ["Fruity"],
    tagline: "Sweet chamomile serenity with a hint of fruity bliss.",
    buyUrl: "https://www.amazon.com/dp/B0DPJBFQ6Q",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8278_xe7tb7.png",
  },
  {
    name: "Stress Relief Tea",
    type: "Green Tea",
    benefits: ["Stress Reduction", "Energy Boost", "Digestive Support"],
    flavors: ["Minty", "Fruity", "Spicy"],
    tagline: "Soothe your digestion with the refreshing cool of mint.",
    buyUrl: "https://www.amazon.com/dp/B0DPJF96B9",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8279_ghk4xr.png",
  },
  {
    name: "Hibiscus Tea",
    type: "Herbal Tea",
    benefits: ["Energy Boost"],
    flavors: ["Fruity"],
    tagline: "A fruity burst of hibiscus to awaken your inner vigor.",
    buyUrl: "https://www.amazon.com/dp/B0DPJG2LJC",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8280_tqv4ww.png",
  },
  {
    name: "English Breakfast Tea",
    type: "Black Tea",
    benefits: ["Digestive Support", "Energy Boost", "Stress Reduction"],
    flavors: ["Spicy", "Minty"],
    tagline: "Start your day with a warm, spiced boost for better digestion",
    buyUrl: "https://www.amazon.com/dp/B0DPJFDHN8",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106115/IMG_8281_c83yyp.png",
  },
  {
    name: "Lemon Ginger Black Pepper Stevia",
    type: "Herbal Tea",
    benefits: ["Digestive Support", "Stress Reduction", "Energy Boost"],
    flavors: ["Spicy"],
    tagline: "A spicy kick to keep your digestion in perfect harmony.",
    buyUrl: "https://www.amazon.com/dp/B0DPJFFVFB",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8282_lfix5r.png",
  },
  {
    name: "Nature’s Cleanse",
    type: "Herbal Tea",
    benefits: ["Digestive Support"],
    flavors: ["Fruity"],
    tagline: "Natural fruity goodness for a gentle digestive detox.",
    buyUrl: "https://www.amazon.com/dp/B0DPJF21W6",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106115/IMG_8283_ibomit.png",
  },
  {
    name: "Earl Grey",
    type: "Black Tea",
    benefits: ["Digestive Support", "Energy Boost", "Stress Reduction"],
    flavors: ["Minty", "Fruity", "Spicy"],
    tagline: "A refreshing twist of mint to support your digestive balance.",
    buyUrl: "https://www.amazon.com/dp/B0DPJGD269",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8284_rij0aw.png",
  },
  {
    name: "Spearmint Tea",
    type: "Herbal Tea",
    benefits: ["Digestive Support", "Stress Reduction"],
    flavors: ["Minty"],
    tagline: "Refresh your digestion with the cooling touch of spearmint.",
    buyUrl: "https://www.amazon.com/dp/B0DPJG4QCZ",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106116/IMG_8285_pb8q4g.png",
  },
  {
    name: "Peppermint Pure",
    type: "Herbal Tea",
    benefits: ["Energy Boost"],
    flavors: ["Minty"],
    tagline: "Pure peppermint power to fuel your day with energy.",
    buyUrl: "https://www.amazon.com/dp/B0DPJDQLGZ",
    imgUrl:
      "https://res.cloudinary.com/dxyuojydi/image/upload/v1737106114/IMG_8286_bn8v0h.png",
  },
];

const TeaFinder = () => {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({
    health: [],
    flavors: [],
    teaType: [],
    email: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="relative py-8">
      <img
        src="https://res.cloudinary.com/dxyuojydi/image/upload/v1736932411/pexels-quang-nguyen-vinh-222549-11669663_mqjcoe.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
      />
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <div className="relative z-10 p-1 flex flex-col items-center text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-[#4f2432] baskervville-regular">
            Play-and-Discover your perfect tea
          </h1>
          <p className="text-[#4f2432] mb-4 text-lg font-extrabold baskervville-regular">
            Step {step} of 5
          </p>

          <StepContent
            step={step}
            selection={selection}
            setSelection={setSelection}
            nextStep={nextStep}
            prevStep={prevStep}
            healthConcerns={healthConcerns}
            flavors={flavors}
            teaTypes={teaTypes}
          />

          {step === 5 && <TeaResult selection={selection} teas={teas} />}
        </div>
      </DndProvider>
    </div>
  );
};

const StepContent = ({
  step,
  selection,
  setSelection,
  nextStep,
  prevStep,
  healthConcerns,
  flavors,
  teaTypes,
}) => {
  const questions = [
    "Drag & drop your tea goal in cup!",
    "Pick Your Favorite Flavor\nWhat kind of taste do you enjoy in your tea?",
    "Choose Your Tea Type\nWhat’s your tea base of choice?",
    "Enter Your Email to Unlock More Benefits\nTo reveal your tea match and receive updates, enter your email.",
    "Meet Your Perfect Tea Match\nGet personalized tea picks with benefits, a unique touch, and more.",
  ];

  const options =
    step === 1
      ? healthConcerns
      : step === 2
      ? flavors
      : step === 3
      ? teaTypes
      : [];

  const handleDrop = (item) => {
    if (step === 1 && !selection.health.includes(item)) {
      setSelection((prev) => ({
        ...prev,
        health: [...prev.health, healthConcernMapping[item]],
      }));
      nextStep();
    } else if (step === 2 && !selection.flavors.includes(item)) {
      setSelection((prev) => ({
        ...prev,
        flavors: [...prev.flavors, ...flavorsMapping[item]],
      }));
      nextStep();
    } else if (step === 3 && !selection.teaType.includes(item)) {
      setSelection((prev) => ({
        ...prev,
        teaType: [...prev.teaType, teaTypesMapping[item]],
      }));
      nextStep();
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-[#4f2432] baskervville-regular">
        {questions[step - 1].split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            {index < questions[step - 1].split("\n").length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {step < 4 && (
        <>
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {options.map((option) => (
              <Draggable key={option} item={option}>
                {option}
              </Draggable>
            ))}
          </div>

          <Droppable onDrop={handleDrop}>
            <div className="flex flex-col items-center">
              <img
                src="https://res.cloudinary.com/dxyuojydi/image/upload/v1736933970/Untitled_design__26_-removebg-preview_i5ly0a.png"
                alt=""
              />
            </div>
          </Droppable>
        </>
      )}

      {step === 4 && (
        <div className="my-8">
          <input
            type="email"
            placeholder="Enter your email"
            value={selection.email}
            onChange={(e) =>
              setSelection((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded shadow text-center"
          />
          <button
            onClick={nextStep}
            className="mt-4 text-white bg-[#765460] hover:bg-[#3C0C1C] px-4 py-2 rounded shadow"
          >
            Next
          </button>
        </div>
      )}

      <div className="my-8 flex justify-between">
        {step > 1 && step < 5 && (
          <button
            onClick={prevStep}
            className="text-white bg-[#765460] hover:bg-[#3C0C1C] px-4 py-2 rounded shadow"
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
};

const TeaResult = ({ selection, teas }) => {
  const matchingTeas = teas.filter(
    (tea) =>
      selection.health.every((concern) => tea.benefits.includes(concern)) &&
      selection.flavors.every((flavor) => tea.flavors.includes(flavor)) &&
      tea.type === selection.teaType[0]
  );

  const sendEmail = async (email, imgUrl, buyUrl) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/sendemail/sendproductrecommendation",
        {
          email,
          imgUrl: imgUrl,
          buyUrl: buyUrl,
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully!");
      } else {
        console.log("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };
  if (selection.email && matchingTeas.length > 0) {
    sendEmail(selection.email, matchingTeas[0].imgUrl, matchingTeas[0].buyUrl);
  }
  return (
    <div className="my- text-center baskervville-regular ">
      <h2 className="text-3xl font-extrabold text-[#4f2432] mb-1 baskervville-regular">
        YOUR PERFECT TEA
      </h2>
      {matchingTeas.length > 0 ? (
        matchingTeas.slice(0, 1).map((tea) => (
          <div
            key={tea.name}
            className="p-6 bg-black opacity-60 rounded-lg mt-4 shadow-lg max-w-md mx-auto"
          >
            <h3 className="text-3xl font-extrabold text-white mb-2">
              {tea.name}
            </h3>

            <p className="text-white mb-1">
              <span className="font-bold text-2xl"></span> {tea.tagline}
            </p>
            <a
              href={tea.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center  text-2xl font-bold justify-center gap-2 text-white  mt-4"
            >
              <FaAmazon size={28} /> <span>Buy Here</span>
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-600 mt-4">
          No matches found. Try other preferences.
        </p>
      )}
    </div>
  );
};

const Draggable = ({ item, children }) => {
  const [, dragRef] = useDrag({
    type: "ITEM",
    item: { name: item },
  });

  return (
    <div
      ref={dragRef}
      className="bg-[#765460] p-2 rounded shadow cursor-grab hover:bg-[#4f2432] text-white"
    >
      {children}
    </div>
  );
};

const Droppable = ({ onDrop, children }) => {
  const [, dropRef] = useDrop({
    accept: "ITEM",
    drop: (item) => onDrop(item.name),
  });

  return (
    <div ref={dropRef} className="relative w-full h-full">
      {children}
    </div>
  );
};

export default TeaFinder;
