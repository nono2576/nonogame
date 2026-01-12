// ========================================
// グローバル変数
// ========================================
let allPosts = [];
let currentFilter = 'all';

// ========================================
// 初期化
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadPosts();
    setupFilters();
});

// ========================================
// 投稿データの読み込み
// ========================================
async function loadPosts() {
    try {
        const response = await fetch('posts/posts.json');
        const data = await response.json();
        allPosts = data.posts;
        
        // 日付順にソート（新しい順）
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        renderPosts(allPosts);
        createTagFilters();
    } catch (error) {
        document.getElementById('posts-container').innerHTML = 
            '<div class="loading">記事の読み込みに失敗しました。posts/posts.json を確認してください。</div>';
        console.error('Error loading posts:', error);
    }
}

// ========================================
// 投稿の描画
// ========================================
function renderPosts(posts) {
    const container = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        container.innerHTML = '<div class="loading">記事がありません</div>';
        return;
    }
    
    container.innerHTML = posts.map(post => {
        const template = getTemplate(post);
        return `
            <article class="post template-${post.template}">
                <div class="post-header">
                    <div class="post-date">${formatDate(post.date)}</div>
                    <h2 class="post-title">${escapeHtml(post.title)}</h2>
                    ${post.tags ? `
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="post-body">
                    ${template}
                </div>
            </article>
        `;
    }).join('');
}

// ========================================
// テンプレートの取得
// ========================================
function getTemplate(post) {
    const content = post.content ? `<div class="post-content">${escapeHtml(post.content)}</div>` : '';
    
    switch (post.template) {
        case 'text-only':
            return content;
            
        case 'text-image':
            return `
                ${content}
                ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" class="post-image">` : ''}
            `;
            
        case 'text-images':
            return `
                ${content}
                ${post.images && post.images.length > 0 ? `
                    <div class="post-images">
                        ${post.images.map(img => `<img src="${img}" alt="${escapeHtml(post.title)}">`).join('')}
                    </div>
                ` : ''}
            `;
            
        case 'text-video':
            return `
                ${content}
                ${post.video ? `
                    <video controls class="post-video">
                        <source src="${post.video}" type="video/mp4">
                        お使いのブラウザは動画タグをサポートしていません。
                    </video>
                ` : ''}
            `;
            
        case 'image-diary':
            return `
                ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.title)}" class="post-image">` : ''}
                ${content}
            `;
            
        case 'screenshot-gallery':
            return `
                ${post.images && post.images.length > 0 ? `
                    <div class="post-images">
                        ${post.images.map(img => `<img src="${img}" alt="${escapeHtml(post.title)}">`).join('')}
                    </div>
                ` : ''}
                ${content}
            `;
            
        default:
            return content;
    }
}

// ========================================
// タグフィルターの作成
// ========================================
function createTagFilters() {
    const allTags = new Set();
    allPosts.forEach(post => {
        if (post.tags) {
            post.tags.forEach(tag => allTags.add(tag));
        }
    });
    
    const filterContainer = document.getElementById('tag-filters');
    filterContainer.innerHTML = Array.from(allTags).map(tag => 
        `<button class="filter-btn" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</button>`
    ).join('');
}

// ========================================
// フィルターのセットアップ
// ========================================
function setupFilters() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const tag = e.target.dataset.tag;
            
            // アクティブ状態の更新
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // フィルタリング
            currentFilter = tag;
            filterPosts(tag);
        }
    });
}

// ========================================
// 投稿のフィルタリング
// ========================================
function filterPosts(tag) {
    if (tag === 'all') {
        renderPosts(allPosts);
    } else {
        const filtered = allPosts.filter(post => 
            post.tags && post.tags.includes(tag)
        );
        renderPosts(filtered);
    }
}

// ========================================
// ユーティリティ関数
// ========================================
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    const weekday = weekdays[date.getDay()];
    
    return `${year}年${month}月${day}日（${weekday}）`;
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
