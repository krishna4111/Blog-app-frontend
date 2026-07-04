import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaGithubSquare } from "react-icons/fa";

export default function FooterComponent() {
  return (
    <Footer className="border border-t-8 border-teal-500 dark:text-white">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between p-4 sm:flex md:grid-cols-1">
          <div className="mt-8">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold  dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Krishna's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8  sm: mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="ABOUT" />
              <FooterLinkGroup col>
                <FooterLink href="/">100 JS Projects</FooterLink>
                <FooterLink href="/about">Krishna's Blog</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="FOLLOW US" />
              <FooterLinkGroup col>
                <FooterLink
                  href="https://github.com/krishna4111"
                  target="_blank"
                >
                  GitHub
                </FooterLink>
                <FooterLink
                  href="https://www.linkedin.com/in/krishna-k-168563327/"
                  target="_blank"
                >
                  LinkedIn
                </FooterLink>
                <FooterLink
                  href="https://leetcode.com/u/Krishnamoorthy4111/"
                  target="_blank"
                >
                  Leetcode
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="LEGAL" />
              <FooterLinkGroup col>
                <FooterLink>Privacy Policy</FooterLink>
                <FooterLink>Terms & Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div>
          <FooterCopyright
            href="#"
            by="krishna's Blog"
            year={new Date().getFullYear()}
            className="text-center"
          ></FooterCopyright>
          <div className="flex gap-4 p-2 justify-center">
            <FooterIcon href="#" icon={FaLinkedin} />
            <FooterIcon href="#" icon={FaFacebook} />
            <FooterIcon href="#" icon={IoLogoWhatsapp} />
            <FooterIcon href="#" icon={FaGithubSquare} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
