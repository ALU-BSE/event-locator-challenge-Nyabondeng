const events = [
  {
    id: 1,
    name: "Juba Music Fest",
    date: "2025-08-10",
    location: "Juba",
    category: "music",
    description: "A lively outdoor concert featuring top local and international artists."
  },
  {
    id: 2,
    name: "TechTalk Expo",
    date: "2025-08-15",
    location: "Nairobi",
    category: "tech",
    description: "An innovative tech conference bringing together developers and startups."
  },
  {
    id: 3,
    name: "Juba Sports Gala",
    date: "2025-08-18",
    location: "Juba",
    category: "sports",
    description: "A full day of competitive games, prizes, and fun."
  }
];

const container = document.getElementById("eventsContainer");
if (container) {
  const query = new URLSearchParams(window.location.search);
  const city = query.get("city")?.toLowerCase() || "";
  const date = query.get("date") || "";
  const category = query.get("category") || "";

  const filtered = events.filter(event => {
    return (
      (!city || event.location.toLowerCase().includes(city)) &&
      (!date || event.date === date) &&
      (!category || event.category === category)
    );
  });

  if (filtered.length === 0) {
    container.innerHTML = '<p class="text-center">No events found matching your criteria.</p>';
  } else {
    filtered.forEach(event => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      let imgSrc = "assets/images/event-default.jpg";
      if (event.category === "music") imgSrc = "assets/images/music.jpg";
      else if (event.category === "tech") imgSrc = "assets/images/tech.jpg";
      else if (event.category === "sports") imgSrc = "assets/images/sports.jpg";

      col.innerHTML = `
        <div class="card h-100">
          <img src="${imgSrc}" class="card-img-top" alt="${event.category} event">
          <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.date} — ${event.location}</p>
            <p>${event.description}</p>
            <a href="event-details.html?id=${event.id}" class="btn btn-primary">View Details</a>
          </div>
        </div>`;

      container.appendChild(col);
    });
  }
}

const detailContainer = document.getElementById("eventDetail");
if (detailContainer) {
  const id = new URLSearchParams(window.location.search).get("id");
  const event = events.find(e => e.id === parseInt(id));
  if (event) {
    let imgSrc = "assets/images/event-default.jpg";
    if (event.category === "music") imgSrc = "assets/images/music.jpg";
    else if (event.category === "tech") imgSrc = "assets/images/tech.jpg";
    else if (event.category === "sports") imgSrc = "assets/images/sports.jpg";

    detailContainer.innerHTML = `
      <img src="${imgSrc}" class="card-img-top" alt="${event.category} image">
      <div class="card-body">
        <h3 class="card-title">${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p><strong>Category:</strong> ${event.category}</p>
        <p>${event.description}</p>
        <a href="events.html" class="btn btn-secondary mt-3">Back to Events</a>
      </div>
    `;
  }
}

const searchForm = document.getElementById("searchForm");
if (searchForm) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const city = document.getElementById("searchCity").value;
    const date = document.getElementById("searchDate").value;
    const category = document.getElementById("searchCategory").value;
    const query = `events.html?city=${city}&date=${date}&category=${category}`;
    window.location.href = query;
  });
}
