import React from "react";
import { Link } from "react-router";
import { Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-base-content/10 text-sm text-base-content">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-primary">ThinkBoard</span>. All
            rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="mailto:satindersinghsall111@gmail.com"
            className="hover:text-primary transition"
          >
            <Mail className="w-5 h-5" />
          </Link>
          <Link
            to="https://github.com/SatinderSinghSall"
            target="_blank"
            className="hover:text-primary transition"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
