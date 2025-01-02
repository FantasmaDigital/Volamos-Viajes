import React from "react";
import MainTitles from "../utils/MainTitles";
import { STAR } from "../constants/Icons";
import { testimonials } from "../constants/arrays/testimonials";

interface Testimonial {
  img: string;
  name: string;
  position: string;
  content: string;
}

const Testimonial: React.FC = () => {

  return (
    <section className="py-16 pb-56 sm:pb-60">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center text-center mb-6 md:mb-12">
          <div className="max-w-xl">
            <MainTitles
              topText="Testimonios"
              bottomText="Lo que la gente dice sobre nosotros"
              textColor="text-white"
              marginBottom="mb-5"
              textCenter={true}
            />
          </div>
        </div>

        <div className="w-[95%] sm:w-[80%] mx-auto text-white">
          <div className="grid grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div className={`glass col-span-3 lg:col-span-1 w-full mx-auto hover:scale-105 transition-all duration-200 hover:cursor-pointer`} key={i}>
                <div className="h-full p-6">
                  <div className="flex items-center mb-6">
                    <div className="mr-3">
                      <img
                        src={testimonial.profileImg}
                        alt={testimonial.name}
                        className="max-w-full h-auto rounded-full border"
                        width="55"
                      />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium">{testimonial.name}</h4>
                      <div className="flex flex-row pt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                      <span className="text-yellow-400" key={i}>
                        {STAR()}
                      </span>
                    ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="mb-2">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
