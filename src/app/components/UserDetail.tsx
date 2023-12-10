"use client";

import React, { useEffect, useState } from "react";

const UserDetail = ({ username }: { username: string }) => {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching", username);
    fetch(`/api/?username=${username}`)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => setError(err));
  }, [username]);

  return (
    <div className="flex flex-col">
      <div>{username}</div>
      {user && (
        <div>
          Username: {JSON.stringify(user?.username)} Follower Count:{" "}
          {user?.edge_followed_by?.count}
        </div>
      )}

      {error && (
        <div>
          Error <>{JSON.stringify(error)}</>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
