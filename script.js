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

const ADMIN_PASSWORD = 'admin'; // 您可以在此修改管理密碼

let galleryData = JSON.parse(localStorage.getItem('gallery_data')) || initialImages;
let isManageMode = false;
let isLoggedIn = false;
let activeFilter = '全部';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFilterPills();
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

function renderFilterPills() {
    const filterPills = document.getElementById('filterPills');
    const allTags = ['全部', ...new Set(galleryData.flatMap(img => img.tags))];
    
    filterPills.innerHTML = allTags.map(tag => {
        const count = tag === '全部' ? galleryData.length : galleryData.filter(img => img.tags.includes(tag)).length;
        return `
            <div class="filter-pill ${tag === activeFilter ? 'active' : ''}" onclick="setFilter('${tag}')">
                ${tag} <span style="opacity: 0.6; font-size: 0.8rem; margin-left: 0.3rem;">${count}</span>
            </div>
        `;
    }).join('');
}

function setFilter(tag) {
    activeFilter = tag;
    renderFilterPills();
    renderGallery(document.getElementById('searchInput').value);
}

function renderGallery(filterText = '') {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    const filtered = galleryData.filter(img => {
        const matchesSearch = img.title.toLowerCase().includes(filterText.toLowerCase()) ||
                             img.tags.some(t => t.toLowerCase().includes(filterText.toLowerCase()));
        const matchesFilter = activeFilter === '全部' || img.tags.includes(activeFilter);
        return matchesSearch && matchesFilter;
    });

    filtered.forEach(img => {
        const primaryTag = img.tags[0] || '模型';
        const card = document.createElement('div');
        card.className = 'image-card';
        card.innerHTML = `
            <div class="image-wrapper" onclick="openLightbox('${img.url}', '${img.title}')">
                <div class="card-badge">${primaryTag}</div>
                <img src="${img.url}" alt="${img.title}" loading="lazy">
            </div>
            <div class="image-info">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <h3 style="font-weight: 700; letter-spacing: -0.5px;">${img.title}</h3>
                    <div style="display: flex; gap: 0.5rem;">
                        ${isManageMode ? `<button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem;" onclick="openEditModal('${img.id}')">編輯</button>` : ''}
                        ${isManageMode ? `<button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.8rem; background: #ef4444;" onclick="deleteImage('${img.id}')">刪除</button>` : ''}
                    </div>
                </div>
                <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5;">${img.description}</p>
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
    const exportBtn = document.getElementById('exportBtn');
    
    manageBtn.addEventListener('click', () => {
        if (!isLoggedIn) {
            document.getElementById('loginModal').style.display = 'flex';
        } else {
            toggleManageMode();
        }
    });

    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('loginPassword').value;
        if (pwd === ADMIN_PASSWORD) {
            isLoggedIn = true;
            closeLoginModal();
            toggleManageMode();
        } else {
            alert('密碼錯誤！');
        }
    });

    addBtn.addEventListener('click', () => {
        document.getElementById('addModal').style.display = 'flex';
    });

    exportBtn.addEventListener('click', openExportModal);

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

function openExportModal() {
    const exportArea = document.getElementById('exportArea');
    // Format JSON with nice indentation
    const jsonStr = JSON.stringify(galleryData, null, 4);
    exportArea.value = jsonStr;
    document.getElementById('exportModal').style.display = 'flex';
}

function closeExportModal() {
    document.getElementById('exportModal').style.display = 'none';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('loginPassword').value = '';
}

function toggleManageMode() {
    const manageBtn = document.getElementById('manageBtn');
    const resetBtn = document.getElementById('resetBtn');
    const addBtn = document.getElementById('addBtn');
    const exportBtn = document.getElementById('exportBtn');
    const searchInput = document.getElementById('searchInput');

    isManageMode = !isManageMode;
    if (!isManageMode) isLoggedIn = false; // 退出時重設登入狀態
    manageBtn.textContent = isManageMode ? '結束管理' : '管理模式';
    manageBtn.style.background = isManageMode ? 'linear-gradient(135deg, #f43f5e, #e11d48)' : 'linear-gradient(135deg, #38bdf8, #2563eb)';
    resetBtn.style.display = isManageMode ? 'block' : 'none';
    addBtn.style.display = isManageMode ? 'block' : 'none';
    exportBtn.style.display = isManageMode ? 'block' : 'none';
    renderGallery(searchInput.value);
}

function copyExportCode() {
    const exportArea = document.getElementById('exportArea');
    exportArea.select();
    document.execCommand('copy');
    alert('代碼已複製到剪貼簿！');
}

function deleteImage(id) {
    if (confirm('確定要刪除這張圖片嗎？')) {
        galleryData = galleryData.filter(img => img.id !== id);
        localStorage.setItem('gallery_data', JSON.stringify(galleryData));
        renderFilterPills(); // 更新標籤統計
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
    renderFilterPills(); // 更新標籤統計
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
        renderFilterPills(); // 更新標籤統計
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
    const exportModal = document.getElementById('exportModal');
    const loginModal = document.getElementById('loginModal');
    if (event.target == editModal) {
        closeModal();
    }
    if (event.target == addModal) {
        closeAddModal();
    }
    if (event.target == exportModal) {
        closeExportModal();
    }
    if (event.target == loginModal) {
        closeLoginModal();
    }
}
