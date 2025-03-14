// Export a class that encapsulates the search functionality
export class SafariSearch {
    constructor() {
      this.debounceDelay = 400; // 400ms as set before
      this.debounceTimeout = null;
      this.filterForm = document.getElementById("filterForm");
      this.resultsContainer = document.getElementById("resultsContainer");
      this.clearBtn = document.getElementById("clearFilters");
  
      this.initEvents();
    }
  
    initEvents() {
      // Add change event listeners for all inputs/selects (except hidden)
      this.filterForm.querySelectorAll("input:not([type='hidden']), select").forEach(input => {
        input.addEventListener("change", () => {
          clearTimeout(this.debounceTimeout);
          this.debounceTimeout = setTimeout(() => this.fetchResults(), this.debounceDelay);
        });
      });
      
      // Retrieve the original default values from the hidden inputs using getAttribute
      const defaultMinDays = Number(document.getElementById('min_days').getAttribute('value'));
      const defaultMaxDays = Number(document.getElementById('max_days').getAttribute('value'));
      const defaultMinPrice = Number(document.getElementById('min_price').getAttribute('value'));
      const defaultMaxPrice = Number(document.getElementById('max_price').getAttribute('value'));
      // Clear Filters button: reset the form and fetch all results
      this.clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.filterForm.reset();
        // Get the sliders
        const daysSlider = document.getElementById('daysSlider');
        const priceSlider = document.getElementById('priceSlider');
        // Reset the sliders to their default values
        daysSlider.noUiSlider.set([defaultMinDays, defaultMaxDays]);
        priceSlider.noUiSlider.set([defaultMinPrice, defaultMaxPrice]);
        this.fetchResults();
      });
    }
  
    fetchResults() {
      const formData = new FormData(this.filterForm);
      const queryString = new URLSearchParams(formData).toString();
  
      fetch('/extended-search?' + queryString, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        this.resultsContainer.innerHTML = html;
      })
      .catch(err => {
        console.error("Error fetching results:", err);
        this.resultsContainer.innerHTML = '<div class="alert alert-danger" role="alert">An error occurred while fetching results. Please try again.</div>';
      });
    }
  
    debouncedFetch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => this.fetchResults(), this.debounceDelay);
    }
  }
  