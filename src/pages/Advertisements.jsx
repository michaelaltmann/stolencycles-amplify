import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Advertisement } from "../models";

export default function Advertisements() {
  const [advertisements, setAdvertisement] = useState([]);
  useEffect(() => {
    fetchAdvertisements();
    const subscription = DataStore.observe(Advertisement).subscribe(() =>
      fetchAdvertisements()
    );
    return () => subscription.unsubscribe();
  });
  async function fetchAdvertisements() {
    const list = await DataStore.query(Advertisement);
    setAdvertisement(list);
  }
  return (
    <>
      <h3>Advertisements</h3>
      <ul>
        {advertisements.map((advertisement) => {
          return <li>{advertisement.title}</li>;
        })}
      </ul>
    </>
  );
}
