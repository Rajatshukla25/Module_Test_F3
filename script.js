async function fetchApiData() {
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

// Select the table
let table = document.getElementById("tbody");

// Create the table
async function tableData() {
    const res = await fetchApiData();

    res.map((value) => {
        let trow = document.createElement("tr");
        trow.innerHTML = `<td align="left"><img align="center" width = "25px" src ="${value.image}">&nbsp; ${value.name}</td>
                        <td align="left">${value.symbol.toUpperCase()}</td>
                        <td>$${value.current_price}</td>                      
                        <td>$${value.total_volume}</td>
                        <td width ="150px"class="${value.price_change_percentage_24h > 0 ? "positiveValues" : "negativeValues"}">${Number(value.price_change_percentage_24h).toFixed(2)}%</td>
                        <td>Mkt Cap : $${value.market_cap}</td>`
        table.append(trow);
    })
}

// Call the function to initially populate the table
tableData();         

// Search functionality
function searchData() {
    const searchInput = document.getElementById("searchInput").value.trim().toLowerCase();
    const rows = document.querySelectorAll("#tbody tr");

    rows.forEach((row) => {
        const name = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        const symbol = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        if (name.includes(searchInput) || symbol.includes(searchInput)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}


// Sort by Market Cap functionality
function sortDataByMarketCap() {
    const rows = Array.from(document.querySelectorAll("#tbody tr"));

    rows.sort((a, b) => {
        const marketCapA = Number(a.querySelector("td:nth-child(6)").textContent.slice(9).replace(/\D/g, ''));
        const marketCapB = Number(b.querySelector("td:nth-child(6)").textContent.slice(9).replace(/\D/g, ''));
        return marketCapB - marketCapA; // Change here
    });

    rows.forEach(row => table.appendChild(row));
}

// Sort by Percentage Change functionality
function sortDataByPercentageChange() {
    const rows = Array.from(document.querySelectorAll("#tbody tr"));

    rows.sort((a, b) => {
        const percentageChangeA = Number(a.querySelector("td:nth-child(5)").textContent.slice(0, -1));
        const percentageChangeB = Number(b.querySelector("td:nth-child(5)").textContent.slice(0, -1));
        return percentageChangeB - percentageChangeA;
    });

    rows.forEach(row => table.appendChild(row));
}
