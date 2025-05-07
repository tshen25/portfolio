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