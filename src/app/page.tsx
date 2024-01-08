"use client";

import React, { useEffect, useRef, useState } from "react";
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

import Papa from "papaparse";

export default function Home() {
  const [igHandles, setIgHandles] = useState<
    Option[] | [] | null | readonly Option[]
  >([]);
  const [parsedResults, setParseResults] = useState<
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
        setFetchedResults(results);
      });
  };

  const [selectedFile, setSelectedFile] = useState<FileList | null>(null);

  useEffect(() => {
    var file = selectedFile?.[0];
    if (file)
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          !!Array.isArray(results.data) &&
            setIgHandles(
              results.data?.map((result: any) => {
                return {
                  label: result.username ?? undefined,
                  value: result.username ?? undefined,
                };
              })
            );
        },
      });
  }, [selectedFile]);

  const inputFileRef = useRef<any>(null);

  return (
    <div className="flex flex-col gap-10 p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 text-center text-7xl font-bold mb-10 underline underline-offset-8 text-teal-600">
        IG Followers Count
      </div>
      <div className="grid gap-10 ">
        <div className="grid gap-10">
          <h1 className="text-4xl ">IG Handles</h1>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 justify-between">
            <CreatableSelect
              className="flex-1"
              isClearable
              placeholder="Type handle and press tab to add other"
              options={[]}
              value={igHandles}
              isMulti
              onChange={(newValue) => setIgHandles(newValue)}
            />

            <label className="flex gap-4">
              Import CSV:
              <input
                ref={inputFileRef}
                type="file"
                accept=".csv"
                id="csv"
                className="form-control"
                onChange={(e) => {
                  setSelectedFile(e.target.files);
                }}
              />
            </label>
          </div>

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
          <h1 className="text-4xl ">Statistics</h1>
          <div className="grid gap-4  grid-cols-2 lg:grid-cols-4">
            <StatsCard type="info" title="Total" count={total} />
            <StatsCard type="info" title="Total" count={total} />
            <StatsCard type="success" title="Success" count={success} />
            <StatsCard type="danger" title="Failed" count={failed} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <h1 className="text-4xl">
            {fetchedResults == dummyData ? "Sample " : ""} Results
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              className="btn bg-blue-600 shadow-lg py-2 px-10 text-white w-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setFetchedResults(dummyData);
              }}
              disabled={fetchedResults == dummyData}
            >
              Show Dummy Data
            </button>

            <button
              className="btn bg-blue-600 shadow-lg py-2 px-10 text-white w-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                setIgHandles([]);
                setFetchedResults([]);
                inputFileRef.current.value = "";
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
