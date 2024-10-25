document.addEventListener("DOMContentLoaded", () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    const correctUsername = "admin"; // Change as needed
    const correctPassword = "password"; // Change as needed

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = usernameInput.value;
            const password = passwordInput.value;

            if (username === correctUsername && password === correctPassword) {
                window.location.href = "index.html"; // Redirect to the main page
            } else {
                errorMessage.textContent = "Invalid username or password. Please try again.";
            }
        });
    }

    let selectedMovies = [];
    let selectedBeverages = [];
    let selectedEvents = [];

    // Movie Data
    const movies = [
        {
            id: 1,
            title: "Inception",
            duration: "148 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Science Fiction",
            storyline: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a CEO's mind.",
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_%282010%29.png",
            trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0"
        },
        {
            id: 2,
            title: "The Godfather",
            duration: "175 min",
            director: "Francis Ford Coppola",
            producer: "Albert S. Ruddy",
            language: "English",
            genre: "Crime",
            storyline: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather220.jpg",
            trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA"
        },
        {
            id: 3,
            title: "Interstellar",
            duration: "169 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Adventure",
            storyline: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
            trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
        }
    ];

    // Beverage Data
    const beverages = [
        { id: 1, name: "Samosa & Chai", price: 20 },
        { id: 2, name: "Sandwich & Coffee", price: 30 },
        { id: 3, name: "Pizza & Burger", price: 50 },
        { id: 4, name: "Cold Drink", price: 5 },
        { id: 5, name: "Ice Cream", price: 10 },
        { id: 6, name: "Popcorn", price: 15 },
        { id: 7, name: "Nachos", price: 12 },
        { id: 8, name: "Fruit Juice", price: 7 },
        { id: 9, name: "Water Bottle", price: 2 },
        { id: 10, name: "Chocolate", price: 3 }
    ];

    // Event Data
    const events = [
        {
            id: 1,
            title: "Concert",
            location: "City Park",
            description: "An evening of music with various artists.",
            date: "2024-12-01",
            time: "19:00"
        },
        {
            id: 2,
            title: "Art Exhibition",
            location: "Gallery One",
            description: "A showcase of contemporary art.",
            date: "2024-11-15",
            time: "10:00"
        },
        {
            id: 3,
            title: "Theater Play",
            location: "Downtown Theater",
            description: "A thrilling drama performance.",
            date: "2024-11-30",
            time: "20:00"
        }
    ];

    // Tab Management
    const tabs = document.querySelectorAll(".tab-content");

    const showTab = (tab) => {
        tabs.forEach(t => t.style.display = 'none');
        tab.style.display = 'block';
    };

    document.getElementById('movies-tab').addEventListener('click', () => showTab(document.getElementById("movies-section")));
    document.getElementById('beverages-tab').addEventListener('click', () => showTab(document.getElementById("beverages-section")));
    document.getElementById('events-tab').addEventListener('click', () => showTab(document.getElementById("events-section")));
    document.getElementById('checkout-tab').addEventListener('click', () => showTab(document.getElementById("checkout-section")));

    // Movie Management
    const moviesListElement = document.getElementById("movies-list");

    const displayMovies = (filter = "") => {
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                    <h3>${movie.title} (${movie.duration})</h3>
                    <p>Directed by: ${movie.director}</p>
                    <p>Produced by: ${movie.producer}</p>
                    <p>Language: ${movie.language}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Storyline: ${movie.storyline}</p>
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                    <br>
                    <a href="${movie.trailerUrl}" target="_blank">Watch Trailer</a>
                    <button onclick="bookMovie(${movie.id})">Book</button>
                    <button onclick="removeMovie(${movie.id})">Remove</button>
                `;
                moviesListElement.appendChild(movieDiv);
            }
        });
    };

    window.bookMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            selectedMovies.push(movie);
            alert(`${movie.title} has been added to your checkout!`);
            displayCheckout();
        }
    };

    window.removeMovie = (id) => {
        selectedMovies = selectedMovies.filter(m => m.id !== id);
        alert(`Movie removed from your selection!`);
        displayCheckout();
    };

    document.getElementById("add-movie").addEventListener("click", () => {
        const newMovie = {
            id: movies.length + 1,
            title: prompt("Enter movie title:"),
            duration: prompt("Enter movie duration:"),
            director: prompt("Enter movie director:"),
            producer: prompt("Enter movie producer:"),
            language: prompt("Enter movie language:"),
            genre: prompt("Enter movie genre:"),
            storyline: prompt("Enter movie storyline:"),
            posterUrl: prompt("Enter movie poster URL:"),
            trailerUrl: prompt("Enter movie trailer URL:")
        };
        movies.push(newMovie);
        displayMovies();
    });

    document.getElementById("search-movies").addEventListener("input", (event) => {
        displayMovies(event.target.value);
    });

    // Beverage Management
    const beveragesListElement = document.getElementById("beverages-list");

    const displayBeverages = (filter = "") => {
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            if (beverage.name.toLowerCase().includes(filter.toLowerCase())) {
                const beverageDiv = document.createElement("div");
                beverageDiv.classList.add("beverage");
                beverageDiv.innerHTML = `
                    <h3>${beverage.name} - $${beverage.price}</h3>
                    <button onclick="addBeverage(${beverage.id})">Add to Checkout</button>
                    <button onclick="removeBeverage(${beverage.id})">Remove from Checkout</button>
                `;
                beveragesListElement.appendChild(beverageDiv);
            }
        });
    };

    window.addBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        if (beverage) {
            selectedBeverages.push(beverage);
            alert(`${beverage.name} has been added to your checkout!`);
            displayCheckout();
        }
    };

    window.removeBeverage = (id) => {
        selectedBeverages = selectedBeverages.filter(b => b.id !== id);
        alert(`Beverage removed from your selection!`);
        displayCheckout();
    };

    document.getElementById("add-beverage").addEventListener("click", () => {
        const newBeverage = {
            id: beverages.length + 1,
            name: prompt("Enter beverage name:"),
            price: parseFloat(prompt("Enter beverage price:"))
        };
        beverages.push(newBeverage);
        displayBeverages();
    });

    document.getElementById("search-beverages").addEventListener("input", (event) => {
        displayBeverages(event.target.value);
    });

    // Event Management
    const eventsListElement = document.getElementById("events-list");

    const displayEvents = (filter = "") => {
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            if (event.title.toLowerCase().includes(filter.toLowerCase())) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerHTML = `
                    <h3>${event.title} at ${event.location}</h3>
                    <p>${event.description}</p>
                    <p>Date: ${event.date} at ${event.time}</p>
                    <button onclick="bookEvent(${event.id})">Book</button>
                    <button onclick="removeEvent(${event.id})">Remove</button>
                `;
                eventsListElement.appendChild(eventDiv);
            }
        });
    };

    window.bookEvent = (id) => {
        const event = events.find(e => e.id === id);
        if (event) {
            selectedEvents.push(event);
            alert(`${event.title} has been added to your checkout!`);
            displayCheckout();
        }
    };

    window.removeEvent = (id) => {
        selectedEvents = selectedEvents.filter(e => e.id !== id);
        alert(`Event removed from your selection!`);
        displayCheckout();
    };

    document.getElementById("add-event").addEventListener("click", () => {
        const newEvent = {
            id: events.length + 1,
            title: prompt("Enter event title:"),
            location: prompt("Enter event location:"),
            description: prompt("Enter event description:"),
            date: prompt("Enter event date (YYYY-MM-DD):"),
            time: prompt("Enter event time (HH:MM):")
        };
        events.push(newEvent);
        displayEvents();
    });

    document.getElementById("search-events").addEventListener("input", (event) => {
        displayEvents(event.target.value);
    });

    // Checkout Management
    const checkoutListElement = document.getElementById("checkout-list");

    const displayCheckout = () => {
        checkoutListElement.innerHTML = "<h3>Your Selection</h3>";
        let total = 0;

        selectedMovies.forEach(movie => {
            total += 10; // Assume $10 for each movie ticket for simplicity
            checkoutListElement.innerHTML += `<p>Movie: ${movie.title} - $10</p>`;
        });

        selectedBeverages.forEach(beverage => {
            total += beverage.price;
            checkoutListElement.innerHTML += `<p>Beverage: ${beverage.name} - $${beverage.price}</p>`;
        });

        selectedEvents.forEach(event => {
            total += 20; // Assume $20 for each event ticket for simplicity
            checkoutListElement.innerHTML += `<p>Event: ${event.title} - $20</p>`;
        });

        checkoutListElement.innerHTML += `<h4>Total: $${total}</h4>`;
    };

    document.getElementById("confirm-checkout").addEventListener("click", () => {
        alert("Checkout confirmed! Thank you for your purchase!");
        selectedMovies = [];
        selectedBeverages = [];
        selectedEvents = [];
        displayCheckout();
    });

    // Initial Display
    displayMovies();
    displayBeverages();
    displayEvents();

    // Logout Functionality
    document.getElementById("logout").addEventListener("click", (e) => {
        e.preventDefault();
        alert("Logged out successfully!");
        window.location.href = "login.html"; // Redirect to login page
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const movies = [
        {
            id: 1,
            title: "Inception",
            duration: "148 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Science Fiction",
            storyline: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            posterUrl: "https://example.com/inception.jpg",
            trailerUrl: "https://example.com/inception-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true), // 10 recliner seats
                platinum: Array(20).fill(true), // 20 platinum seats
                gold: Array(30).fill(true), // 30 gold seats
                silver: Array(40).fill(true) // 40 silver seats
            }
        },
        {
            id: 2,
            title: "The Godfather",
            duration: "175 min",
            director: "Francis Ford Coppola",
            producer: "Albert S. Ruddy",
            language: "English",
            genre: "Crime",
            storyline: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            posterUrl: "https://example.com/godfather.jpg",
            trailerUrl: "https://example.com/godfather-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            }
        },
        {
            id: 3,
            title: "Interstellar",
            duration: "169 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Adventure",
            storyline: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            posterUrl: "https://example.com/interstellar.jpg",
            trailerUrl: "https://example.com/interstellar-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            }
        }
    ];

    const beverages = [
        { id: 1, name: "Samosa & Chai", price: 20 },
        { id: 2, name: "Sandwich & Coffee", price: 30 },
        { id: 3, name: "Pizza & Burger", price: 50 }
    ];

    const events = [
        { id: 1, title: "Concert", location: "City Hall", description: "Live music concert.", date: "2024-11-01", time: "19:00" },
        { id: 2, title: "Art Exhibition", location: "Art Gallery", description: "Exhibition of modern art.", date: "2024-11-05", time: "11:00" },
        { id: 3, title: "Theater Play", location: "Local Theater", description: "A live theater performance.", date: "2024-11-10", time: "18:00" }
    ];

    let selectedMovies = [];
    let selectedBeverages = [];
    let selectedEvents = [];
    let selectedSeats = {};

    const tabs = document.querySelectorAll(".tab-content");

    const showTab = (tab) => {
        tabs.forEach(t => t.style.display = 'none');
        tab.style.display = 'block';
    };

    document.getElementById('movies-tab').addEventListener('click', () => showTab(document.getElementById("movies-section")));
    document.getElementById('beverages-tab').addEventListener('click', () => showTab(document.getElementById("beverages-section")));
    document.getElementById('events-tab').addEventListener('click', () => showTab(document.getElementById("events-section")));
    document.getElementById('checkout-tab').addEventListener('click', () => showTab(document.getElementById("checkout-section")));

    // Movie Management
    const moviesListElement = document.getElementById("movies-list");

    const displayMovies = (filter = "") => {
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                    <h3>${movie.title} (${movie.duration})</h3>
                    <p>Directed by: ${movie.director}</p>
                    <p>Produced by: ${movie.producer}</p>
                    <p>Language: ${movie.language}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Storyline: ${movie.storyline}</p>
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                    <br>
                    <a href="${movie.trailerUrl}" target="_blank">Watch Trailer</a>
                    <button onclick="selectMovie(${movie.id})">Select Seats</button>
                    <button onclick="removeMovie(${movie.id})">Remove</button>
                `;
                moviesListElement.appendChild(movieDiv);
            }
        });
    };

    window.selectMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            document.getElementById("selected-movie-title").innerText = movie.title;
            displaySeatMatrix(movie);
            document.getElementById("seat-selection").style.display = "block";
        }
    };

    window.removeMovie = (id) => {
        selectedMovies = selectedMovies.filter(m => m.id !== id);
        alert(`Movie removed from your selection!`);
        displayCheckout();
    };

    const displaySeatMatrix = (movie) => {
        const seatMatrixElement = document.getElementById("seat-matrix");
        seatMatrixElement.innerHTML = "";
        
        // Displaying seats for different categories
        Object.keys(movie.seats).forEach(category => {
            const seats = movie.seats[category];
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Seats</h4>`;
            seats.forEach((seat, index) => {
                const seatButton = document.createElement("button");
                seatButton.innerText = seat ? `Seat ${index + 1}` : `Sold`;
                seatButton.disabled = !seat;
                seatButton.onclick = () => toggleSeat(movie, category, index);
                categoryDiv.appendChild(seatButton);
            });
            seatMatrixElement.appendChild(categoryDiv);
        });
    };

    const toggleSeat = (movie, category, index) => {
        movie.seats[category][index] = !movie.seats[category][index];
        displaySeatMatrix(movie);
    };

    document.getElementById("confirm-seat-selection").addEventListener("click", () => {
        alert(`Seats selected for ${document.getElementById("selected-movie-title").innerText}`);
        // Update selected seats in the checkout
        selectedSeats[document.getElementById("selected-movie-title").innerText] = movie.seats;
        displayCheckout();
        document.getElementById("seat-selection").style.display = "none";
    });

    // Beverage Management
    const beveragesListElement = document.getElementById("beverages-list");

    const displayBeverages = (filter = "") => {
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            if (beverage.name.toLowerCase().includes(filter.toLowerCase())) {
                const beverageDiv = document.createElement("div");
                beverageDiv.innerHTML = `
                    <h3>${beverage.name} - $${beverage.price}</h3>
                    <button onclick="addBeverage(${beverage.id})">Add to Checkout</button>
                    <button onclick="removeBeverage(${beverage.id})">Remove</button>
                `;
                beveragesListElement.appendChild(beverageDiv);
            }
        });
    };

    window.addBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        if (beverage) {
            selectedBeverages.push(beverage);
            displayCheckout();
            alert(`${beverage.name} added to checkout!`);
        }
    };

    window.removeBeverage = (id) => {
        selectedBeverages = selectedBeverages.filter(b => b.id !== id);
        displayCheckout();
        alert(`Beverage removed from your selection!`);
    };

    // Event Management
    const eventsListElement = document.getElementById("events-list");

    const displayEvents = (filter = "") => {
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            if (event.title.toLowerCase().includes(filter.toLowerCase())) {
                const eventDiv = document.createElement("div");
                eventDiv.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                    <p>Date: ${event.date}</p>
                    <p>Time: ${event.time}</p>
                    <button onclick="addEvent(${event.id})">Add to Checkout</button>
                    <button onclick="removeEvent(${event.id})">Remove</button>
                `;
                eventsListElement.appendChild(eventDiv);
            }
        });
    };

    window.addEvent = (id) => {
        const event = events.find(e => e.id === id);
        if (event) {
            selectedEvents.push(event);
            displayCheckout();
            alert(`${event.title} added to checkout!`);
        }
    };

    window.removeEvent = (id) => {
        selectedEvents = selectedEvents.filter(e => e.id !== id);
        displayCheckout();
        alert(`Event removed from your selection!`);
    };

    const displayCheckout = () => {
        const checkoutListElement = document.getElementById("checkout-list");
        checkoutListElement.innerHTML = "<h2>Your Selection</h2>";
        
        selectedMovies.forEach(movie => {
            checkoutListElement.innerHTML += `<p>Movie: ${movie.title}</p>`;
        });

        selectedBeverages.forEach(beverage => {
            checkoutListElement.innerHTML += `<p>Beverage: ${beverage.name} - $${beverage.price}</p>`;
        });

        selectedEvents.forEach(event => {
            checkoutListElement.innerHTML += `<p>Event: ${event.title} at ${event.location}</p>`;
        });

        // Display total price
        const totalPrice = calculateTotalPrice();
        checkoutListElement.innerHTML += `<p>Total Price: $${totalPrice}</p>`;
    };

    const calculateTotalPrice = () => {
        let total = 0;
        selectedBeverages.forEach(beverage => {
            total += beverage.price;
        });
        return total;
    };

    document.getElementById("confirm-checkout").addEventListener("click", () => {
        const paymentMethod = document.getElementById("payment-method").value;
        alert(`Checkout confirmed! Payment Method: ${paymentMethod}`);
        // Here, you can add further integration with a payment gateway.
    });

    displayMovies();
    displayBeverages();
    displayEvents();
});
document.addEventListener("DOMContentLoaded", () => {
    const movies = [
        {
            id: 1,
            title: "Inception",
            duration: "148 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Science Fiction",
            storyline: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            posterUrl: "https://example.com/inception.jpg",
            trailerUrl: "https://example.com/inception-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true), // 10 recliner seats
                platinum: Array(20).fill(true), // 20 platinum seats
                gold: Array(30).fill(true), // 30 gold seats
                silver: Array(40).fill(true) // 40 silver seats
            }
        },
        {
            id: 2,
            title: "The Godfather",
            duration: "175 min",
            director: "Francis Ford Coppola",
            producer: "Albert S. Ruddy",
            language: "English",
            genre: "Crime",
            storyline: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            posterUrl: "https://example.com/godfather.jpg",
            trailerUrl: "https://example.com/godfather-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            }
        },
        {
            id: 3,
            title: "Interstellar",
            duration: "169 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Adventure",
            storyline: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            posterUrl: "https://example.com/interstellar.jpg",
            trailerUrl: "https://example.com/interstellar-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            }
        }
    ];

    const beverages = [
        { id: 1, name: "Samosa & Chai", price: 20 },
        { id: 2, name: "Sandwich & Coffee", price: 30 },
        { id: 3, name: "Pizza & Burger", price: 50 }
    ];

    const events = [
        { id: 1, title: "Concert", location: "City Hall", description: "Live music concert.", date: "2024-11-01", time: "19:00" },
        { id: 2, title: "Art Exhibition", location: "Art Gallery", description: "Exhibition of modern art.", date: "2024-11-05", time: "11:00" },
        { id: 3, title: "Theater Play", location: "Local Theater", description: "A live theater performance.", date: "2024-11-10", time: "18:00" }
    ];

    let selectedMovies = [];
    let selectedBeverages = [];
    let selectedEvents = [];
    let selectedSeats = {};

    const tabs = document.querySelectorAll(".tab-content");

    const showTab = (tab) => {
        tabs.forEach(t => t.style.display = 'none');
        tab.style.display = 'block';
    };

    document.getElementById('movies-tab').addEventListener('click', () => showTab(document.getElementById("movies-section")));
    document.getElementById('beverages-tab').addEventListener('click', () => showTab(document.getElementById("beverages-section")));
    document.getElementById('events-tab').addEventListener('click', () => showTab(document.getElementById("events-section")));
    document.getElementById('checkout-tab').addEventListener('click', () => showTab(document.getElementById("checkout-section")));

    // Movie Management
    const moviesListElement = document.getElementById("movies-list");

    const displayMovies = (filter = "") => {
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                    <h3>${movie.title} (${movie.duration})</h3>
                    <p>Directed by: ${movie.director}</p>
                    <p>Produced by: ${movie.producer}</p>
                    <p>Language: ${movie.language}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Storyline: ${movie.storyline}</p>
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                    <br>
                    <a href="${movie.trailerUrl}" target="_blank">Watch Trailer</a>
                    <button onclick="selectMovie(${movie.id})">Select Seats</button>
                    <button onclick="removeMovie(${movie.id})">Remove</button>
                `;
                moviesListElement.appendChild(movieDiv);
            }
        });
    };

    window.selectMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        if (movie) {
            document.getElementById("selected-movie-title").innerText = movie.title;
            displaySeatMatrix(movie);
            document.getElementById("seat-selection").style.display = "block";
        }
    };

    window.removeMovie = (id) => {
        selectedMovies = selectedMovies.filter(m => m.id !== id);
        alert(`Movie removed from your selection!`);
        displayCheckout();
    };

    const displaySeatMatrix = (movie) => {
        const seatMatrixElement = document.getElementById("seat-matrix");
        seatMatrixElement.innerHTML = ""; // Clear previous seat matrix

        const categories = Object.keys(movie.seats);
        
        categories.forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Seats</h4>`;
            movie.seats[category].forEach((seat, index) => {
                const seatButton = document.createElement("button");
                seatButton.innerText = seat ? `Seat ${index + 1}` : `Sold`;
                seatButton.disabled = !seat;
                seatButton.onclick = () => toggleSeat(movie, category, index);
                categoryDiv.appendChild(seatButton);
            });
            seatMatrixElement.appendChild(categoryDiv);
        });
    };

    const toggleSeat = (movie, category, index) => {
        movie.seats[category][index] = !movie.seats[category][index];
        displaySeatMatrix(movie);
    };

    document.getElementById("confirm-seat-selection").addEventListener("click", () => {
        alert(`Seats selected for ${document.getElementById("selected-movie-title").innerText}`);
        selectedSeats[document.getElementById("selected-movie-title").innerText] = movie.seats;
        displayCheckout();
        document.getElementById("seat-selection").style.display = "none";
    });

    // Beverage Management
    const beveragesListElement = document.getElementById("beverages-list");

    const displayBeverages = (filter = "") => {
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            if (beverage.name.toLowerCase().includes(filter.toLowerCase())) {
                const beverageDiv = document.createElement("div");
                beverageDiv.innerHTML = `
                    <h3>${beverage.name} - $${beverage.price}</h3>
                    <button onclick="addBeverage(${beverage.id})">Add to Checkout</button>
                    <button onclick="removeBeverage(${beverage.id})">Remove</button>
                `;
                beveragesListElement.appendChild(beverageDiv);
            }
        });
    };

    window.addBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        if (beverage) {
            selectedBeverages.push(beverage);
            displayCheckout();
            alert(`${beverage.name} added to checkout!`);
        }
    };

    window.removeBeverage = (id) => {
        selectedBeverages = selectedBeverages.filter(b => b.id !== id);
        displayCheckout();
        alert(`Beverage removed from your selection!`);
    };

    // Event Management
    const eventsListElement = document.getElementById("events-list");

    const displayEvents = (filter = "") => {
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            if (event.title.toLowerCase().includes(filter.toLowerCase())) {
                const eventDiv = document.createElement("div");
                eventDiv.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                    <p>Date: ${event.date}</p>
                    <p>Time: ${event.time}</p>
                    <button onclick="addEvent(${event.id})">Add to Checkout</button>
                    <button onclick="removeEvent(${event.id})">Remove</button>
                `;
                eventsListElement.appendChild(eventDiv);
            }
        });
    };

    window.addEvent = (id) => {
        const event = events.find(e => e.id === id);
        if (event) {
            selectedEvents.push(event);
            displayCheckout();
            alert(`${event.title} added to checkout!`);
        }
    };

    window.removeEvent = (id) => {
        selectedEvents = selectedEvents.filter(e => e.id !== id);
        displayCheckout();
        alert(`Event removed from your selection!`);
    };

    const displayCheckout = () => {
        const checkoutListElement = document.getElementById("checkout-list");
        checkoutListElement.innerHTML = "<h2>Your Selection</h2>";
        
        selectedMovies.forEach(movie => {
            checkoutListElement.innerHTML += `<p>Movie: ${movie.title}</p>`;
        });

        selectedBeverages.forEach(beverage => {
            checkoutListElement.innerHTML += `<p>Beverage: ${beverage.name} - $${beverage.price}</p>`;
        });

        selectedEvents.forEach(event => {
            checkoutListElement.innerHTML += `<p>Event: ${event.title} at ${event.location}</p>`;
        });

        // Display total price
        const totalPrice = calculateTotalPrice();
        checkoutListElement.innerHTML += `<p>Total Price: $${totalPrice}</p>`;
    };

    const calculateTotalPrice = () => {
        let total = 0;
        selectedBeverages.forEach(beverage => {
            total += beverage.price;
        });
        return total;
    };

    document.getElementById("confirm-checkout").addEventListener("click", () => {
        const paymentMethod = document.getElementById("payment-method").value;
        alert(`Checkout confirmed! Payment Method: ${paymentMethod}`);
        // Here, you can add further integration with a payment gateway.
    });

    displayMovies();
    displayBeverages();
    displayEvents();
});
document.addEventListener("DOMContentLoaded", () => {
    const movies = [
        {
            id: 1,
            title: "Inception",
            duration: "148 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Science Fiction",
            storyline: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            posterUrl: "https://th.bing.com/th/id/OIP.vDlYYO2Bect7rYpyWv8_VAHaK-?rs=1&pid=ImgDetMain",
            trailerUrl: "https://www.bing.com/ck/a?!&&p=aa7b803025a5ecb616dfd97c3e3e74bcbabbc3733e19b148a81be9302e3d7a16JmltdHM9MTcyOTM4MjQwMA&ptn=3&ver=2&hsh=4&fclid=29d54b09-0c12-676a-3f17-59b80d896613&u=a1L3ZpZGVvcy9yaXZlcnZpZXcvcmVsYXRlZHZpZGVvP3E9aW5jZXB0aW9uK3RyYWlsZXImbWlkPTU5NEY4QjU0RUJFNEJCNEM5Njg3NTk0RjhCNTRFQkU0QkI0Qzk2ODcmRk9STT1WSVJF&ntb=1",
            seats: {
                recliner: Array(10).fill(true), // 10 recliner seats
                platinum: Array(20).fill(true), // 20 platinum seats
                gold: Array(30).fill(true), // 30 gold seats
                silver: Array(40).fill(true) // 40 silver seats
            },
            prices: {
                recliner: 100,
                platinum: 80,
                gold: 60,
                silver: 40
            }
        },
        {
            id: 2,
            title: "The Godfather",
            duration: "175 min",
            director: "Francis Ford Coppola",
            producer: "Albert S. Ruddy",
            language: "English",
            genre: "Crime",
            storyline: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            posterUrl: "https://example.com/godfather.jpg",
            trailerUrl: "https://example.com/godfather-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            },
            prices: {
                recliner: 100,
                platinum: 80,
                gold: 60,
                silver: 40
            }
        },
        {
            id: 3,
            title: "Interstellar",
            duration: "169 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Adventure",
            storyline: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            posterUrl: "https://example.com/interstellar.jpg",
            trailerUrl: "https://example.com/interstellar-trailer.mp4",
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            },
            prices: {
                recliner: 100,
                platinum: 80,
                gold: 60,
                silver: 40
            }
        }
    ];

    const beverages = [
        { id: 1, name: "Samosa & Chai", price: 20 },
        { id: 2, name: "Sandwich & Coffee", price: 30 },
        { id: 3, name: "Pizza & Burger", price: 50 },
        { id: 4, name: "Nachos & Cheese", price: 25 },
        { id: 5, name: "Popcorn", price: 15 },
        { id: 6, name: "Soft Drink", price: 10 },
        { id: 7, name: "Water Bottle", price: 5 },
        { id: 8, name: "Ice Cream", price: 30 },
        { id: 9, name: "Fruit Salad", price: 40 },
        { id: 10, name: "Milkshake", price: 35 }
    ];

    const events = [
        { id: 1, title: "Concert", location: "City Hall", description: "Live music concert.", date: "2024-11-01", time: "19:00" },
        { id: 2, title: "Art Exhibition", location: "Art Gallery", description: "Exhibition of modern art.", date: "2024-11-05", time: "11:00" },
        { id: 3, title: "Theater Play", location: "Local Theater", description: "A live theater performance.", date: "2024-11-10", time: "18:00" }
    ];

    let selectedMovies = [];
    let selectedBeverages = [];
    let selectedEvents = [];
    let selectedSeats = {};

    // Navigation and Tabs
    document.getElementById("movies-tab").onclick = () => toggleTab("movies-section");
    document.getElementById("beverages-tab").onclick = () => toggleTab("beverages-section");
    document.getElementById("events-tab").onclick = () => toggleTab("events-section");
    document.getElementById("checkout-tab").onclick = () => toggleTab("checkout-section");

    function toggleTab(sectionId) {
        document.querySelectorAll(".tab-content").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(sectionId).style.display = "block";
    }

    // Movie Management
    document.getElementById("add-movie").onclick = () => {
        document.getElementById("add-movie-form").style.display = "block";
    };

    document.getElementById("submit-movie").onclick = () => {
        const movie = {
            id: movies.length + 1,
            title: document.getElementById("movie-title").value,
            duration: document.getElementById("movie-duration").value,
            director: document.getElementById("movie-director").value,
            producer: document.getElementById("movie-producer").value,
            language: document.getElementById("movie-language").value,
            genre: document.getElementById("movie-genre").value,
            storyline: document.getElementById("movie-storyline").value,
            posterUrl: document.getElementById("movie-poster").value,
            trailerUrl: document.getElementById("movie-trailer").value,
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            },
            prices: {
                recliner: 100,
                platinum: 80,
                gold: 60,
                silver: 40
            }
        };
        movies.push(movie);
        displayMovies();
        document.getElementById("add-movie-form").reset();
        document.getElementById("add-movie-form").style.display = "none";
    };

    const displayMovies = (filter = "") => {
        const moviesListElement = document.getElementById("movies-list");
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                    <h3>${movie.title} - ${movie.duration}</h3>
                    <p>Director: ${movie.director}</p>
                    <p>Producer: ${movie.producer}</p>
                    <p>Language: ${movie.language}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Storyline: ${movie.storyline}</p>
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster" style="width: 150px;">
                    <video width="200" controls>
                        <source src="${movie.trailerUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button onclick="selectMovie(${movie.id})">Select Seats</button>
                `;
                moviesListElement.appendChild(movieDiv);
            }
        });
    };

    window.selectMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        document.getElementById("selected-movie-title").innerText = movie.title;
        displaySeatMatrix(movie);
        document.getElementById("seat-selection").style.display = "block";
    };

    const displaySeatMatrix = (movie) => {
        const seatMatrixElement = document.getElementById("seat-matrix");
        seatMatrixElement.innerHTML = "";
        
        Object.keys(movie.seats).forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Seats - $${movie.prices[category]}</h4>`;
            movie.seats[category].forEach((seat, index) => {
                const seatButton = document.createElement("button");
                seatButton.innerText = seat ? `Seat ${index + 1}` : `Sold`;
                seatButton.className = seat ? "available" : "sold";
                seatButton.disabled = !seat;
                seatButton.onclick = () => toggleSeat(movie, category, index);
                categoryDiv.appendChild(seatButton);
            });
            seatMatrixElement.appendChild(categoryDiv);
        });
    };

    const toggleSeat = (movie, category, index) => {
        movie.seats[category][index] = !movie.seats[category][index];
        displaySeatMatrix(movie);
    };

    document.getElementById("confirm-seat-selection").addEventListener("click", () => {
        alert(`Seats selected for ${document.getElementById("selected-movie-title").innerText}`);
        selectedSeats[document.getElementById("selected-movie-title").innerText] = movie.seats;
        selectedMovies.push(movie);
        displayCheckout();
        document.getElementById("seat-selection").style.display = "none";
    });

    // Beverage Management
    const beveragesListElement = document.getElementById("beverages-list");

    const displayBeverages = (filter = "") => {
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            if (beverage.name.toLowerCase().includes(filter.toLowerCase())) {
                const beverageDiv = document.createElement("div");
                beverageDiv.classList.add("beverage");
                beverageDiv.innerHTML = `
                    <h3>${beverage.name} - $${beverage.price}</h3>
                    <button onclick="addBeverage(${beverage.id})">Add to Checkout</button>
                    <button onclick="removeBeverage(${beverage.id})">Remove</button>
                `;
                beveragesListElement.appendChild(beverageDiv);
            }
        });
    };

    window.addBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        if (beverage) {
            selectedBeverages.push(beverage);
            displayCheckout();
            alert(`${beverage.name} added to checkout!`);
        }
    };

    window.removeBeverage = (id) => {
        selectedBeverages = selectedBeverages.filter(b => b.id !== id);
        displayCheckout();
        alert(`Beverage removed from your selection!`);
    };

    // Event Management
    const eventsListElement = document.getElementById("events-list");

    const displayEvents = (filter = "") => {
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            if (event.title.toLowerCase().includes(filter.toLowerCase())) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                    <p>Date: ${event.date}</p>
                    <p>Time: ${event.time}</p>
                    <button onclick="addEvent(${event.id})">Add to Checkout</button>
                    <button onclick="removeEvent(${event.id})">Remove</button>
                `;
                eventsListElement.appendChild(eventDiv);
            }
        });
    };

    window.addEvent = (id) => {
        const event = events.find(e => e.id === id);
        if (event) {
            selectedEvents.push(event);
            displayCheckout();
            alert(`${event.title} added to checkout!`);
        }
    };

    window.removeEvent = (id) => {
        selectedEvents = selectedEvents.filter(e => e.id !== id);
        displayCheckout();
        alert(`Event removed from your selection!`);
    };

    const displayCheckout = () => {
        const checkoutListElement = document.getElementById("checkout-list");
        checkoutListElement.innerHTML = "<h2>Your Selection</h2>";

        let totalPrice = 0;

        selectedMovies.forEach(movie => {
            checkoutListElement.innerHTML += `<p>Movie: ${movie.title}</p>`;
            Object.keys(movie.seats).forEach(category => {
                const seatCount = movie.seats[category].filter(seat => !seat).length; // Count selected seats
                totalPrice += seatCount * movie.prices[category]; // Add to total price
                checkoutListElement.innerHTML += `<p>Selected ${category}: ${seatCount} seat(s) - $${seatCount * movie.prices[category]}</p>`;
            });
        });

        selectedBeverages.forEach(beverage => {
            checkoutListElement.innerHTML += `<p>Beverage: ${beverage.name} - $${beverage.price}</p>`;
            totalPrice += beverage.price; // Add to total price
        });

        selectedEvents.forEach(event => {
            checkoutListElement.innerHTML += `<p>Event: ${event.title} at ${event.location}</p>`;
        });

        // Display total price with GST and discount
        const discount = 10; // Example discount in percentage
        const gst = (totalPrice * 0.18); // Example GST calculation
        const finalPrice = totalPrice - (totalPrice * (discount / 100)) + gst;

        checkoutListElement.innerHTML += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>Discount (10%): -$${(totalPrice * (discount / 100)).toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>GST (18%): +$${gst.toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>Final Price: $${finalPrice.toFixed(2)}</p>`;
    };

    document.getElementById("confirm-checkout").onclick = () => {
        alert("Thank you for your booking!");
        // Reset selections after checkout
        selectedMovies = [];
        selectedBeverages = [];
        selectedEvents = [];
        selectedSeats = {};
        document.getElementById("checkout-list").innerHTML = "";
    };

    // Initialize views
    displayMovies();
    displayBeverages();
    displayEvents();
});
document.addEventListener("DOMContentLoaded", () => {
    let movies = [];
    let beverages = [];
    let events = [];
    let selectedBeverages = [];
    let selectedEvents = [];
    let selectedMovies = [];
    let selectedSeats = {};

    // Navigation and Tabs
    document.getElementById("movies-tab").onclick = () => toggleTab("movies-section");
    document.getElementById("beverages-tab").onclick = () => toggleTab("beverages-section");
    document.getElementById("events-tab").onclick = () => toggleTab("events-section");
    document.getElementById("checkout-tab").onclick = () => toggleTab("checkout-section");

    function toggleTab(sectionId) {
        document.querySelectorAll(".tab-content").forEach(section => {
            section.style.display = "none";
        });
        document.getElementById(sectionId).style.display = "block";
    }

    // Movie Management
    document.getElementById("add-movie").onclick = () => {
        document.getElementById("add-movie-form").style.display = "block";
    };

    document.getElementById("submit-movie").onclick = () => {
        const movie = {
            id: movies.length + 1,
            title: document.getElementById("movie-title").value,
            duration: document.getElementById("movie-duration").value,
            director: document.getElementById("movie-director").value,
            producer: document.getElementById("movie-producer").value,
            language: document.getElementById("movie-language").value,
            genre: document.getElementById("movie-genre").value,
            storyline: document.getElementById("movie-storyline").value,
            posterUrl: document.getElementById("movie-poster").value,
            trailerUrl: document.getElementById("movie-trailer").value,
            imdbUrl: document.getElementById("movie-imdb").value,
            wikiUrl: document.getElementById("movie-wiki").value,
            seats: {
                recliner: Array(10).fill(true),
                platinum: Array(20).fill(true),
                gold: Array(30).fill(true),
                silver: Array(40).fill(true)
            },
            prices: {
                recliner: 100,
                platinum: 80,
                gold: 60,
                silver: 40
            }
        };
        movies.push(movie);
        displayMovies();
        document.getElementById("add-movie-form").reset();
        document.getElementById("add-movie-form").style.display = "none";
    };

    const displayMovies = (filter = "") => {
        const moviesListElement = document.getElementById("movies-list");
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            if (movie.title.toLowerCase().includes(filter.toLowerCase())) {
                const movieDiv = document.createElement("div");
                movieDiv.classList.add("movie");
                movieDiv.innerHTML = `
                    <h3>${movie.title} - ${movie.duration}</h3>
                    <p>Director: ${movie.director}</p>
                    <p>Producer: ${movie.producer}</p>
                    <p>Language: ${movie.language}</p>
                    <p>Genre: ${movie.genre}</p>
                    <p>Storyline: ${movie.storyline}</p>
                    <a href="${movie.imdbUrl}" target="_blank">IMDB</a> | <a href="${movie.wikiUrl}" target="_blank">Wikipedia</a>
                    <img src="${movie.posterUrl}" alt="${movie.title} Poster" style="width: 150px;">
                    <video width="200" controls>
                        <source src="${movie.trailerUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <button onclick="selectMovie(${movie.id})">Select Seats</button>
                `;
                moviesListElement.appendChild(movieDiv);
            }
        });
    };

    window.selectMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        document.getElementById("selected-movie-title").innerText = movie.title;
        displaySeatMatrix(movie);
        document.getElementById("seat-selection").style.display = "block";
    };

    const displaySeatMatrix = (movie) => {
        const seatMatrixElement = document.getElementById("seat-matrix");
        seatMatrixElement.innerHTML = "";
        
        Object.keys(movie.seats).forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Seats</h4>`;
            movie.seats[category].forEach((isAvailable, index) => {
                const seatButton = document.createElement("button");
                seatButton.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} ${index + 1}`;
                seatButton.className = isAvailable ? "available" : "sold";
                seatButton.disabled = !isAvailable;

                seatButton.onclick = () => {
                    if (isAvailable) {
                        selectedSeats[`${category}-${index}`] = seatButton;
                        seatButton.classList.toggle("selected");
                    }
                };
                categoryDiv.appendChild(seatButton);
            });
            seatMatrixElement.appendChild(categoryDiv);
        });
    };

    document.getElementById("confirm-seat-selection").onclick = () => {
        const selectedSeatNumbers = Object.keys(selectedSeats).map(seat => seat).join(", ");
        alert(`Selected Seats: ${selectedSeatNumbers}`);
        selectedMovies.push(movies.find(movie => movie.title === document.getElementById("selected-movie-title").innerText));
        document.getElementById("seat-selection").style.display = "none";
        updateCheckoutList();
    };

    // Beverage Management
    document.getElementById("add-beverage").onclick = () => {
        document.getElementById("add-beverage-form").style.display = "block";
    };

    document.getElementById("submit-beverage").onclick = () => {
        const beverage = {
            id: beverages.length + 1,
            name: document.getElementById("beverage-name").value,
            price: parseFloat(document.getElementById("beverage-price").value)
        };
        beverages.push(beverage);
        displayBeverages();
        document.getElementById("add-beverage-form").reset();
        document.getElementById("add-beverage-form").style.display = "none";
    };

    const displayBeverages = () => {
        const beveragesListElement = document.getElementById("beverages-list");
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            const beverageDiv = document.createElement("div");
            beverageDiv.classList.add("beverage");
            beverageDiv.innerHTML = `
                <h3>${beverage.name} - $${beverage.price}</h3>
                <button onclick="toggleBeverage(${beverage.id})">Add/Remove</button>
            `;
            beveragesListElement.appendChild(beverageDiv);
        });
    };

    window.toggleBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        const index = selectedBeverages.indexOf(beverage);
        if (index > -1) {
            selectedBeverages.splice(index, 1);
        } else {
            selectedBeverages.push(beverage);
        }
        updateCheckoutList();
    };

    // Event Management
    document.getElementById("add-event").onclick = () => {
        document.getElementById("add-event-form").style.display = "block";
    };

    document.getElementById("submit-event").onclick = () => {
        const event = {
            id: events.length + 1,
            title: document.getElementById("event-title").value,
            location: document.getElementById("event-location").value,
            description: document.getElementById("event-description").value,
            date: document.getElementById("event-date").value,
            time: document.getElementById("event-time").value,
            price: 30 // Set a fixed price for events
        };
        events.push(event);
        displayEvents();
        document.getElementById("add-event-form").reset();
        document.getElementById("add-event-form").style.display = "none";
    };

    const displayEvents = () => {
        const eventsListElement = document.getElementById("events-list");
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerHTML = `
                <h3>${event.title}</h3>
                <p>Location: ${event.location}</p>
                <p>${event.description}</p>
                <p>Date: ${event.date} | Time: ${event.time}</p>
                <p>Price: $${event.price}</p>
                <button onclick="selectEvent(${event.id})">Select Event</button>
            `;
            eventsListElement.appendChild(eventDiv);
        });
    };

    window.selectEvent = (id) => {
        const event = events.find(e => e.id === id);
        selectedEvents.push(event);
        updateCheckoutList();
    };

    const updateCheckoutList = () => {
        const checkoutListElement = document.getElementById("checkout-list");
        checkoutListElement.innerHTML = "<h3>Your Checkout</h3>";

        let totalPrice = 0;

        // Add selected movies
        selectedMovies.forEach(movie => {
            checkoutListElement.innerHTML += `<p>${movie.title} - $${movie.prices.recliner}</p>`;
            totalPrice += movie.prices.recliner; // Using recliner price for simplicity
        });

        // Add selected beverages
        selectedBeverages.forEach(beverage => {
            checkoutListElement.innerHTML += `<p>${beverage.name} - $${beverage.price}</p>`;
            totalPrice += beverage.price;
        });

        // Add selected events
        selectedEvents.forEach(event => {
            checkoutListElement.innerHTML += `<p>${event.title} - $${event.price}</p>`;
            totalPrice += event.price;
        });

        const discount = 10; // Assuming a flat discount of 10%
        const gstRate = 0.18; // 18% GST
        const discountAmount = (totalPrice * discount) / 100;
        const gstAmount = (totalPrice * gstRate);
        const finalPrice = totalPrice - discountAmount + gstAmount;

        checkoutListElement.innerHTML += `<p>Total Price: $${totalPrice.toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>Discount (10%): -$${discountAmount.toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>GST (18%): +$${gstAmount.toFixed(2)}</p>`;
        checkoutListElement.innerHTML += `<p>Final Price: $${finalPrice.toFixed(2)}</p>`;
    };

    document.getElementById("confirm-checkout").onclick = () => {
        alert("Thank you for your booking!");
        // Reset selections after checkout
        selectedMovies = [];
        selectedBeverages = [];
        selectedEvents = [];
        selectedSeats = {};
        document.getElementById("checkout-list").innerHTML = "";
    };

    // Initialize views
    displayMovies();
    displayBeverages();
    displayEvents();
});
document.addEventListener("DOMContentLoaded", () => {
    let movies = [
        {
            id: 1,
            title: "Inception",
            duration: "148 min",
            director: "Christopher Nolan",
            producer: "Emma Thomas",
            language: "English",
            genre: "Sci-Fi",
            storyline: "A thief who steals corporate secrets through the use of dream-sharing technology.",
            poster: "https://posterspy.com/wp-content/uploads/2020/11/92756ED7-ABFF-4D1C-A627-05C517B343C8-1500x2250.jpeg",
            trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
            prices: { recliner: 10, platinum: 15, gold: 12, silver: 8 },
            seats: { recliner: Array(10).fill(true), platinum: Array(10).fill(true), gold: Array(10).fill(true), silver: Array(10).fill(true) } // 10 seats each
        },
        {
            id: 2,
            title: "The Godfather",
            duration: "175 min",
            director: "Francis Ford Coppola",
            producer: "Albert S. Ruddy",
            language: "English",
            genre: "Crime",
            storyline: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
            poster: "https://images4.alphacoders.com/217/thumbbig-217234.webp",
            trailer: "https://www.youtube.com/embed/6xFZ2aHRgUQ",
            prices: { recliner: 10, platinum: 15, gold: 12, silver: 8 },
            seats: { recliner: Array(10).fill(true), platinum: Array(10).fill(true), gold: Array(10).fill(true), silver: Array(10).fill(true) }
        },
        {
            id: 3,
            title: "The Dark Knight",
            duration: "152 min",
            director: "Christopher Nolan",
            producer: "Charles Roven",
            language: "English",
            genre: "Action",
            storyline: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
            poster: "https://www.themoviedb.org/t/p/original/eP5NL7ZlGoW9tE9qnCdHpOLH1Ke.jpg",
            trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
            prices: { recliner: 10, platinum: 15, gold: 12, silver: 8 },
            seats: { recliner: Array(10).fill(true), platinum: Array(10).fill(true), gold: Array(10).fill(true), silver: Array(10).fill(true) }
        }
    ];

    let beverages = [];
    let events = [];
    let selectedSeats = {};
    let selectedMovies = [];
    let selectedBeverages = [];
    let selectedEvents = [];

    const displayMovies = () => {
        const moviesListElement = document.getElementById("movies-list");
        moviesListElement.innerHTML = "";
        movies.forEach(movie => {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie");
            movieDiv.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Duration: ${movie.duration}</p>
                <p>Director: ${movie.director}</p>
                <p>Producer: ${movie.producer}</p>
                <p>Language: ${movie.language}</p>
                <p>Genre: ${movie.genre}</p>
                <p>Storyline: ${movie.storyline}</p>
                <img src="${movie.poster}" alt="Poster" width="150">
                <br>
                <a href="${movie.trailer}" target="_blank">Watch Trailer</a>
                <br>
                <button onclick="selectMovie(${movie.id})">Select Movie</button>
            `;
            moviesListElement.appendChild(movieDiv);
        });
    };

    window.selectMovie = (id) => {
        const movie = movies.find(m => m.id === id);
        selectedMovies.push(movie);
        document.getElementById("selected-movie-title").innerText = movie.title;
        document.getElementById("seat-selection").style.display = "block";
        displaySeatMatrix(movie);
    };

    const displaySeatMatrix = (movie) => {
        const seatMatrixElement = document.getElementById("seat-matrix");
        seatMatrixElement.innerHTML = ""; // Clear previous seats

        // Loop through each seat category
        Object.keys(movie.seats).forEach(category => {
            const categoryDiv = document.createElement("div");
            categoryDiv.innerHTML = `<h4>${category.charAt(0).toUpperCase() + category.slice(1)} Seats</h4>`;
            movie.seats[category].forEach((isAvailable, index) => {
                const seatButton = document.createElement("button");
                seatButton.innerText = `${category.charAt(0).toUpperCase() + category.slice(1)} ${index + 1}`;
                seatButton.className = isAvailable ? "available" : "sold";
                seatButton.disabled = !isAvailable;

                seatButton.onclick = () => {
                    if (isAvailable) {
                        selectedSeats[`${category}-${index}`] = seatButton;
                        seatButton.classList.toggle("selected");
                    }
                };
                categoryDiv.appendChild(seatButton);
            });
            seatMatrixElement.appendChild(categoryDiv);
        });
    };

    document.getElementById("confirm-seat-selection").onclick = () => {
        const selectedSeatNumbers = Object.keys(selectedSeats).map(seat => seat).join(", ");
        alert(`Selected Seats: ${selectedSeatNumbers}`);
        document.getElementById("seat-selection").style.display = "none";
        updateCheckoutList();
    };

    const updateCheckoutList = () => {
        const checkoutListElement = document.getElementById("checkout-list");
        checkoutListElement.innerHTML = "";

        let total = 0;

        // Add selected movies to checkout
        selectedMovies.forEach(movie => {
            const moviePrice = Object.keys(selectedSeats).reduce((sum, seat) => {
                const category = seat.split('-')[0];
                return sum + movie.prices[category];
            }, 0);
            total += moviePrice;
            checkoutListElement.innerHTML += `<p>${movie.title}: $${moviePrice}</p>`;
        });

        // Add selected beverages to checkout
        selectedBeverages.forEach(beverage => {
            checkoutListElement.innerHTML += `<p>${beverage.name}: $${beverage.price}</p>`;
            total += beverage.price;
        });

        // Add selected events to checkout
        selectedEvents.forEach(event => {
            checkoutListElement.innerHTML += `<p>${event.title}: $${event.price}</p>`;
            total += event.price;
        });

        checkoutListElement.innerHTML += `<h3>Total: $${total}</h3>`;
    };

    const displayBeverages = () => {
        const beveragesListElement = document.getElementById("beverages-list");
        beveragesListElement.innerHTML = "";
        beverages.forEach(beverage => {
            const beverageDiv = document.createElement("div");
            beverageDiv.innerHTML = `
                <h3>${beverage.name}</h3>
                <p>Price: $${beverage.price}</p>
                <button onclick="selectBeverage(${beverage.id})">Select Beverage</button>
            `;
            beveragesListElement.appendChild(beverageDiv);
        });
    };

    window.selectBeverage = (id) => {
        const beverage = beverages.find(b => b.id === id);
        selectedBeverages.push(beverage);
        updateCheckoutList();
    };

    document.getElementById("add-beverage").onclick = () => {
        document.getElementById("add-beverage-form").style.display = "block";
    };

    document.getElementById("submit-beverage").onclick = () => {
        const beverageName = document.getElementById("beverage-name").value;
        const beveragePrice = parseFloat(document.getElementById("beverage-price").value);
        if (beverageName && beveragePrice) {
            const newBeverage = { id: beverages.length + 1, name: beverageName, price: beveragePrice };
            beverages.push(newBeverage);
            document.getElementById("beverage-name").value = "";
            document.getElementById("beverage-price").value = "";
            displayBeverages();
        }
    };

    const displayEvents = () => {
        const eventsListElement = document.getElementById("events-list");
        eventsListElement.innerHTML = "";
        events.forEach(event => {
            const eventDiv = document.createElement("div");
            eventDiv.innerHTML = `
                <h3>${event.title}</h3>
                <p>Location: ${event.location}</p>
                <p>Date: ${event.date}</p>
                <p>Time: ${event.time}</p>
                <p>Description: ${event.description}</p>
                <button onclick="selectEvent(${event.id})">Select Event</button>
            `;
            eventsListElement.appendChild(eventDiv);
        });
    };

    window.selectEvent = (id) => {
        const event = events.find(e => e.id === id);
        selectedEvents.push(event);
        updateCheckoutList();
    };

    document.getElementById("add-event").onclick = () => {
        document.getElementById("add-event-form").style.display = "block";
    };

    document.getElementById("submit-event").onclick = () => {
        const eventTitle = document.getElementById("event-title").value;
        const eventLocation = document.getElementById("event-location").value;
        const eventDate = document.getElementById("event-date").value;
        const eventTime = document.getElementById("event-time").value;
        const eventDescription = document.getElementById("event-description").value;

        if (eventTitle && eventLocation && eventDate && eventTime && eventDescription) {
            const newEvent = {
                id: events.length + 1,
                title: eventTitle,
                location: eventLocation,
                date: eventDate,
                time: eventTime,
                description: eventDescription,
                price: 20 // Example price
            };
            events.push(newEvent);
            document.getElementById("event-title").value = "";
            document.getElementById("event-location").value = "";
            document.getElementById("event-description").value = "";
            document.getElementById("event-date").value = "";
            document.getElementById("event-time").value = "";
            displayEvents();
        }
    };

    document.getElementById("confirm-checkout").onclick = () => {
        const paymentMethod = document.getElementById("payment-method").value;
        alert(`Checkout complete with payment method: ${paymentMethod}`);
        // Reset selections
        selectedSeats = {};
        selectedMovies = [];
        selectedBeverages = [];
        selectedEvents = [];
        document.getElementById("checkout-list").innerHTML = "";
    };

    document.getElementById("add-movie").onclick = () => {
        document.getElementById("add-movie-form").style.display = "block";
    };

    document.getElementById("submit-movie").onclick = () => {
        const movieTitle = document.getElementById("movie-title").value;
        const movieDuration = document.getElementById("movie-duration").value;
        const movieDirector = document.getElementById("movie-director").value;
        const movieProducer = document.getElementById("movie-producer").value;
        const movieLanguage = document.getElementById("movie-language").value;
        const movieGenre = document.getElementById("movie-genre").value;
        const movieStoryline = document.getElementById("movie-storyline").value;
        const moviePoster = document.getElementById("movie-poster").value;
        const movieTrailer = document.getElementById("movie-trailer").value;

        if (movieTitle && movieDuration && movieDirector && movieProducer && movieLanguage && movieGenre && movieStoryline && moviePoster && movieTrailer) {
            const newMovie = {
                id: movies.length + 1,
                title: movieTitle,
                duration: movieDuration,
                director: movieDirector,
                producer: movieProducer,
                language: movieLanguage,
                genre: movieGenre,
                storyline: movieStoryline,
                poster: moviePoster,
                trailer: movieTrailer,
                prices: { recliner: 10, platinum: 15, gold: 12, silver: 8 },
                seats: { recliner: Array(10).fill(true), platinum: Array(10).fill(true), gold: Array(10).fill(true), silver: Array(10).fill(true) }
            };
            movies.push(newMovie);
            document.getElementById("movie-title").value = "";
            document.getElementById("movie-duration").value = "";
            document.getElementById("movie-director").value = "";
            document.getElementById("movie-producer").value = "";
            document.getElementById("movie-language").value = "";
            document.getElementById("movie-genre").value = "";
            document.getElementById("movie-storyline").value = "";
            document.getElementById("movie-poster").value = "";
            document.getElementById("movie-trailer").value = "";
            displayMovies();
        }
    };

    // Initialize default movies, beverages, and events
    displayMovies();
    displayBeverages();
    displayEvents();
});
document.addEventListener('DOMContentLoaded', function() {
    // Toggle seat selection
    const seatMatrix = document.getElementById('seat-matrix');
    let selectedSeats = [];

    seatMatrix.addEventListener('click', function(e) {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
            e.target.classList.toggle('selected');
            const seatNumber = e.target.dataset.seat;

            if (selectedSeats.includes(seatNumber)) {
                selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
            } else {
                selectedSeats.push(seatNumber);
            }

            console.log('Selected Seats:', selectedSeats); // Debugging output
        }
    });

    // Confirm seat selection and proceed to checkout
    document.getElementById('confirm-seat-selection').addEventListener('click', function() {
        if (selectedSeats.length > 0) {
            alert('Seats Selected: ' + selectedSeats.join(', '));
            // Proceed to checkout logic
            updateCheckout(selectedSeats);
        } else {
            alert('Please select at least one seat.');
        }
    });

    // Function to update checkout with seat prices
    function updateCheckout(seats) {
        const seatPrices = {
            recliner: 500,
            platinum: 300,
            gold: 200,
            silver: 100
        };

        let totalAmount = 0;
        seats.forEach(seat => {
            if (seat.includes('A') || seat.includes('B')) {
                totalAmount += seatPrices.recliner;
            } else if (seat.includes('C') || seat.includes('D')) {
                totalAmount += seatPrices.platinum;
            }
            // Add more logic based on seat types
        });

        // Add selected seats and price to checkout
        const checkoutList = document.getElementById('checkout-list');
        checkoutList.innerHTML = `<p>Seats: ${seats.join(', ')}</p><p>Total: $${totalAmount}</p>`;
    }
});
document.addEventListener('DOMContentLoaded', function() {
    // Toggle seat selection
    const seatMatrix = document.getElementById('seat-matrix');
    let selectedSeats = [];

    seatMatrix.addEventListener('click', function(e) {
        if (e.target.classList.contains('seat') && !e.target.classList.contains('booked')) {
            e.target.classList.toggle('selected');
            const seatNumber = e.target.dataset.seat;

            if (selectedSeats.includes(seatNumber)) {
                selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
            } else {
                selectedSeats.push(seatNumber);
            }

            console.log('Selected Seats:', selectedSeats); // Debugging output
        }
    });

    // Confirm seat selection and proceed to checkout
    document.getElementById('confirm-seat-selection').addEventListener('click', function() {
        if (selectedSeats.length > 0) {
            alert('Seats Selected: ' + selectedSeats.join(', '));
            // Proceed to checkout logic
            updateCheckout(selectedSeats);
        } else {
            alert('Please select at least one seat.');
        }
    });

    // Function to update checkout with seat prices
    function updateCheckout(seats) {
        const seatPrices = {
            recliner: 500,
            platinum: 300,
            gold: 200,
            silver: 100
        };

        let totalAmount = 0;
        seats.forEach(seat => {
            if (seat.includes('A') || seat.includes('B')) {
                totalAmount += seatPrices.recliner;
            } else if (seat.includes('C') || seat.includes('D')) {
                totalAmount += seatPrices.platinum;
            }
            // Add more logic based on seat types
        });

        // Add selected seats and price to checkout
        const checkoutList = document.getElementById('checkout-list');
        checkoutList.innerHTML = `<p>Seats: ${seats.join(', ')}</p><p>Total: $${totalAmount}</p>`;
    }
});

