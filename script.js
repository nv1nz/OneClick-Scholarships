async function loadScholarships() {
  const res = await fetch("scholarships.json");
  const data = await res.json();
  const list = document.getElementById("scholarshipList");

  function render(scholarships) {
    list.innerHTML = scholarships.map(s => `
      <div class="card">
        <h3>${s.name}</h3>
        <p><strong>Amount:</strong> ₹${s.amount}</p>
        <p><strong>Deadline:</strong> ${s.deadline}</p>
        <p><strong>Class:</strong> ${s.class}</p>
        <p><strong>Category:</strong> ${s.category}</p>
        <a href="${s.link}" target="_blank">
          <button>Apply Now</button>
        </a>
      </div>
    `).join("");
  }

  function filter() {
    const search = document.getElementById("search").value.toLowerCase();
    const cls = document.getElementById("classFilter").value;
    const cat = document.getElementById("categoryFilter").value;

    const filtered = data.filter(s =>
      s.name.toLowerCase().includes(search) &&
      (cls === "" || s.class === cls) &&
      (cat === "" || s.category === cat)
    );

    render(filtered);
  }

  document.getElementById("search").addEventListener("input", filter);
  document.getElementById("classFilter").addEventListener("change", filter);
  document.getElementById("categoryFilter").addEventListener("change", filter);

  render(data); // show all on load
}

loadScholarships();
