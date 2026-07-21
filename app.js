/**
 * Lớp đại diện cho một Thủ tục hành chính
 */
class Procedure {
    constructor(id, title, pdfUrl) {
        this.id = id;
        this.title = title;
        this.pdfUrl = pdfUrl;
    }

    /**
     * Render HTML (Thẻ Procedure)
     */
    render() {
        const card = document.createElement('div');
        card.className = 'procedure-card animate-slide-up';
        card.innerHTML = `
            <div class="procedure-icon">
                <i class="fa-regular fa-file-pdf"></i>
            </div>
            <h3>${this.title}</h3>
            <div class="procedure-meta">
                <i class="fa-solid fa-link"></i>
                <span>Xem tài liệu</span>
            </div>
        `;

        // Thêm sự kiện click để mở PDF
        card.addEventListener('click', () => {
            app.openPdfViewer(this.title, this.pdfUrl);
        });

        return card;
    }
}

/**
 * Lớp đại diện cho một Lĩnh vực
 */
class Category {
    constructor(id, name, proceduresData = []) {
        this.id = id;
        this.name = name;
        // Chuyển đổi mảng data thành các đối tượng Procedure
        this.procedures = proceduresData.map(p => new Procedure(p.id, p.title, p.pdfUrl));
    }

    /**
     * Render nút chọn Category ở Sidebar
     */
    renderSidebarItem(isActive = false) {
        const li = document.createElement('li');
        li.className = `category-item ${isActive ? 'active' : ''}`;
        li.innerHTML = `
            <button class="category-btn" data-id="${this.id}">
                <span class="category-name">${this.name}</span>
                <span class="badge">${this.procedures.length}</span>
            </button>
        `;

        // Sự kiện khi kích vào lĩnh vực
        li.querySelector('button').addEventListener('click', () => {
            app.selectCategory(this.id);
        });

        return li;
    }

    /**
     * Lọc thủ tục theo từ khóa
     */
    filterProcedures(keyword) {
        if (!keyword) return this.procedures;
        const lowerKeyword = keyword.toLowerCase();
        return this.procedures.filter(p => p.title.toLowerCase().includes(lowerKeyword));
    }
}

/**
 * Lớp Quản lý giao diện và trạng thái ứng dụng
 */
class AppUI {
    constructor(data) {
        // Khởi tạo dữ liệu
        this.categories = data.map(c => new Category(c.id, c.name, c.procedures));
        this.currentCategoryId = null;

        // Các thành phần DOM
        this.dom = {
            categoryList: document.getElementById('categoryList'),
            proceduresGrid: document.getElementById('proceduresGrid'),
            currentCategoryTitle: document.getElementById('currentCategoryTitle'),
            procedureCount: document.getElementById('procedureCount'),
            searchInput: document.getElementById('searchInput'),
            
            // Modal DOM
            modal: document.getElementById('pdfModal'),
            modalTitle: document.getElementById('pdfTitle'),
            pdfFrame: document.getElementById('pdfFrame'),
            closeModalBtn: document.getElementById('closeModalBtn'),
            pdfLoading: document.getElementById('pdfLoading'),
            
            // Mobile Sidebar DOM
            sidebar: document.getElementById('sidebar'),
            sidebarOverlay: document.getElementById('sidebarOverlay'),
            menuToggle: document.getElementById('menuToggle'),
            closeSidebarBtn: document.getElementById('closeSidebarBtn')
        };

        this.init();
    }

    /**
     * Khởi tạo ứng dụng
     */
    init() {
        this.renderSidebar();
        this.setupEventListeners();
        
        // Chọn lĩnh vực đầu tiên mặc định (nếu có)
        if (this.categories.length > 0) {
            this.selectCategory(this.categories[0].id);
        }
    }

    /**
     * Thiết lập các sự kiện chung
     */
    setupEventListeners() {
        // Tìm kiếm
        this.dom.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Toggle Sidebar on Mobile
        this.dom.menuToggle.addEventListener('click', () => {
            this.openSidebar();
        });

        this.dom.closeSidebarBtn.addEventListener('click', () => {
            this.closeSidebar();
        });

        this.dom.sidebarOverlay.addEventListener('click', () => {
            this.closeSidebar();
        });

        // Đóng modal
        this.dom.closeModalBtn.addEventListener('click', () => {
            this.closePdfViewer();
        });

        // Đóng modal khi click ra ngoài
        this.dom.modal.addEventListener('click', (e) => {
            if (e.target === this.dom.modal) {
                this.closePdfViewer();
            }
        });

        // Xử lý loading iframe
        this.dom.pdfFrame.addEventListener('load', () => {
            this.dom.pdfLoading.style.display = 'none';
            this.dom.pdfFrame.classList.add('loaded');
        });
    }

    /**
     * Render danh sách lĩnh vực ở Sidebar
     */
    renderSidebar() {
        this.dom.categoryList.innerHTML = '';
        this.categories.forEach(cat => {
            const isActive = cat.id === this.currentCategoryId;
            this.dom.categoryList.appendChild(cat.renderSidebarItem(isActive));
        });
    }

    /**
     * Xử lý chọn một lĩnh vực
     */
    selectCategory(categoryId) {
        this.currentCategoryId = categoryId;
        this.renderSidebar(); // Cập nhật lại UI Sidebar (để active item)
        this.dom.searchInput.value = ''; // Reset tìm kiếm
        
        const category = this.getCategoryById(categoryId);
        this.renderProcedures(category);
        
        // Đóng sidebar trên mobile sau khi chọn
        this.closeSidebar();
    }

    /**
     * Xử lý tìm kiếm
     */
    handleSearch(keyword) {
        if (!this.currentCategoryId) return;
        
        const category = this.getCategoryById(this.currentCategoryId);
        const filteredProcedures = category.filterProcedures(keyword);
        
        this.renderProcedures(category, filteredProcedures, keyword !== '');
    }

    /**
     * Render danh sách thủ tục ra màn hình chính
     */
    renderProcedures(category, proceduresToRender = null, isSearch = false) {
        this.dom.proceduresGrid.innerHTML = '';
        
        // Cập nhật tiêu đề
        this.dom.currentCategoryTitle.textContent = category.name;
        
        const procs = proceduresToRender || category.procedures;
        
        if (isSearch) {
            this.dom.procedureCount.textContent = `Tìm thấy ${procs.length} thủ tục phù hợp`;
        } else {
            this.dom.procedureCount.textContent = `Tổng số: ${procs.length} thủ tục`;
        }

        // Render Empty State nếu không có thủ tục
        if (procs.length === 0) {
            this.dom.proceduresGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>Không tìm thấy thủ tục nào trong lĩnh vực này phù hợp với yêu cầu của bạn.</p>
                </div>
            `;
            return;
        }

        // Render các thủ tục với độ trễ animation nhỏ
        procs.forEach((proc, index) => {
            const card = proc.render();
            card.style.animationDelay = `${index * 0.05}s`;
            this.dom.proceduresGrid.appendChild(card);
        });
    }

    /**
     * Lấy object Category theo ID
     */
    getCategoryById(id) {
        return this.categories.find(c => c.id === id);
    }

    /**
     * Mở Trình xem PDF
     */
    openPdfViewer(title, url) {
        this.dom.modalTitle.textContent = title;
        this.dom.pdfLoading.style.display = 'flex';
        this.dom.pdfFrame.classList.remove('loaded');
        this.dom.pdfFrame.src = url;
        
        // Hiển thị modal
        this.dom.modal.classList.remove('hidden');
        // Thêm setTimeout nhỏ để CSS transition hoạt động tốt
        setTimeout(() => {
            this.dom.modal.classList.add('active');
        }, 10);
    }

    /**
     * Đóng Trình xem PDF
     */
    closePdfViewer() {
        this.dom.modal.classList.remove('active');
        // Chờ animation kết thúc rồi mới hidden
        setTimeout(() => {
            this.dom.modal.classList.add('hidden');
            this.dom.pdfFrame.src = ''; // Clear iframe để ngừng tải
        }, 300);
    }

    /**
     * Mở Sidebar (Mobile)
     */
    openSidebar() {
        this.dom.sidebar.classList.add('open');
        this.dom.sidebarOverlay.classList.add('active');
    }

    /**
     * Đóng Sidebar (Mobile)
     */
    closeSidebar() {
        this.dom.sidebar.classList.remove('open');
        this.dom.sidebarOverlay.classList.remove('active');
    }
}

// Khởi tạo ứng dụng khi DOM đã sẵn sàng
let app;
document.addEventListener('DOMContentLoaded', () => {
    // mockDriveData được định nghĩa trong file data.js
    if (typeof mockDriveData !== 'undefined') {
        app = new AppUI(mockDriveData);
    } else {
        console.error('Không tìm thấy dữ liệu mockDriveData');
    }
});
