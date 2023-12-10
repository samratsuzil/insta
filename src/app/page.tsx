"use client";

import axios from "axios";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import UserDetail from "./components/UserDetail";

interface Option {
  readonly label: string;
  readonly value: string;
}

export default function Home() {
  const [igHandles, setIgHandles] = useState<
    Option[] | [] | null | readonly never[]
  >();
  // const [fetchedResults, setFetchedResults] = useState<any>([]);

  // const onSubmit = async () => {
  //   const userNames = igHandles?.map((value: Option) => value.value);
  //   setFetchedResults([]);

  //   userNames?.map((username: string) => {
  //     fetch(`/api/?username=${username}`)
  //       .then((resp) => resp.json())
  //       .then((data) => {
  //         setFetchedResults(data);
  //       });
  //   });
  // };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-xl mx-auto">
      <CreatableSelect
        isClearable
        placeholder="Type handle and press tab to add other"
        options={[]}
        isMulti
        onChange={(newValue) => setIgHandles(newValue)}
      />

      {/* <button
          className="btn bg-green-600 shadow-lg py-2 px-1 text-white"
          onClick={() => {}}
        >
          Fetch
        </button> */}

      {igHandles && (
        <div className="flex flex-col">
          {igHandles?.map((igHandleOtion: any) => (
            <UserDetail
              username={igHandleOtion.value}
              key={igHandleOtion.value}
            />
          ))}
        </div>
      )}
    </div>
  );
}
