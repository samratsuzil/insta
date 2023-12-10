"use client";

import React, { useEffect, useState } from "react";

const UserDetail = ({ username }: { username: string }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`/api/?username=${username}`)
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data.user);
      });
  }, [username]);

  return (
    <div className="flex flex-col">
      <div>UserDetail {username}</div>

      {user ? <div>{JSON.stringify(user)}</div> : <>Not found</>}
    </div>
  );
};

export default UserDetail;
