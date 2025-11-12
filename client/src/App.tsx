import { useEffect, useState } from "react";

function App() {
  const [test, setTest] = useState<number[]>();

  useEffect(() => {
    fetch("http://localhost:8080/api")
      .then((data) => data.json())
      .then((data) => {
        setTest(data.test);
      });
  }, []);

  return (
    <div>
    </div>
  );
}

export default App;
