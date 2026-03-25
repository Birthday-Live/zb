document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('softwareGrid');
    const searchInput = document.getElementById('searchInput');

    // 渲染所有卡片
    function renderCards(data) {
        grid.innerHTML = '';
        
        data.forEach(item => {
            const card = document.createElement('a');
            card.href = item.link;
            card.target = "_blank";
            card.className = "card";
            
            card.innerHTML = `
                <img src="${item.logo}" alt="${item.name}">
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.desc || '正版软件官方渠道'}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase().trim();
        
        const filtered = softwareData.filter(item => 
            item.name.toLowerCase().includes(keyword) ||
            (item.desc && item.desc.toLowerCase().includes(keyword))
        );
        
        renderCards(filtered);
    });

    // 初始渲染
    renderCards(softwareData);
});