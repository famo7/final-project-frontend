import React from "react";
export default function Home({ isManager }) {
  if (!isManager) {
    return <h1>normal employee</h1>;
  } else {
    return <h1>manager</h1>;
  }
}
