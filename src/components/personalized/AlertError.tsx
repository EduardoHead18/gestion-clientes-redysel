import React from "react";

export const AlertError = ({ message }: { message: string }) => {
  return <p className="text-red-500 text-sm">{String(message)}</p>;
};
