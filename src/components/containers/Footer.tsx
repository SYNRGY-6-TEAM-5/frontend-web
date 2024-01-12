import { Image } from "@/components/ui/Image";
import { Text } from "@mantine/core";
import { FooterTexts } from "../particles/DataLists";
import { List } from "@/components/ui/List";
import { MainLogo } from "@/assets/svg";
import { Link } from "react-router-dom";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
} from "@phosphor-icons/react";
import app from "../../assets/appdownload.png";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col bg-white">
      <section className="grid h-auto w-full gap-7 px-6 py-16 md:grid-cols-3 md:gap-4 md:px-12 lg:grid-cols-5 lg:gap-0 lg:px-20">
        <div className="flex flex-col items-start gap-4">
          <div className="text-color3 flex w-96 items-center justify-start gap-3 text-3xl font-medium md:text-5xl lg:text-4xl">
            <MainLogo className="h-8 md:h-10" />
            <Text className=" text-color3 text-3xl font-medium md:text-5xl lg:text-4xl">
              AeroSwift
            </Text>
          </div>
          <Text className="text-color4 text-sm">
            {FooterTexts.underLogoText}
          </Text>
        </div>

        <div className="flex flex-col gap-4 md:mt-8 md:items-center">
          <Text className="text-color3 text-xl">
            {FooterTexts.quickLinks.caption}
          </Text>
          <ul className="flex flex-col gap-2">
            {FooterTexts.quickLinks.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:mt-8 md:items-center">
          <Text className="text-color3 text-xl">
            {FooterTexts.contacts.caption}
          </Text>
          <ul className="flex flex-col gap-2 md:ml-12">
            {FooterTexts.contacts.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:mt-8 lg:items-center">
          <Text className="text-color3 text-xl">
            {FooterTexts.more.caption}
          </Text>
          <ul className="flex flex-col gap-2 lg:ml-10">
            {FooterTexts.more.links.map((link, index) => (
              <List key={index} className="text-sm">
                <Link
                  to={link.url}
                  className="text-color4 transition-all duration-300 hover:underline"
                >
                  {link.name}
                </Link>
              </List>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col gap-4 md:mt-8 lg:items-center">
          <ul className="flex w-full items-center gap-4 lg:justify-center">
            <List>
              <Link
                to={`/`}
                className="text-color3 border-color3/50 hover:bg-gradient-to-tr from-color1 to-color2 flex rounded-full border-[1px] p-2.5 transition-all duration-300 ease-in hover:text-white"
              >
                <FacebookLogo size={15} color="currentColor" weight="fill" />
              </Link>
            </List>
            <List>
              <Link
                to={`/`}
                className="text-color3 border-color3/50 hover:bg-gradient-to-tr from-color1 to-color2 flex rounded-full border-[1px] p-2.5 transition-all duration-300 ease-in hover:text-white"
              >
                <InstagramLogo size={15} color="currentColor" weight="fill" />
              </Link>
            </List>
            <List>
              <Link
                to={`/`}
                className="text-color3 border-color3/50 hover:bg-gradient-to-tr from-color1 to-color2 flex rounded-full border-[1px] p-2.5 transition-all duration-300 ease-in hover:text-white"
              >
                <TwitterLogo size={15} color="currentColor" weight="fill" />
              </Link>
            </List>
          </ul>

          <Text className="text-color4 text-base font-light">
            Discover Our App
          </Text>
          <Image
            image={app}
            className="w-28"
            alt="App Download"
            as="a"
            href="/"
          />
        </div>
      </section>
      <Text className="bg-color4 py-6 text-center text-xs font-light text-white">
        Copyright 2023. Jadoo.com. All rights reserved.
      </Text>
    </footer>
  );
};

export default Footer;
