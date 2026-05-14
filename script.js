// Initial Data - Built from images in the folder
const initialImages = [
    { id: '1', url: 'images/ChatGPT Image 2026年5月13日 下午02_50_32.png', title: 'Lexus LC500h', description: '奢華跑車，展現極致工藝與動力。', tags: ['Coupe', 'Lexus', '豪華'] },
    { id: '2', url: 'images/ChatGPT Image 2026年5月13日 下午02_50_38.png', title: 'Toyota Supra', description: '經典傳奇跑車，追求純粹的操控樂趣。', tags: ['Sport', 'Toyota', '跑車'] },
    { id: '3', url: 'images/ChatGPT Image 2026年5月13日 下午04_24_09.png', title: 'Peugeot 3008', description: '法式美學設計，卓越的都會休旅體驗。', tags: ['SUV', 'Peugeot', '家庭'] },
    { id: '4', url: 'images/ChatGPT Image 2026年5月14日 上午09_35_17.png', title: 'Nissan GT-R', description: '東瀛戰神，賽道上的不敗神話。', tags: ['Sport', 'Nissan', '性能'] },
    { id: '5', url: 'images/ChatGPT Image 2026年5月14日 上午09_35_21.png', title: 'Audi R8', description: '德系超跑經典，融合科技與速度。', tags: ['Supercar', 'Audi', '極速'] },
    { id: '6', url: 'images/placeholder.png', title: 'Mazda MX-5', description: '輕巧靈活的敞篷跑車。', tags: ['Roadster', 'Mazda'] },
    { id: '7', url: 'images/placeholder.png', title: 'BMW M4', description: '性能房車的標竿。', tags: ['Sedan', 'BMW', '性能'] },
    { id: '8', url: 'images/placeholder.png', title: 'Mercedes-Benz G-Class', description: '越野之王，硬派與奢華的結合。', tags: ['SUV', 'Mercedes-Benz', '越野'] },
    { id: '9', url: 'images/placeholder.png', title: 'Ford Mustang', description: '美式肌肉車代表，狂野不羈。', tags: ['Muscle', 'Ford'] },
    { id: '10', url: 'images/placeholder.png', title: 'Porsche 911', description: '永恆的跑車設計圖騰。', tags: ['Sport', 'Porsche'] },
    { id: '11', url: 'images/placeholder.png', title: 'Honda Civic Type R', description: '最強前驅鋼砲。', tags: ['Hatchback', 'Honda'] },
    { id: '12', url: 'images/placeholder.png', title: 'Tesla Model S', description: '純電豪華轎車的先驅。', tags: ['EV', 'Tesla'] },
    { id: '13', url: 'images/placeholder.png', title: 'Ferrari F8', description: '躍馬精神，極致的動力美學。', tags: ['Supercar', 'Ferrari'] },
    { id: '14', url: 'images/placeholder.png', title: 'Lamborghini Huracan', description: '狂暴的颶風超跑。', tags: ['Supercar', 'Lamborghini'] },
    { id: '15', url: 'images/placeholder.png', title: 'Subaru WRX STI', description: '拉力賽血統的四驅戰將。', tags: ['Sedan', 'Subaru'] },
    { id: '16', url: 'images/placeholder.png', title: 'Volvo XC90', description: '安全與北歐簡約設計的典範。', tags: ['SUV', 'Volvo'] },
    { id: '17', url: 'images/placeholder.png', title: 'Jaguar F-Type', description: '優雅與野性並存的英式跑車。', tags: ['Coupe', 'Jaguar'] },
    { id: '18', url: 'images/placeholder.png', title: 'Land Rover Defender', description: '重塑經典的越野傳奇。', tags: ['SUV', 'Land Rover'] },
    { id: '19', url: 'images/placeholder.png', title: 'Maserati GranTurismo', description: '浪漫的海神超跑。', tags: ['GT', 'Maserati'] },
    { id: '20', url: 'images/placeholder.png', title: 'McLaren 720S', description: '極致空氣動力學的結晶。', tags: ['Supercar', 'McLaren'] },
    { id: '21', url: 'images/placeholder.png', title: 'Bentley Continental GT', description: '頂級豪奢的長途壯遊車。', tags: ['GT', 'Bentley'] },
    { id: '22', url: 'images/placeholder.png', title: 'Aston Martin DB11', description: '英倫紳士般的優雅超跑。', tags: ['GT', 'Aston Martin'] },
    { id: '23', url: 'images/placeholder.png', title: 'Mini Cooper S', description: '靈活有趣的英倫小車。', tags: ['Hatchback', 'Mini'] },
    { id: '24', url: 'images/placeholder.png', title: 'Volkswagen Golf GTI', description: '掀背鋼砲的代名詞。', tags: ['Hatchback', 'Volkswagen'] },
    { id: '25', url: 'images/placeholder.png', title: 'Jeep Wrangler', description: '硬派越野，享受大自然的冒險。', tags: ['SUV', 'Jeep'] },
    { id: '26', url: 'images/placeholder.png', title: 'Dodge Challenger', description: '正宗美式肌肉精神。', tags: ['Muscle', 'Dodge'] },
    { id: '27', url: 'images/placeholder.png', title: 'Rolls-Royce Phantom', description: '車中之王，無與倫比的靜謐。', tags: ['Sedan', 'Rolls-Royce'] },
    { id: '28', url: 'images/placeholder.png', title: 'Bugatti Chiron', description: '地表最強、最快的量產車之一。', tags: ['Hypercar', 'Bugatti'] },
    { id: '29', url: 'images/placeholder.png', title: 'Alfa Romeo Giulia', description: '義式激情的絕美房車。', tags: ['Sedan', 'Alfa Romeo'] },
    { id: '30', url: 'images/placeholder.png', title: 'Lotus Emira', description: '最後的燃油輕量化跑車。', tags: ['Sport', 'Lotus'] },
    { id: '31', url: 'images/placeholder.png', title: 'Genesis G80', description: '韓系新貴，優雅與科技的交織。', tags: ['Sedan', 'Genesis'] },
    { id: '32', url: 'images/placeholder.png', title: 'Hyundai Ioniq 5', description: '未來感十足的純電休旅。', tags: ['EV', 'Hyundai'] },
    { id: '33', url: 'images/placeholder.png', title: 'Kia EV6', description: '高性能純電跨界跑旅。', tags: ['EV', 'Kia'] },
    { id: '34', url: 'images/placeholder.png', title: 'Cadillac Escalade', description: '美式巨無霸豪華 SUV。', tags: ['SUV', 'Cadillac'] }
];

// List of all images currently in the images folder
const availableImagesInFolder = [
    'ChatGPT Image 2026年5月13日 下午02_50_32.png',
    'ChatGPT Image 2026年5月13日 下午02_50_38.png',
    'ChatGPT Image 2026年5月13日 下午04_24_09.png',
    'ChatGPT Image 2026年5月14日 上午09_35_17.png',
    'ChatGPT Image 2026年5月14日 上午09_35_21.png',
    'placeholder.png'
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
