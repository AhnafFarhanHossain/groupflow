import Navbar from "./components/Navbar";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { cloneElement } from "react";
import Testimonials from "./components/Testimonials";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import Footer from "./components/Footer";

function Home() {
  const features = [
    {
      name: "Project Creation & Management",
      description:
        "Create and manage projects with deadlines, descriptions, and status control.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="s</svg>ize-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>
      ),
    },
    {
      name: "Task Assignment",
      description:
        "Break projects into tasks, assign them to members, and track deadlines.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
          />
        </svg>
      ),
    },
    {
      name: "Dashboard",
      description:
        "A personalized workspace showing tasks, deadlines, and project overview.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
          />
        </svg>
      ),
    },
    {
      name: "Authentication",
      description:
        "Secure authentication using email or Google with session handling.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
    },
    {
      name: "Real-time Chat Application",
      description:
        "Integrated chat application for real-time communication between members.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      ),
    },
    {
      name: "Progress Tracking",
      description:
        "Visualize task and project completion via progress indicators.",
      svgIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <main
        className="w-full min-h-screen relative bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden"
        id="home"
      >
        <Navbar />
        <div className="max-w-[1300px] mx-auto px-6 py-36">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <h3 className="py-2 px-4 bg-green-100/80 text-green-800 rounded-full text-sm max-w-fit flex items-center gap-2 border border-green-200 backdrop-blur-sm">
                Effectively manage group projects and collaboration tasks
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </h3>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 sm:leading-12 md:leading-14 xl:leading-16">
                Simplify Group Projects and{" "}
                <span className="text-green-700">Collaboration</span> for
                Students
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl">
                GroupFlow is a powerful yet easy-to-use project management
                platform designed specifically for students and teams. Manage
                tasks, deadlines, and teams all in one place.
              </p>

              <div className="flex gap-4 pt-4">
                <Button className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg cursor-pointer">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg font-medium shadow-md hover:shadow-lg cursor-pointer"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="flex-1">
              <Image
                src={"/home-illustration.jpeg"}
                width={600}
                height={500}
                alt="Hero Image Illustration"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </main>
      <section
        id="features"
        className="py-16 bg-white px-6 max-w-[1300px] min-h-screen mx-auto"
      >
        <div className="section-heading">
          <h3>Accomplish group tasks with ease</h3>
          <h1>Powerful Features</h1>
          <p>
            Explore the tools and functionalities designed to simplify your
            group projects and collaboration.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div
              className="p-6 rounded-lg border border-gray-100 hover:border-green-200 transition-all duration-200 hover:-translate-y-0.5"
              key={index}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-green-50 text-green-600">
                {cloneElement(feature.svgIcon, {
                  className: "w-6 h-6",
                })}
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.name}
              </h2>

              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section 
        id="how-it-works" 
        className="bg-gradient-to-br from-green-50 to-emerald-50"
      >
        <div className="py-16 px-6 max-w-[1300px] min-h-screen mx-auto">
          <div className="section-heading">
            <h3 className="text-green-700">
              Making your life and the lives of your team members easier.
            </h3>
            <h1 className="text-gray-800">How it works</h1>
            <p className="text-gray-600">
              GroupFlow utilizes an efficient task management dashboard with
              assignable tasks for group members and features a built-in
              real-time chat application.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 mt-16">
            {/* Steps Section */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8">
              {[
                {
                  number: "1",
                  title: "Create a Group",
                  description:
                    "Bring your team together by creating a group for your project. Invite friends or classmates via email and set your roles.",
                },
                {
                  number: "2",
                  title: "Plan & Assign Tasks",
                  description:
                    "Split the workload — create tasks, set deadlines, and assign them to your teammates. Stay on top of everything in a shared dashboard.",
                },
                {
                  number: "3",
                  title: "Collaborate & Track Progress",
                  description:
                    "Communicate, give feedback, and monitor progress — all in one place. Get notified and see tasks move forward together.",
                },
              ].map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="w-14 h-14 rounded-lg bg-white flex-shrink-0 flex items-center justify-center text-green-700 transition-colors duration-200 group-hover:bg-green-100 shadow-sm">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Image Section */}
            <div className="flex-1">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/groupwork.jpeg"
                  width={600}
                  height={400}
                  alt="Team collaboration illustration"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
      <section
        id="pricing"
        className="w-full bg-gradient-to-br from-green-950 to-green-900 text-white relative"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="py-24 px-6 max-w-[1300px] mx-auto relative">
          <div className="section-heading-secondary text-center space-y-4 mb-16">
            <h3 className="text-green-400 font-medium">Pricing Plans</h3>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h1>
            <p className="text-green-200/80">
              Choose the perfect plan for your team's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* Starter Plan */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-300 hover:bg-white/10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Starter</h3>
                  <p className="text-green-300/80">
                    Perfect for small student groups
                  </p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">Free</span>
                  <span className="text-green-300/80 ml-2">/forever</span>
                </div>

                <Button className="w-full bg-white/10 hover:bg-white/20">
                  Get Started
                </Button>

                <ul className="space-y-3">
                  {[
                    "Up to 5 team members",
                    "3 active projects",
                    "Basic task management",
                    "Real-time chat",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="group relative bg-green-600/20 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 transition-all duration-300 hover:bg-green-600/30">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500 rounded-full text-sm font-medium">
                Popular
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pro</h3>
                  <p className="text-green-300/80">For serious student teams</p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$10</span>
                  <span className="text-green-300/80 ml-2">/month</span>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600">
                  Upgrade Now
                </Button>

                <ul className="space-y-3">
                  {[
                    "Up to 15 team members",
                    "Unlimited projects",
                    "Advanced analytics",
                    "File sharing",
                    "Priority support",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 transition-all duration-300 hover:bg-white/10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                  <p className="text-green-300/80">
                    For large student organizations
                  </p>
                </div>

                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$30</span>
                  <span className="text-green-300/80 ml-2">/month</span>
                </div>

                <Button className="w-full bg-white/10 hover:bg-white/20">
                  Contact Sales
                </Button>

                <ul className="space-y-3">
                  {[
                    "Unlimited team members",
                    "Unlimited projects",
                    "Custom workflows",
                    "API access",
                    "Dedicated account manager",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="w-full bg-gradient-to-br from-green-50 to-emerald-100 relative"
      >
        <div className="py-24 px-6 max-w-[1300px] mx-auto">
          <div className="section-heading text-center">
            <h3 className="text-green-700">Ready to get started?</h3>
            <h1 className="text-gray-800">Begin Your Journey Today</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of students who are already using GroupFlow to
              manage their projects efficiently and collaborate seamlessly.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-[160px] bg-green-700 hover:bg-green-800 text-white"
            >
              Get Started
            </Button>
            <Link href="mailto:ahnaffarhanhossain@gmail.com">
              <Button
                variant="outline"
                size="lg"
                className="w-[160px] border-green-700 text-green-700 hover:bg-green-50"
              >
                Contact
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-600" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-600" />
              <span>Free for small teams</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-600" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
