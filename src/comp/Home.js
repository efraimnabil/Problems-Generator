import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const Home = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://codeforces.com/api/problemset.problems')
      .then(res => res.json())
      .then(data => {
        setProblems(data.result.problems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching problems:', error);
        setLoading(false);
      });
  }, []);

  const [numProblems, setNumProblems] = useState(1);
  const [rate, setRate] = useState(800);

  const handleNumProblemsChange = e => {
    setNumProblems(parseInt(e.target.value));
  };

  const handleRateChange = e => {
    setRate(parseInt(e.target.value));
  };

  const generateProblems = () => {
    setLoading(true);

    let filteredProblems = problems.filter(problem => {
      return problem.rating === rate;
    });

    let generatedProblems = [];
    // get numProblems random problems has rating == rate
    for (let i = 0; i < numProblems; i++) {
      let randomIndex = Math.floor(Math.random() * filteredProblems.length);
      generatedProblems.push(filteredProblems[randomIndex]);
      filteredProblems.splice(randomIndex, 1);
    }

    setTimeout(() => {
      setLoading(false);
      setSelectedProblems(generatedProblems);
    }, 1000);
    console.log(generatedProblems);
  };

  return (
    <div className="home">
      <h1>Codeforces Problems</h1>

      <div className="settings">
        <p>Number of Problems (1 - 20)</p>
        <span>{numProblems}</span>
        <input
          type="range"
          min={1}
          max={10}
          value={numProblems}
          onChange={handleNumProblemsChange}
        />

        <p>Rate of Problems (800 - 3000)</p>
        {/*step by 100*/}
        <span>{rate}</span>
        <input
          type="range"
          min={800}
          max={3000}
          step={100}
          value={rate}
          onChange={handleRateChange}
        />
        <button onClick={generateProblems}>Generate Problems</button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <ul>
          {selectedProblems.map((problem, index) => (
            <li key={problem.contestId + problem.index}>
              <a
                href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <aside className="problem">
                  <span>Problem Name: </span>
                  <span>Rate: </span>
                </aside>
                <aside className="problem">
                  <span>{problem.name}</span>
                  <span>{problem.rating}</span>
                </aside>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
