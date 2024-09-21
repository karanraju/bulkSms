// import { useState, useEffect } from "react";
import React, { useEffect, useState } from "react";

const UserFetch = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("userData");
    setData(JSON?.parse(username));
  }, []);

  return [data];
};

export default UserFetch;
