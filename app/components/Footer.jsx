import Link from "next/link";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "How it Works", href: "#how-it-works" },
      { name: "Pricing", href: "#pricing" },
      { name: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Community", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-emerald-50/50 border-t border-gray-200">
      <div className="max-w-[1300px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">GroupFlow</h2>
            <p className="text-gray-600 max-w-md">
              Simplifying group projects and collaboration for students. Manage tasks, deadlines, and teams all in one place.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-green-700 transition-colors">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-green-700 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} GroupFlow. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="text-sm text-gray-600 hover:text-green-700">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-green-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
