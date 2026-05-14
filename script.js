// Initial Data - Built from images in the folder
const initialImages = [
    {
        id: '1',
        url: 'images/ChatGPT Image 2026年5月13日 下午02_50_32.png',
        title: '賽博龐克模型 A',
        description: '具有霓虹燈光效果的詳細 3D 模型渲染圖。',
        tags: ['賽博龐克', '3D', '霓虹']
    },
    {
        id: '2',
        url: 'images/ChatGPT Image 2026年5月13日 下午02_50_38.png',
        title: '空靈景觀',
        description: '色彩鮮豔且充滿超現實感的景觀設計。',
        tags: ['超現實', '景觀', '藝術']
    },
    {
        id: '3',
        url: 'images/ChatGPT Image 2026年5月13日 下午04_24_09.png',
        title: '現代建築模型',
        description: '線條流暢的現代建築概念設計。',
        tags: ['建築', '現代', '概念']
    }
];

// List of all images currently in the images folder
const availableImagesInFolder = [
    'ChatGPT Image 2026年5月13日 下午02_50_32.png',
    'ChatGPT Image 2026年5月13日 下午02_50_38.png',
    'ChatGPT Image 2026年5月13日 下午04_24_09.png',
    'ChatGPT Image 2026年5月14日 上午09_35_17.png',
    'ChatGPT Image 2026年5月14日 上午09_35_21.png'
];

let galleryData = JSON.parse(localStorage.getItem('gallery_data')) || initialImages;
let isManageMode = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    setupEventListeners();
    populateFolderSelect();
});

function populateFolderSelect() {
    const select = document.getElementById('folderFileSelect');
    select.innerHTML = availableImagesInFolder.map(file => 
        `<option value="images/${file}">${file}</option>`
    ).join('');
}

function toggleImageInputType() {
    const type = document.getElementById('imageSourceType').value;
    document.getElementById('folderInputGroup').style.display = type === 'folder' ? 'block' : 'none';
    document.getElementById('uploadInputGroup').style.display = type === 'upload' ? 'block' : 'none';
}

function renderGallery(filterText = '') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const filtered = galleryData.filter(img => 
        img.title.toLowerCase().includes(filterText.toLowerCase()) ||
        img.tags.some(t => t.toLowerCase().includes(filterText.toLowerCase()))
    );

    filtered.forEach(img => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
            <div class="image-wrapper" onclick="openLightbox('${img.url}', '${img.title}')">
                <img src="${img.url}" alt="${img.title}" loading="lazy">
            </div>
            <div class="image-info">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3>${img.title}</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        ${isManageMode ? `<button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="openEditModal('${img.id}')">編輯</button>` : ''}
                        ${isManageMode ? `<button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; background: #ef4444;" onclick="deleteImage('${img.id}')">刪除</button>` : ''}
                    </div>
                </div>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 0.8rem;">${img.description}</p>
                <div class="image-tags">
                    ${img.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        renderGallery(e.target.value);
    });

    const manageBtn = document.getElementById('manageBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addBtn = document.getElementById('addBtn');
    manageBtn.addEventListener('click', () => {
        isManageMode = !isManageMode;
        manageBtn.textContent = isManageMode ? '結束管理' : '管理模式';
        manageBtn.style.background = isManageMode ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'linear-gradient(135deg, #38bdf8, #2563eb)';
        resetBtn.style.display = isManageMode ? 'block' : 'none';
        addBtn.style.display = isManageMode ? 'block' : 'none';
        renderGallery(searchInput.value);
    });

    addBtn.addEventListener('click', () => {
        document.getElementById('addModal').style.display = 'flex';
    });

    resetBtn.addEventListener('click', () => {
        if (confirm('確定要重設所有模型資料嗎？這將會覆蓋您目前的修改。')) {
            localStorage.removeItem('gallery_data');
            galleryData = [...initialImages];
            renderGallery(searchInput.value);
        }
    });

    const editForm = document.getElementById('editForm');
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveChanges();
    });

    const addForm = document.getElementById('addForm');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewImage();
    });
}

// Modal Functions
function openEditModal(id) {
    const img = galleryData.find(i => i.id === id);
    if (!img) return;

    document.getElementById('editId').value = img.id;
    document.getElementById('editTitle').value = img.title;
    document.getElementById('editDesc').value = img.description;
    document.getElementById('editTags').value = img.tags.join(', ');
    
    document.getElementById('editModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

function closeAddModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addForm').reset();
}

function deleteImage(id) {
    if (confirm('確定要刪除這張圖片嗎？')) {
        galleryData = galleryData.filter(img => img.id !== id);
        localStorage.setItem('gallery_data', JSON.stringify(galleryData));
        renderGallery(document.getElementById('searchInput').value);
    }
}

function addNewImage() {
    const sourceType = document.getElementById('imageSourceType').value;
    const title = document.getElementById('addTitle').value;
    const desc = document.getElementById('addDesc').value;
    const tags = document.getElementById('addTags').value.split(',').map(t => t.trim()).filter(t => t !== '');

    if (sourceType === 'folder') {
        const selectedUrl = document.getElementById('folderFileSelect').value;
        const newImg = {
            id: Date.now().toString(),
            url: selectedUrl,
            title: title,
            description: desc,
            tags: tags
        };
        galleryData.push(newImg);
        saveAndRefresh();
    } else {
        const fileInput = document.getElementById('addFile');
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.size > 2 * 1024 * 1024) {
                alert('檔案過大！建議上傳 2MB 以下的圖片以確保儲存順暢。');
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                const newImg = {
                    id: Date.now().toString(),
                    url: e.target.result,
                    title: title,
                    description: desc,
                    tags: tags
                };
                galleryData.push(newImg);
                saveAndRefresh();
            };
            reader.readAsDataURL(file);
        }
    }
}

function saveAndRefresh() {
    localStorage.setItem('gallery_data', JSON.stringify(galleryData));
    renderGallery(document.getElementById('searchInput').value);
    closeAddModal();
}

function saveChanges() {
    const id = document.getElementById('editId').value;
    const title = document.getElementById('editTitle').value;
    const desc = document.getElementById('editDesc').value;
    const tags = document.getElementById('editTags').value.split(',').map(t => t.trim()).filter(t => t !== '');

    const index = galleryData.findIndex(i => i.id === id);
    if (index !== -1) {
        galleryData[index] = { ...galleryData[index], title, description: desc, tags };
        localStorage.setItem('gallery_data', JSON.stringify(galleryData));
        renderGallery(document.getElementById('searchInput').value);
        closeModal();
    }
}

// Lightbox Functions
function openLightbox(url, title) {
    if (isManageMode) return; // Don't open lightbox in manage mode
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');

    lightboxImg.src = url;
    lightboxTitle.textContent = title;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const editModal = document.getElementById('editModal');
    const addModal = document.getElementById('addModal');
    if (event.target == editModal) {
        closeModal();
    }
    if (event.target == addModal) {
        closeAddModal();
    }
}
