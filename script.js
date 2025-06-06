document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filter');
    const items = document.querySelectorAll('.gallery-item');
    const grid = document.querySelector('.gallery-grid');
    
    // Calculate positions for the grid items
    function arrangeItems() {
      const visibleItems = Array.from(items).filter(item => !item.classList.contains('hide'));
      const columnWidth = items[0].offsetWidth;
      const gapSize = 16; // 1rem gap
      
      // Calculate positions for each item
      let colHeights = [0, 0, 0]; // Track height of each column (for 3 columns)
      
      // Handle responsive adjustments
      if (window.innerWidth <= 600) {
        colHeights = [0]; // 1 column for mobile
      } else if (window.innerWidth <= 900) {
        colHeights = [0, 0]; // 2 columns for tablets
      }
      
      // Place each visible item
      visibleItems.forEach((item, index) => {
        // Find the column with the smallest height
        const minColIndex = colHeights.indexOf(Math.min(...colHeights));
        
        // Calculate X position (which column)
        const xPos = minColIndex * (columnWidth + gapSize);
        
        // Calculate Y position (how far down the column)
        const yPos = colHeights[minColIndex];
        
        // Apply position with delay for staggered effect
        const delay = index * 70; // Increased delay for more visible staggering
        
        setTimeout(() => {
          item.style.transform = `translate(${xPos}px, ${yPos}px)`;
          item.style.opacity = '1';
        }, delay);
        
        // Update the height of this column
        colHeights[minColIndex] += item.offsetHeight + gapSize;
      });
      
      // Set the height of the grid container
      const maxHeight = Math.max(...colHeights);
      grid.style.minHeight = maxHeight + 'px';
    }
    
    // Initial setup - position all items
    function initializeLayout() {
      // Set initial positions for items
      items.forEach((item, index) => {
        // Give each item a unique starting position to show movement
        item.style.transform = 'translate(0, 0)';
        item.style.opacity = '0';
      });
      
      // Wait for images to load before initial arrangement
      setTimeout(arrangeItems, 100);
    }
    
    // Handle filter clicks
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Update active filter
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-category');
        
        // First, mark items as hidden/visible
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
        
        // Then rearrange after a slight delay
        setTimeout(arrangeItems, 100);
      });
    });
    
    // Initialize layout once images are loaded
    window.addEventListener('load', initializeLayout);
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(arrangeItems, 250);
    });
  });


  const toggleButton = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
  
    toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('translate-x-full');
    });
  
    // Optional: close sidebar on click outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
        sidebar.classList.add('translate-x-full');
      }
    });

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-10");
          entry.target.classList.add("opacity-100", "translate-y-0");
        } else {
          entry.target.classList.remove("opacity-100", "translate-y-0");
          entry.target.classList.add("opacity-0", "translate-y-10");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  items.forEach(item => {
    observer.observe(item);
  });

  // Optional: Dynamic line filler as you scroll
  const line = document.getElementById("timeline-line");
  window.addEventListener("scroll", () => {
    const section = document.getElementById("timeline");
    const top = section.getBoundingClientRect().top;
    const height = section.offsetHeight;
    const windowHeight = window.innerHeight;

    if (top < windowHeight && top + height > 0) {
      const percent =
        Math.min(1, Math.max(0, (windowHeight - top) / (height + windowHeight)));
      line.style.height = `${percent * 100}%`;
    }
  });
});
