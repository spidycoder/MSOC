import React from "react";
import { members } from "@/constants/index";
import Image from "next/image";
import linkedInIcon from "@/public/images/linkedIn.png";
import instaIcon from "@/public/images/instaLogo.png"
import emailicon from "@/public/images/emailIcon.png"
import Link from "next/link";

const Members = () => {
  return (
    <div className="bg-slate-200">
      <h1 className="text-3xl font-bold border-b-2 underline text-center pt-8">
        Our Members
      </h1>
      <div className="mt-10 pb-10">
        <div className="flex flex-wrap sm:flex-col sm:gap-6 justify-evenly">
          {members.map((member) => (
            <div className="text-center mb-4" key={member.name}>
              
              <div className="flex flex-col items-center">
                <Image
                  src={member.imageUrl}
                  alt="member"
                  className="mx-auto rounded-full"
                  width={44}
                  height={44}
                />
                <h1 className="font-bold text-2xl mt-2">{member.name}</h1>
                <p className="text-medium">{member.Position}</p>
                <div className="flex flex-row gap-2 text-center mt-2">
                  <Link href={member.Instagram}>
                    <Image src={instaIcon} alt="insta" width={24} height={24} />
                  </Link>
                  <Link href={member.LinkedIn}>
                    <Image
                      src={linkedInIcon}
                      alt="insta"
                      width={24}
                      height={24}
                    />
                  </Link>
                  <a href={`mailto:${member.email}`}>
                    <Image src={emailicon} alt="email" width={24} height={24} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Members;
