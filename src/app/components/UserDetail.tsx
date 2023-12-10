"use client";

import React, { useEffect, useState } from "react";

const UserDetail = ({ username }: { username: string }) => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
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
      {user && <div>User: {JSON.stringify(user)}</div>}
      {error && (
        <div>
          Error <>{JSON.stringify(error)}</>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
