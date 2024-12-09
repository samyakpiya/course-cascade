import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="loading">
      <Loader2 className="loading__spinner" />
      <span className="loading__text">Loading...</span>
    </div>
  );
}

export default Loading;
