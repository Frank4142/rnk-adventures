export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4 text-brand-orange">
              RNK Adventures
            </h3>
            <p className="text-gray-300 mb-4">
              Crafting unforgettable adventure experiences since 2024. Your journey to extraordinary begins here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/#tours" className="text-gray-300 hover:text-brand-orange transition-colors">
                  Tours
                </a>
              </li>
              <li>
                <a href="/#gallery" className="text-gray-300 hover:text-brand-orange transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-gray-300 hover:text-brand-orange transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-gray-300 hover:text-brand-orange transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Popular Tours</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Mount Kilimanjaro Trek</li>
              <li>Masai Mara Safari</li>
              <li>Amboseli Expedition</li>
              <li>Lake Nakuru Adventure</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-4 text-lg">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to get adventure updates and special offers
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg bg-brand-teal text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange"
              />
              <button
                type="submit"
                className="bg-brand-orange hover:bg-brand-rust px-4 py-2 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-teal pt-8 text-center text-gray-300">
          {/* <p>&copy; {new Date().getFullYear()} RNK Adventures. All rights reserved. </p> */}
          <p>&copy; RNK Adventures. All rights reserved. </p>

          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-brand-orange transition-colors"><b>Developed by Frankline Gititu</b></a>

          </div>
        </div>
      </div>
    </footer>
  );
}
