import React from 'react';

function FiltersComponent({jsonData, filterData, setFilters }) {
  
  // FUNCTIONS ---------------------------
  // filter checkbox event handler function
  const onFilterChange = (category, subcategory) => (event) => {
    let newFilters = [...filterData];
    const filterText = category.concat("|", subcategory);
    if (event.target.checked && !newFilters.includes(filterText)) {
      // add selected filter string to array
      newFilters.push(filterText);
    } else {
      // remove filter string from array
      newFilters = filterData.filter(item => item !== filterText);
    }
    
    setFilters(newFilters);
    
  }

  // clear filter event handler function
  const onClearClick = () => {
    setFilters([]);

    // uncheck all checkboxes
    const checkboxes = document.querySelectorAll('.filter-container input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  // toggle filter visiblity in mobile screen
  const onToggleFilter = () => {
    const filterContainer = document.getElementById('filter-container');
    if (filterContainer.style.display === 'block') {
      filterContainer.style.display = 'none';
    } else {
      filterContainer.style.display = 'block';
    }
  }

  // MAIN -------------------------------------
  // no render if no api data
  if (jsonData == null){
    return;
  }

  // tranform api data and get summary of filters and their total counts
  const filterValues = {};
  if (jsonData.hasOwnProperty("products")) {
    jsonData.products.forEach(p => {
      if (p.hasOwnProperty("filter_values")) {
        Object.entries(p.filter_values).forEach(([category, subcategory]) => {          
          if (subcategory != null) {
            if (filterValues.hasOwnProperty(category)) {
              const itemToUpdate = filterValues[category].find(item => item.name === subcategory);
              if (itemToUpdate) {
                itemToUpdate.total = itemToUpdate.total + 1;
              } else {
                filterValues[category].push({name: subcategory, total: 1});
              }
            } else {
              filterValues[category] = [{name: subcategory, total: 1}];
            }
          }
        });
      }
    });
  }
    
  // transform data for UI display / combine filter & filter values for display
  let uiFilters = [];
  if (jsonData.hasOwnProperty("filters")) {
    uiFilters = jsonData.filters;
  }
  uiFilters.forEach(f => {
    f["filter_values"] = filterValues[f.attribute];
  });

  // RENDER ------------------------------------------
  return (
      <div>
        <div id="filter-container" class="filter-container"> 
          <a href="#" class="clearall" onClick={onClearClick}>Clear All</a>
        
          {uiFilters.map((filterData, filterIndex) => (
            <div>
              <h4>{filterData.label}</h4>
              {filterData.filter_values.map((item, itemIndex) => (
                    <div class="filter-row">
                    <div class="filter-column filter-checkbox-column">
                        <input type="checkbox" onChange={onFilterChange(filterData.attribute, item.name)} />
                    </div>
                    <div class="filter-column filter-title-column">
                        <label>{item.name}</label>
                    </div>
                    <div class="filter-column filter-badge-column">
                        <span class="badge">{item.total}</span>
                    </div>
                  </div>
              ))}
              
            </div>
          ))}
        </div>
        <button className="toggle-button" onClick={onToggleFilter}>
          Toggle Filter
        </button>
    </div>
  );
}

export default FiltersComponent;