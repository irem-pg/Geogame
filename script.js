// Function to toggle the sliding box visibility
function toggleBox(boxId) {
    // Hide all boxes
    const boxes = document.querySelectorAll('.sliding-box');
    boxes.forEach(box => {
        box.style.display = 'none';
    });

    // Show the selected box
    const selectedBox = document.getElementById(boxId);
    if (selectedBox) {
        selectedBox.style.display = 'block';
        console.log(`Box with ID ${boxId} is now visible.`);
    } else {
        console.log(`Box with ID ${boxId} not found.`);
    }
}

// Function to close the sliding box
function closeBox(boxId) {
    const selectedBox = document.getElementById(boxId);
    selectedBox.style.display = 'none';
}


function redirectToPage() {
    var menu = document.getElementById('menu');
    var selectedValue = menu.value;
    
    // Redirect based on the selected value
    if (selectedValue === 'option1') {
        window.location.href = 'USA.html';
    } else if (selectedValue === 'option2') {
        window.location.href = 'germany.html';
    } else if (selectedValue === 'option3') {
        window.location.href = 'turkey.html'; 
    }else if (selectedValue === 'option4') {
        window.location.href = 'index.html'; 
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const slidingBox = document.getElementById("box3");
    if (slidingBox) {
        slidingBox.style.opacity = "0"; // Fully transparent
        slidingBox.style.transform = "translate(-50%, -50%) scale(0.9)"; // Slightly scaled
    }
});