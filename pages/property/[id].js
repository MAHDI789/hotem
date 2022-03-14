import React, { useRef, useEffect, useState } from "react";
import { URL, fetchApi } from "../../utils/fetchApi";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import Image from "next/image";
import millify from "millify";
import { FaBath, FaBed } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import Link from "next/link";

const divContainer = React.createRef();
const childDivContainer = React.createRef();
function PropertyId({ PropertyId }) {
  const [width, setWidth] = useState(0);
  const [counter, setcounter] = useState(0);

  useEffect(() => {
    console.log(counter);
    if (counter > 17) {
      setcounter(0);
    }
    if (counter < 0) {
      setcounter(17);
    }
    childDivContainer.current.style.marginLeft = `-${width * counter}px`;
  }, [counter]);
  useEffect(() => {
    const divWidth =
      divContainer.current.getBoundingClientRect().width *
      childDivContainer.current.children.length;
    setWidth(divContainer.current.getBoundingClientRect().width);
    childDivContainer.current.style.width = `${divWidth}px`;
  }, []);
  return (
    <>
      <h1 className="text-center mt-4 font-bold text-2xl underline">
        <Link href={"/"}>
          <a>Home</a>
        </Link>
      </h1>
      <div style={{ maxWidth: "60%", margin: "10px auto" }}>
        <section className="relative">
          <div className="m-10 parent overflow-hidden" ref={divContainer}>
            <div
              className="all flex"
              ref={childDivContainer}
              style={{ transition: "all 0.7s" }}
            >
              {PropertyId.photos.map((item) => {
                return (
                  <div
                    className="bg-black"
                    key={item.id}
                    style={{ height: "450px", width: `${width}px` }}
                  >
                    <Image
                      src={item.url}
                      alt="title"
                      width={width}
                      height={450}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="absolute flex justify-between items-center"
            style={{
              width: "100%",
              height: "100%",
              top: "0",
              fontSize: "40px",
            }}
          >
            <button onClick={() => setcounter((prev) => prev - 1)}>
              <AiFillLeftCircle className="text-red-500" />
            </button>
            <button onClick={() => setcounter((prev) => prev + 1)}>
              <AiFillRightCircle className="text-red-500" />
            </button>
          </div>
        </section>
        <div className="mt-12">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              {PropertyId.isVerified && (
                <MdVerified className="text-green-400" />
              )}
              <p className="font-bold">
                AED {millify(PropertyId.price)}
                {PropertyId.rentFrequency && `/${PropertyId.rentFrequency}`}
              </p>
            </div>
            <div
              className="bg-black rounded-full overflow-hidden shadow-lg"
              style={{ height: "45px", width: "45px" }}
            >
              <Image
                src={PropertyId.agency.logo.url}
                width={45}
                height={45}
                alt="logo"
              />
            </div>
          </div>
          <div className="detials text-cyan-300 mb-4">
            <p className="flex items-center gap-2">
              {PropertyId.rooms} <FaBed />| {PropertyId.baths} <FaBath /> |{" "}
              {millify(PropertyId.area)} sqft
            </p>
          </div>
          <h3 className="mb-2 font-bold">
            {PropertyId.title.length > 30
              ? `${PropertyId.title.substring(0, 60)}...`
              : PropertyId.title}
            ...
          </h3>
          <p className="leading-relaxed text-zinc-600 mb-6">
            {PropertyId.description}
          </p>
          <div className="dt grid grid-cols-2 gap-6 mb-8">
            <div className="flex justify-between uppercase">
              <p className="text-zinc-600 font-medium">type</p>
              <h3 className="font-bold">{PropertyId.type}</h3>
            </div>
            <div className="flex justify-between uppercase">
              <p className="text-zinc-600 font-medium">purpose</p>
              <h3 className="font-bold">{PropertyId.purpose}</h3>
            </div>
          </div>
          <p className="text-xl font-bold mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2 text-white">
            {PropertyId.amenities.map((item) => {
              return item.amenities.map((amenty, id) => {
                return (
                  <p className="p-2 bg-black" key={amenty.id}>
                    {amenty.text}
                  </p>
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${URL}/properties/detail?externalID=${id}`);
  return {
    props: {
      PropertyId: data,
    }, // will be passed to the page component as props
  };
}
export default PropertyId;
