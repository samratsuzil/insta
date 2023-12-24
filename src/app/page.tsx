"use client";

import React, { useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { AgGridReact } from "ag-grid-react";
import StatsCard from "./components/StatsCard";

interface Option {
  readonly label: string;
  readonly value: string;
}

const dummyData = [
  {
    user: {
      username: "angeli123",
      full_name: "Angelina Jolie",
      edge_follow_count: 100,
      edge_followed_by_count: 1000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "jack12",
      full_name: "Jack Ritcher",
      edge_follow_count: 200,
      edge_followed_by_count: 2000,
      profile_pic_url: "",
    },
    error: null,
  },
  {
    user: {
      username: "Winson",
      full_name: "Winson Coster",
      edge_follow_count: 300,
      edge_followed_by_count: 3000,
      profile_pic_url: "",
    },
    error: null,
  },
];

export default function Home() {
  const defaultColDef = useMemo(() => {
    return {
      sortable: false,
      filter: false,
    };
  }, []);

  const colDefs = [
    {
      field: "username",
      headerName: "Username",
      filter: "agTextColumnFilter",
    },
    {
      field: "full_name",
      headerName: "Full Name",
      filter: "agTextColumnFilter",
    },
    {
      field: "edge_follow_count",
      headerName: "Following",
    },
    {
      field: "edge_followed_by_count",
      headerName: "Followed By",
      sortable: true,
    },
    { field: "profile_pic_url", headerName: "Profile" },
  ];

  const [igHandles, setIgHandles] = useState<
    Option[] | [] | null | readonly Option[]
  >([]);
  const [fetchedResults, setFetchedResults] = useState<any>([]);

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
            <StatsCard
              type="info"
              title="Total"
              count={fetchedResults?.length}
            />
            <StatsCard
              type="success"
              title="Success"
              count={
                fetchedResults?.filter(
                  (fetchedResult: any) => fetchedResult.user != null
                ).length
              }
            />
            <StatsCard
              type="danger"
              title="Failed"
              count={
                fetchedResults?.filter(
                  (fetchedResult: any) => fetchedResult.error != null
                ).length
              }
            />
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
              fetchedResults?.map(
                (fetchedResult: any) => fetchedResult?.user
              ) ?? []
            }
            defaultColDef={defaultColDef}
            columnDefs={colDefs}
          />
        </div>
      </div>
    </div>
  );
}
