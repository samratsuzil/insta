"use client";

import axios from "axios";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

export default function Home() {
  const [value, setValue] = useState<any | null>();

  const [fetchedResults, setFetchedResults] = useState<any>([]);

  const onSubmit = async () => {
    await fetch(`/api/followers?username=${value[0].value}`,).then((resp) => resp.json()).then(data=>{setFetchedResults([data])});
  };

  return (
    <>
      <div className="flex flex-col gap-4 max-w-sm p-6 mx-auto">
        {JSON.stringify(value)}
        <CreatableSelect
          isClearable
          placeholder="Type handle and press tab to add other"
          options={[]}
          isMulti
          onChange={(newValue) => setValue(newValue)}
        />

        <button
          className="btn bg-green-600 shadow-lg py-2 px-1 text-white"
          onClick={() => onSubmit()}
        >
          Fetch
        </button>

        <div>
          List
          {/* {fetchedResults?.map((fetchedResult) => ( */}
            <>{JSON.stringify(fetchedResults)}</>
          {/* ))} */}
        </div>
      </div>
    </>
  );
}
