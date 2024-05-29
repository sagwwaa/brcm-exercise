import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ListComponent from './components/list';
import FiltersComponent from './components/filters';


function App() {
  const url = "http://localhost:5001/api/test";

  const [data, setData] = useState(null); // state for api data
  const [filters, setFilters] = useState([]); // state for selected  filters

  const updateFilterState = (newValue) => {
    setFilters(newValue); // callback function to update the shared state
  };
  
  useEffect(() => {
    // Make an API call
    axios.get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
       <div class="container">
        <div class="column left-column">
          <FiltersComponent jsonData={data} filterData={filters} setFilters={updateFilterState} />
        </div>
        <div class="column right-column">
          <ListComponent jsonData={data} filterData={filters} />            
        </div>
      </div>
    </div>
  );
}

export default App;
