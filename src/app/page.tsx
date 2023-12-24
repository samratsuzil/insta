"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { AgGridReact } from "ag-grid-react";
import StatsCard from "./components/StatsCard";
import {
  Option,
  colDefs,
  defaultColDef,
  dummyData,
  gridOptions,
} from "./utils";

export default function Home() {
  const [igHandles, setIgHandles] = useState<
    Option[] | [] | null | readonly Option[]
  >([]);
  const [fetchedResults, setFetchedResults] = useState<any>([]);

  const total = fetchedResults?.length;

  const success = fetchedResults?.filter(
    (fetchedResult: any) => fetchedResult.user != null
  ).length;

  const failed = fetchedResults?.filter(
    (fetchedResult: any) => fetchedResult.error != null
  ).length;

  const onSubmit = async () => {
    const userNames = igHandles?.map((value: Option) => value.value);
    setFetchedResults([]);

    const requests = userNames?.map((userName: string) => {
      return fetch(`/api/?username=${userName}`).then((resp) => resp.json());
    });

    if (requests)
      Promise.all(requests).then((responses: any) => {
        const results = responses.flat();
        console.log("responses", results);
        setFetchedResults(results);
      });
  };

  return (
    <div className="flex flex-col gap-10 p-6 max-w-6xl mx-auto">
      <div className="flex gap-10">
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-4xl ">IG Handles</h1>
          <CreatableSelect
            isClearable
            placeholder="Type handle and press tab to add other"
            options={[]}
            value={igHandles}
            isMulti
            onChange={(newValue) => setIgHandles(newValue)}
          />
          <button
            className="btn bg-green-600 shadow-lg py-2 px-1 text-white max-w-xs"
            onClick={() => {
              onSubmit();
            }}
          >
            Fetch
          </button>
        </div>
        <div className="flex flex-1  flex-col gap-4">
          <h1 className="text-4xl ">Stats</h1>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatsCard type="info" title="Total" count={total} />
            <StatsCard type="success" title="Success" count={success} />
            <StatsCard type="danger" title="Failed" count={failed} />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-10 w-full justify-between">
          <h1 className="text-4xl">
            {fetchedResults == dummyData ? "Sample " : ""} Results
          </h1>

          <div className="flex flex-1 flex-row-reverse gap-4 w-full">
            <button
              className="flex btn bg-blue-600 shadow-lg py-2 px-10 text-white w-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setFetchedResults(dummyData);
              }}
              disabled={fetchedResults == dummyData}
            >
              Show Dummy Data
            </button>

            <button
              className="flex btn bg-blue-600 shadow-lg py-2 px-10 text-white w-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setIgHandles([]);
                setFetchedResults([]);
              }}
              disabled={fetchedResults.length == 0}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="h-[800px]">
          <AgGridReact
            className="ag-theme-quartz"
            rowData={
              fetchedResults
                ?.filter((fetchedResult: any) => fetchedResult?.user != null)
                ?.map((fetchedResult: any) => fetchedResult?.user) ?? []
            }
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </div>
    </div>
  );
}
