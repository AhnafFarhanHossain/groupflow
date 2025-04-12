"use client";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Computer Science Student, Stanford University",
      quote:
        "GroupFlow revolutionized how our team collaborated on our final year project. The intuitive interface made task management effortless, while the real-time chat feature kept everyone in sync. What impressed me most was how the platform adapted to our workflow - from coding sprints to documentation phases. The progress tracking features gave us clear insights into our project timeline, and the ability to organize tasks by priority helped us meet our deadlines consistently. I particularly loved the milestone celebration notifications - it kept the team motivated!",
      avatar: "/testimonial-1.jpg",
      rating: 5,
      bgColor: "from-emerald-50 to-green-50",
    },
    {
      name: "Sarah Lee",
      role: "Engineering Student, MIT",
      quote:
        "As a team lead for our engineering design project, I needed a tool that could handle complex project requirements while keeping things simple for the team. GroupFlow delivered exactly that. The visual project dashboard became our single source of truth, making it easy to track deliverables and identify bottlenecks. The file sharing and version control features were game-changers for our technical documentation. What really sets it apart is how it combines professional project management capabilities with an interface that students actually enjoy using.",
      avatar: "/testimonial-2.jpg",
      rating: 4,
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      name: "Michael Chen",
      role: "Business Student, Harvard Business School",
      quote:
        "Managing group projects in business school requires both efficiency and flexibility - GroupFlow provides both. The platform's analytics helped us understand our team's productivity patterns, while the customizable workflow templates saved us hours in project setup. The mobile responsiveness meant we could stay updated on-the-go, and the integration with common tools like Google Drive streamlined our document collaboration. The feedback system made peer evaluations straightforward and constructive. It's not just a tool; it's a complete project ecosystem.",
      avatar: "/testimonial-3.jpg",
      rating: 5,
      bgColor: "from-green-50 to-emerald-50",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section
      className="py-24 px-4 bg-gradient-to-b from-white to-emerald-50/50"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <div className="section-heading">
          <h3>Testimonials</h3>
          <h1>What students are saying</h1>
          <p>
            Don't just take our word for it - hear from students who've
            transformed their group work
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 2 },
            }}
            className="!pb-20 testimonial-slider mt-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="h-full p-8 bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-300 relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-20 h-20 bg-emerald-50/50 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-green-50/50 rounded-full blur-xl"></div>

                  <div className="relative z-10">
                    <StarRating rating={testimonial.rating} />
                    <div className="h-[280px] overflow-y-auto mb-8 pr-4 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
                      <p className="text-[16px] text-gray-600 relative">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex items-center pt-4 border-t border-emerald-50">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-emerald-100 ring-offset-2">
                        <Image
                          src={testimonial.avatar}
                          width={48}
                          height={48}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-emerald-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex items-center justify-end gap-4 mt-8">
            <button className="custom-prev bg-white p-3 rounded-full shadow-md hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="custom-next bg-white p-3 rounded-full shadow-md hover:bg-emerald-50 transition-all duration-300 disabled:opacity-50 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-emerald-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          <style jsx global>{`
            .testimonial-slider .swiper-pagination-bullet {
              background: #059669;
            }
            .testimonial-slider .swiper-pagination {
              bottom: 0;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
