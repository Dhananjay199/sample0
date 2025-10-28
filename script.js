const dragDropArea = document.getElementById('drag-drop-area');
const uploaderSection = document.getElementById('uploader');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dragDropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dragDropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dragDropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dragDropArea.addEventListener('drop', handleDrop, false);

// Handle click to upload
dragDropArea.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
        const file = e.target.files[0];
        handleFiles([file]);
    }
    input.click();
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dragDropArea.classList.add('highlight');
}

function unhighlight(e) {
    dragDropArea.classList.remove('highlight');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
}

function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        const img = document.createElement('img');
        img.src = reader.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '500px';

        // Clear the uploader section and display the image
        uploaderSection.innerHTML = '';
        uploaderSection.appendChild(img);
    }
}

// Add a bit of styling for the highlight effect
const style = document.createElement('style');
style.innerHTML = `
.highlight {
    border-color: #007bff;
}
`;
document.head.appendChild(style);