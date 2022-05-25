import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/ta/tab/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setData(resp))
      .then(console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {data.map((d) => (
        <div>
          {d.userName}, {d.tabName}
        </div>
      ))}
    </div>
  );
}
