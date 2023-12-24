"use client";

import React, { useEffect, useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import UserDetail from "./components/UserDetail";
import { AgGridReact } from "ag-grid-react";
import StatsCard from "./components/StatsCard";

interface Option {
  readonly label: string;
  readonly value: string;
}

export default function Home() {
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
    };
  }, []);

  const colDefs = [
    { field: "full_name", headerName: "Full Name", filter: true },
    { field: "username", headerName: "Username" },
    { field: "edge_follow_count", headerName: "Following" },
    { field: "edge_followed_by_count", headerName: "Followed By" },
    { field: "profile_pic_url", headerName: "Profile" },
  ];

  const [igHandles, setIgHandles] = useState<
    Option[] | [] | null | readonly never[]
  >();
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
    <div className="flex flex-col gap-4 p-6 max-w-6xl mx-auto">
      <div className="flex gap-10">
        <div className="flex flex-1 flex-col gap-4">
          <h1 className="text-4xl ">Handles</h1>
          <CreatableSelect
            isClearable
            placeholder="Type handle and press tab to add other"
            options={[]}
            isMulti
            onChange={(newValue) => setIgHandles(newValue)}
          />
          {/* <pre>
        {" "}
        Fetched :{" "}
        {JSON.stringify(
          fetchedResults?.map(
            (fetchedResult: any) => fetchedResult.error != null
          ).length,
          null,
          2
        )}
      </pre> */}
          <button
            className="btn bg-green-600 shadow-lg py-2 px-1 text-white"
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
              title="Total Requests"
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
        <h1 className="text-4xl ">Results</h1>
        <div className="h-[800px]">
          <AgGridReact
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
