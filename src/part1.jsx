import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://apitest.likewatt-infra.com/entry-test/1"
        );
        const res = response.data.data;
        console.log("output", sortData(res));
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchData();
  }, []);

  function sortArraysOfOjects(obj) {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].sort();
        // console.log(obj);
      } else if (typeof obj[key] === "object") {
        sortArraysOfOjects(obj[key]);
      }
    }
  }

  const inSort = (a, b) => {
    if (typeof a === typeof b) {
      // console.log('aaa', typeof a);
      // console.log('bbb', typeof b);
      if (typeof a === "string" || typeof a === "object" || Array.isArray(a)) {
        return JSON.stringify(a).localeCompare(JSON.stringify(b));
      } else if (typeof a === "number") {
        return a - b;
      }
    }
  };

  function sortData(data) {
    const simpleCharacters = data.filter(
      (item) => typeof item === "string" && item.length === 1
    );
    simpleCharacters.sort(inSort);
    const strings = data.filter(
      (item) => typeof item === "string" && item.length > 1
    );

    strings.sort(inSort);
    const numbers = data.filter((item) => typeof item === "number");
    // console.log('numm',numbers);
    numbers.sort(inSort);
    const objects = data.filter(
      (item) => typeof item === "object" && !Array.isArray(item)
    );
    // console.log('objj',objects);
    objects.forEach((item) => sortArraysOfOjects(item));
    const arrays = data.filter((item) => Array.isArray(item));
    arrays.forEach((item) => item.sort());
    arrays.sort(inSort);
    // console.log('arrays',arrays);
    // console.log('sorted',_arrays);
    return [
      ...simpleCharacters,
      "////////////////////////////////////////////////",
      ...strings,
      "////////////////////////////////////////////////",
      ...numbers,
      "////////////////////////////////////////////////",
      ...objects,
      "////////////////////////////////////////////////",
      ...arrays,
    ];
  }

  return (
    <div>
      <h1>J'ai mis le output dans la console</h1>
    </div>
  );
};

export default App;
