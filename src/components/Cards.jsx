

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import Loading from "./Loading";
import { setPageItems } from "../redux/slices/PageItems";
import { GrNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

import {
  setCurrentPage,
  setNextPage,
  setPreviousPage,
} from "../redux/slices/ProductSlice";

const Products = ({ loading, isLoading, setIsLoading }) => {
  const dispatch = useDispatch();
  const { productItems, currentPage } = useSelector((state) => state.items);
  const { singlePageItems } = useSelector((state) => state.pageItems);
  const [activeButton, setActiveButton] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    const numberOne = (currentPage - 1) * itemsPerPage;
    const numberTwo = numberOne + 6;
    const products = productItems.slice(numberOne, numberTwo);
    dispatch(setPageItems(products));
    setIsLoading(false);
  }, [currentPage, dispatch, productItems, setIsLoading]);

  function handlePageChange(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
    setActiveButton(pageNumber);
  }

  const postsPerPage = 6;
  const totalPages = Math.ceil(100 / postsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div>
        {isLoading || loading ? (
          <div className="flex items-center justify-center h-screen">
            <Loading/>
          </div>
        ) : singlePageItems.length > 0 ? (
          <div className="grid grid-cols-3 max-w-6xl p-2 mx-auto gap-4 min-h-[80vh]">
            {singlePageItems.map((post) => (
              <div key={post.id} className="w-full">
                <Card post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p>No Data Found</p>
          </div>
        )}
      </div>

      <div className="font-bold mx-auto w-fit mt-4">
        {currentPage === 1 ? (
          <button className="bg-black hover:bg-slate-500 hover:scale-125 hidden text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" disabled>
            <GrFormPrevious />
          </button>
        ) : (
          <button className="bg-black hover:bg-slate-500 hover:scale-125 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => dispatch(setPreviousPage())}>
            <GrFormPrevious />
          </button>
        )}

        {pageNumbers.slice(currentPage - 1, currentPage + 2).map((number) => (
          <button
            className={`m-2 w-7 rounded-full border-black border font-bold ${activeButton === number ? "bg-blue-500 text-white" : ""}`}
            key={number}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </button>
        ))}

        {currentPage === totalPages ? (
          <button className="bg-black hover:bg-slate-500 hover:scale-125 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
            <GrNext />
          </button>
        ) : (
          <button className="bg-black hover:bg-slate-500 hover:scale-125 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => dispatch(setNextPage())}>
            <GrNext />
          </button>
        )}
      </div>
    </>
  );
};

export default Products;
