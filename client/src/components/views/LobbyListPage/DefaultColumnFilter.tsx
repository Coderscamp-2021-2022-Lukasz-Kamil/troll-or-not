/* eslint-disable react/prop-types */
import React from "react";

export const DefaultColumnFilter = ({
  column: { filterValue, setFilter },
}: any) => {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    />
  );
};
