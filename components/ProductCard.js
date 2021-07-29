import React, { useEffect, useState } from "react";
import Link from "next/link";
import { urlFor } from "../utils/sanity";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import FavoriteIcon from "../components/ui/favorite";
import LikedIcon from "../components/ui/liked";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleFavList } from "../action/action";
import { useSelector } from "react-redux";

function ProductCard({
  _id,
  title,
  size,
  mainImage,
  slug,
  defaultProductVariant,
}) {
  const dispatch = useDispatch();
  const [session, loading] = useSession();
  const router = useRouter();
  const [favProduct, setFavProduct] = useState();

  const favList = useSelector((state) => state.favoriteList);

  // console.log("favList", favList);

  const toggleFavHandler = (e, prodId) => {
    if (!session) {
      router.push("/login");
    } else {
      dispatch(toggleFavList(prodId));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden border border-black">
      <div className="h-60 w-full justify-end object-contain">
        <a href={`/products/${slug.current}`}>
          <img src={urlFor(mainImage)} alt="" />
        </a>
        <button onClick={(e) => toggleFavHandler(e, _id)} className="mt-2 ml-2">
          {/* {session && favList.favoriteList.includes(_id) ? (
            <LikedIcon />
          ) : (
            <FavoriteIcon />
          )} */}
        </button>
      </div>
      <div className="mb-4 lg:mt-48 mt-4">
        <h3 className="ml-2 text-lg font-bold uppercase">{title}</h3>
        <div className="flex flex-col">
          <span className="ml-2 text-lg leading-7">
            ${defaultProductVariant?.price}
          </span>
          <span className="ml-2 text-lg leading-7">
            {defaultProductVariant?.size}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
