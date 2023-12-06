"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

export default function Home() {
  const [value, setValue] = useState< any| null>();

  const [fetchedResults,setFetchedResults]=useState([])

  const onSubmit=()=>{

  }


  return (
    <>
    <div className="flex flex-col gap-4 max-w-sm p-6 mx-auto">
      Type handles 
      <CreatableSelect
        isClearable
        placeholder='Type handle and press tab to add other'
        options={[]}
        isMulti
        onChange={(newValue) => setValue(newValue)}
      />

      <button className="btn bg-green-600 shadow-lg py-2 px-1 text-white">Fetch</button>

      <div>
        List
        {
          fetchedResults?.map((fetchedResult)=><>
          {JSON.stringify(fetchedResult)}</>)
        }

        
      </div>

    </div>
    </>
  );
}
