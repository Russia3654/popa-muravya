const triangleHeight = 50; // Height of the triangle
            const triangleWidth = 50; // Width of the triangle

            function createTriangles() {
                const svg = document.getElementById('triangleCanvas');
                svg.innerHTML = ''; // Clear existing triangles

                const rows = Math.ceil(window.innerHeight / (triangleHeight * 0.75)); // Calculate rows
                const cols = Math.ceil((window.innerWidth / triangleWidth) + 1); // Calculate columns

                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        const x = col * triangleWidth;
                        const y = row * triangleHeight; // Adjusted for vertical spacing

                        // Offset every second row
                        const offsetX = (row % 2 === 0) ? 0 : -(triangleWidth / 2);

                        // Create upward triangle
                        const upTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                        upTriangle.setAttribute("points", `${x + offsetX - triangleWidth / 2},${y + triangleHeight} ${x + offsetX},${y} ${x + offsetX + triangleWidth / 2},${y + triangleHeight}`);
                        upTriangle.setAttribute("class", "triangle");
                        upTriangle.setAttribute("fill", "#322e2d");
                        addHoverEffect(upTriangle);

                        // Append upward triangle to SVG
                        svg.appendChild(upTriangle);

                        // Create downward triangle
                        const downTriangle = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
                        downTriangle.setAttribute("points", `${x + offsetX},${y} ${x + offsetX + triangleWidth / 2},${y + triangleHeight} ${x + offsetX + triangleWidth},${y}`);
                        downTriangle.setAttribute("class", "triangle");
                        downTriangle.setAttribute("fill", "#322e2d");
                        addHoverEffect(downTriangle);

                        // Append downward triangle to SVG
                        svg.appendChild(downTriangle);
                    }
                }
            }

            function addHoverEffect(triangle) {
                triangle.addEventListener('mouseenter', () => {
                    triangle.classList.add('hovered');
                    const triangles = document.querySelectorAll('.triangle');
                    const hoveredRect = triangle.getBoundingClientRect();
            
                    // Store the surrounding triangles
                    const surroundingTriangles = [];
            
                    triangles.forEach(t => {
                        if (t !== triangle) {
                            const rect = t.getBoundingClientRect();
            
                            // Check adjacency based on the triangle layout
                            const isAbove = (rect.bottom === hoveredRect.top && rect.left === hoveredRect.left);
                            const isBelow = (rect.top === hoveredRect.bottom && rect.left === hoveredRect.left);
                            const isLeft = (rect.right === hoveredRect.left && rect.bottom === hoveredRect.bottom);
                            const isRight = (rect.left === hoveredRect.right && rect.top === hoveredRect.top);

                            // Add the triangle to the surroundingTriangles array if adjacent
                            if (isAbove || isBelow || isLeft || isRight) {
                                surroundingTriangles.push(t);
                            }
                        }
                    });
            
                    // Change color of surrounding triangles
                    surroundingTriangles.forEach(t => {
                        t.classList.add('surrounding');
                    });
                });
            
                triangle.addEventListener('mouseleave', () => {
                    triangle.classList.remove ('hovered');
                    const triangles = document.querySelectorAll('.triangle.hovered, .triangle.surrounding');
                    triangles.forEach(t => {
                        t.classList.remove('hovered');
                        t.classList.remove('surrounding'); // Reset surrounding triangles
                    });
                });
            }

            

            // Create triangles on load
            createTriangles();
            
            // Recreate triangles on window resize
            window.addEventListener('resize', createTriangles);