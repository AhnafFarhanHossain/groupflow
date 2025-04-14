"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="max-w-full w-full mx-auto p-4 backdrop-blur-sm fixed top-0 right-0 left-0 z-50 bg-white/70 border-b border-gray-300">
      <div className="max-w-[1300px] mx-auto flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Image
            src={"/GroupFlow-Logo-Transparent.png"}
            width={150}
            height={150}
            alt="GroupFlow Logo"
            className="max-h-[30px] md:max-h-[40px] object-cover border-r-1 border-gray-200 pointer-none"
          />
          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href={"#"}
              className="text-gray-600 hover:text-green-700 transition text-sm"
            >
              Home
            </Link>
            <Link
              href={"#features"}
              className="text-gray-600 hover:text-green-700 transition text-sm"
            >
              Features
            </Link>
            <Link
              href={"#testimonials"}
              className="text-gray-600 hover:text-green-700 transition text-sm"
            >
              Testimonials
            </Link>
            <Link
              href={"#pricing"}
              className="text-gray-600 hover:text-green-700 transition text-sm"
            >
              Pricing
            </Link>
            <Link
              href={"#contact"}
              className="text-gray-600 hover:text-green-700 transition text-sm"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-green-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-md p-4 z-50">
            <div className="flex flex-col gap-4">
              <Link
                href={"#"}
                className="text-gray-600 hover:text-green-700 transition"
              >
                Home
              </Link>
              <Link
                href={"#"}
                className="text-gray-600 hover:text-green-700 transition"
              >
                About
              </Link>
              <Link
                href={"#"}
                className="text-gray-600 hover:text-green-700 transition"
              >
                Features
              </Link>
              <Link
                href={"#features"}
                className="text-gray-600 hover:text-green-700 transition"
              >
                Testimonials
              </Link>
              <Link
                href={"#"}
                className="text-gray-600 hover:text-green-700 transition"
              >
                Contact
              </Link>
              <Button className="cursor-pointer bg-green-700 text-white hover:bg-green-800 w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}

        {/* Desktop Button */}
        <div className="hidden md:flex items-center gap-6">
          <Link href={"/authentication"}>
            <Button className="px-6 py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-medium shadow-md hover:shadow-lg cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
