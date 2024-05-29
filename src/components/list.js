import React from 'react';

function ListComponent({jsonData, filterData}) {
    // MAIN --------------------------
    
    // no render if no api data
    if (jsonData == null){
        return;
    }

    const baseURL = "https://broadcom.com/";
    let products = [];
    if (jsonData.hasOwnProperty("products")) {
        products = jsonData.products;
    }

    // tranform data for UI display
    const uiProducts = [];
    if (filterData.length > 0) {
        products.forEach(p => {
            let found = false;
            if (p.hasOwnProperty("filter_values")) {
                const arrFilterValues = [];
                Object.entries(p.filter_values).forEach(([key, value]) => {
                    arrFilterValues.push(key + "|" + value);
                });

                // Check if filter string in filterData is present in product filter values
                found = filterData.every(query => arrFilterValues.includes(query));
            }
    
            if (found) {
                uiProducts.push(p);            
            }
        });
    } else {
        // show all products if no filter selected
        uiProducts.push(...products);
    }
    
    // RENDER ----------------------------------------
    return (
        <div>
            <div class="list-container">
            {uiProducts.map(item => (
                <div class="list-item">
                    <div class="list-left-column">
                        <input type="checkbox" />
                    </div>
                <div class="list-right-column">
                    <h3><a href={baseURL + item.url}>{item.part_number}</a></h3>
                    <p>{item.product_summary}</p>
                </div>
            </div>
            ))}
            
            </div>
        </div>
    );
}

export default ListComponent;