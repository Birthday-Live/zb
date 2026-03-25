document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('softwareGrid');
    const searchInput = document.getElementById('searchInput');

    async function loadData() {
        try {
            // 使用带时间戳的方式强制刷新缓存 + 兼容你的域名
            const response = await fetch(`data.json?t=${Date.now()}`);
            
            if (!response.ok) {
                throw new Error(`HTTP 错误: ${response.status}`);
            }
            
            const softwareData = await response.json();
            
            renderCards(softwareData);

            // 搜索功能
            searchInput.addEventListener('input', (e) => {
                const keyword = e.target.value.toLowerCase().trim();
                const filtered = softwareData.filter(item => 
                    item.name.toLowerCase().includes(keyword) ||
                    (item.desc && item.desc.toLowerCase().includes(keyword))
                );
                renderCards(filtered);
            });

        } catch (error) {
            console.error('加载失败：', error);
            grid.innerHTML = `
                <p style="grid-column: 1 / -1; text-align: center; color: #d32f2f; padding: 60px 20px; font-size: 1.1rem;">
                    ⚠️ 数据加载失败<br><br>
                    请按 F12 打开控制台，把红色错误信息复制给我<br><br>
                    错误：${error.message}
                </p>`;
        }
    }

    function renderCards(data) {
        grid.innerHTML = '';
        
        if (data.length === 0) {
            grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;padding:40px;color:#666;">没有找到匹配的软件</p>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.target = "_blank";
            card.className = "card";
            
            card.innerHTML = `
                <img src="${item.logo}" alt="${item.name}" 
                     onerror="this.src='https://via.placeholder.com/280x160/1e3a8a/ffffff?text=${encodeURIComponent(item.name)}'">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.desc || '正版软件官方渠道'}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 开始加载
    loadData();
});
    // 初始渲染
    renderCards(softwareData);
});
