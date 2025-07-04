import { useEffect, useState } from 'react';

function projects() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <h2>About Page</h2>
      {data ? <p>{data.title}</p> : <p>Loading...</p>}
    </div>
  );
}

export default projects;