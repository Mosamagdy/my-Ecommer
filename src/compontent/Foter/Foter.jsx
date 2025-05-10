import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#F3F2F2] text-gray-600 py-3">
      <div className="max-w-screen-xl mx-auto text-center">
        

        <p className="text-sm">&copy; {new Date().getFullYear()} YourCompany. جميع الحقوق محفوظة.</p>

  
               <div className="flex flex-col sm:flex-row md:grid md:grid-cols-2 lg:flex justify-center space-y-2 sm:space-y-0 md:gap-6 mt-3">
                <a className="text-gray-500 hover:text-gray-700 text-sm">Privacy Policy</a>
              <a className="text-gray-500 hover:text-gray-700 text-sm">Terms & Conditions</a>
              <a href="mailto:mosaelwayly@gmail.com" className="text-gray-500 hover:text-gray-700 text-sm">Contact Us</a>
        </div>


         <div className="flex justify-center space-x-6 mt-4">
                      <a href="https://www.facebook.com/musa.magdeyelwauley?mibextid=ZbWKwL" target="_blank">
                    <i className="fab fa-facebook-f text-[#65A30D] text-3xl p-2"></i>
                  </a>
                  <a href="https://www.twitter.com">
                    <i className="fab fa-twitter text-[#65A30D] text-2xl p-2"></i>
                  </a>
                  <a href="https://www.instagram.com/mosamagdeymwsy" target="_blank">
                            <i className="fab fa-instagram text-[#65A30D] text-3xl p-2"></i>
                          </a>
                  <a href="https://www.youtube.com">
                    <i className="fab fa-youtube text-[#65A30D] text-2xl p-2"></i>
                  </a>
                  <a href="http://www.linkedin.com/in/mosa-elwayly-52807029b" target="_blank">
                                <i className="fab fa-linkedin-in text-[#65A30D] text-3xl p-2"></i>
                              </a>
                </div>
      </div>
    </footer>
  );
}