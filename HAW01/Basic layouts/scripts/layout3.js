const leftBtn = document.getElementById('left-btn');
        const rightBtn = document.getElementById('right-btn');
        const carouselTrack = document.getElementById('carousel-track');

        const dot1 = document.getElementById('slide-1');
        const dot2 = document.getElementById('slide-2');
        const dot3 = document.getElementById('slide-3');

        let currentSlideIndex = 0;

        function updateCarouselPosition(move) {

            const slideWidth = carouselTrack.firstElementChild.getBoundingClientRect().width;
            console.log("Width=" + slideWidth)
            const amountToMove = move * slideWidth;
    
            carouselTrack.style.transform = `translateX(-${amountToMove}px)`;

            
            
            // 3. Reset all dots to the inactive slate color first
            dot1.className = "h-4 w-4 rounded-full bg-slate-500";
            dot2.className = "h-4 w-4 rounded-full bg-slate-500";
            dot3.className = "h-4 w-4 rounded-full bg-slate-500";

            // 4. Give only the active dot the bright blue color based on the 'move' number
            if (move === 0) dot1.className = "h-4 w-4 rounded-full bg-blue-800";
            if (move === 1) dot2.className = "h-4 w-4 rounded-full bg-blue-800";
            if (move === 2) dot3.className = "h-4 w-4 rounded-full bg-blue-800";
        }

        rightBtn.addEventListener('click', () => {
    
            if (currentSlideIndex < 2) {
            currentSlideIndex++;
           
            } else{
                currentSlideIndex = 0;
            }

            console.log("Current Slide Index:", currentSlideIndex);
            updateCarouselPosition(currentSlideIndex);
            
        });

        


        leftBtn.addEventListener('click', () => {
    
            if (currentSlideIndex > 0) {
                currentSlideIndex--;
            
            }else{
                currentSlideIndex = 2;
            }

            console.log("Current Slide Index:", currentSlideIndex); 

            updateCarouselPosition(currentSlideIndex);

        });

        dot1.addEventListener('click', ()=>{
            currentSlideIndex = 0;
            updateCarouselPosition(currentSlideIndex);

        });

        dot2.addEventListener('click', ()=>{
            currentSlideIndex = 1;
            updateCarouselPosition(currentSlideIndex);

        });

        dot3.addEventListener('click', ()=>{
            currentSlideIndex = 2;
            updateCarouselPosition(currentSlideIndex);
        });

        window.addEventListener('resize', () => {
            updateCarouselPosition(currentSlideIndex);
        });