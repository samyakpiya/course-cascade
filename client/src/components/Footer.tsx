import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} Samyak Piya. All rights reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
            scroll={false}
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Footer;
