const list = document.getElementById("scholarshipList");
const search = document.getElementById("search");
const classFilter = document.getElementById("classFilter");
const categoryFilter = document.getElementById("categoryFilter");

let scholarships = [];

function displayScholarships(data) {
  list.innerHTML = "";
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${item.name}</h2>
      <p><strong>Amount:</strong> ₹${item.amount}</p>
      <p><strong>Deadline:</strong> ${item.deadline}</p>
      <p><strong>Class:</strong> ${item.class}</p>
      <p><strong>Category:</strong> ${item.category}</p>
      <button onclick="window.open('${item.link}', '_blank')">Apply Now</button>
    `;
    list.appendChild(card);
  });
}

function applyFilters() {
  const query = search.value.toLowerCase();
  const selectedClass = classFilter.value;
  const selectedCategory = categoryFilter.value;

  const filtered = scholarships.filter(item =>
    item.name.toLowerCase().includes(query) &&
    (selectedClass === "" || item.class === selectedClass) &&
    (selectedCategory === "" || item.category === selectedCategory)
  );

  displayScholarships(filtered);
}

// Live fetch from JSON file
fetch("scholarships.json")
  .then(res => res.json())
  .then(data => {
    scholarships = data;
    displayScholarships(scholarships);
  });

search.addEventListener("input", applyFilters);
classFilter.addEventListener("change", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
