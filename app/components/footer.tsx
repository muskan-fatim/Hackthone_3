import React from 'react';

const Footer = () => {
  return (
    <div className="bg-white h-fit">
      <main className="py-12 px-6">
        <div className="container mx-auto">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-500 mb-6 text-center sm:text-left">
            MORENT
          </div>

          {/* Grid layout for footer sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Vision Section */}
            <div>
              <h2 className="text-md text-center sm:text-left">
                Our vision is to provide convenience and help increase your sales business.
              </h2>
            </div>

            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-center sm:text-left">About</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li><a href="#" className="hover:text-blue-500">How it works</a></li>
                <li><a href="#" className="hover:text-blue-500">Featured</a></li>
                <li><a href="#" className="hover:text-blue-500">Partnership</a></li>
                <li><a href="#" className="hover:text-blue-500">Business Relation</a></li>
              </ul>
            </div>

            {/* Community Section */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-center sm:text-left">Community</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li><a href="#" className="hover:text-blue-500">Events</a></li>
                <li><a href="#" className="hover:text-blue-500">Blog</a></li>
                <li><a href="#" className="hover:text-blue-500">Podcast</a></li>
                <li><a href="#" className="hover:text-blue-500">Invite a friend</a></li>
              </ul>
            </div>

            {/* Socials Section */}
            <div>
              <h3 className="text-xl font-bold mb-2 text-center sm:text-left">Socials</h3>
              <ul className="space-y-2 text-center sm:text-left">
                <li><a href="#" className="hover:text-blue-500">Discord</a></li>
                <li><a href="#" className="hover:text-blue-500">Instagram</a></li>
                <li><a href="#" className="hover:text-blue-500">Twitter</a></li>
                <li><a href="#" className="hover:text-blue-500">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Divider Line */}
      <div className="border-t border-gray-300 p-4"></div>

      {/* Footer Bottom Section */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
        <p>&copy; 2024 MORENT. All rights reserved</p>
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-400">Privacy & Policy</a>
          <a href="#" className="hover:text-gray-400">Terms & Condition</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
