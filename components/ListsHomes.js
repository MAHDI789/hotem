import React from "react";
import Link from "next/link";
import Image from "next/image";

function ListsHomes({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
  id,
}) {
  return (
    <div className="font-mono flex justify-center flex-wrap m-10 gap-4">
      <Image src={imageUrl} width={500} height={300} alt="banner" />

      <div className="grid place-items-center">
        <div>
          <span className="inline-block pb-4 text-2xl text-slate-600 uppercase">
            {purpose}
          </span>
          <h1 className="pb-4 text-xl font-bold">
            {title1} {title2}
          </h1>
          <p className="pb-4">
            {desc1}
            <br />
            {desc2}
          </p>
          <button className="bg-black text-white rounded shadow-md p-2">
            <Link href={`#${id}`}>
              <a>{buttonText}</a>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListsHomes;
