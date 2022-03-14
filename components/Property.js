import React from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";
import millify from "millify";
import Link from "next/link";

import DefaultImages from "../assets/images/house.jpg";

function Property({
  coverPhoto: { url },
  price,
  rooms,
  title,
  baths,
  area,
  agency,
  isVerified,
  externalID,
  rentFrequency,
}) {
  return (
    <Link href={`/property/${externalID}`} alt="link" passHref>
      <div className="cursor-pointer">
        {url ? (
          <Image src={url} width={500} height={340} alt={title} />
        ) : (
          <Image src={DefaultImages} width={500} height={340} alt={title} />
        )}

        <div className="p-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              {isVerified && <MdVerified className="text-green-400" />}
              <p className="font-bold">
                AED {millify(price)}
                {rentFrequency && `/${rentFrequency}`}
              </p>
            </div>
            <div
              className="bg-black rounded-full overflow-hidden shadow-lg"
              style={{ height: "45px", width: "45px" }}
            >
              <Image src={agency.logo.url} width={45} height={45} alt="logo" />
            </div>
          </div>
          <div className="detials text-cyan-300 mb-2">
            <p className="flex items-center gap-2">
              {rooms} <FaBed />| {baths} <FaBath /> | {millify(area)} sqft
            </p>
          </div>
          <h3>
            {title.length > 30 ? `${title.substring(0, 30)}...` : title}...
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default Property;
