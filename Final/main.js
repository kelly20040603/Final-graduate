const TOPIC_DISPLAY = {
    ALL: "全部討論",
    FUTURES: "期貨交易",
    OPTIONS: "選擇權策略",
    TA: "技術分析",
    MARKET: "市場動態",
  };
  
  const topicListEl = document.getElementById("topicList");
  const discussionListEl = document.getElementById("discussionList");
  const newPostForm = document.getElementById("newPostForm");
  const titleInput = document.getElementById("titleInput");
  const topicSelect = document.getElementById("topicSelect");
  const contentInput = document.getElementById("contentInput");
  
  let currentTopic = "ALL";
  
  function timeAgo(ts) {
    const diff = (Date.now() - new Date(ts).getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)} 秒前`;
    if (diff < 3600) return `${Math.floor(diff/60)} 分鐘前`;
    if (diff < 86400) return `${Math.floor(diff/3600)} 小時前`;
    return `${Math.floor(diff/86400)} 天前`;
  }
  
  async function loadTopics() {
    const res = await fetch("/api/topics");
    const data = await res.json(); // {TOPIC: count, ...}
    topicListEl.innerHTML = "";
  
    Object.entries({
      ALL: data.ALL ?? 0,
      FUTURES: data.FUTURES ?? 0,
      OPTIONS: data.OPTIONS ?? 0,
      TA: data.TA ?? 0,
      MARKET: data.MARKET ?? 0,
    }).forEach(([key, count]) => {
      const btn = document.createElement("button");
      btn.className =
        "w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border-2 " +
        (currentTopic === key ? "border-blue-500" : "border-transparent");
      btn.innerHTML = `
        <span class="font-medium text-gray-900">${TOPIC_DISPLAY[key]}</span>
        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">${count}</span>
      `;
      btn.onclick = () => {
        currentTopic = key;
        loadTopics();
        loadDiscussions();
      };
      topicListEl.appendChild(btn);
    });
  }
  
  async function loadDiscussions() {
    const res = await fetch(`/api/discussions?topic=${currentTopic}`);
    const items = await res.json();
    discussionListEl.innerHTML = "";
  
    items.forEach(d => {
      const wrapper = document.createElement("div");
      wrapper.className = "bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow";
      const hotBadge = d.likes >= 20 ? `<span class="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">熱門</span>` : "";
      wrapper.innerHTML = `
        <div class="flex items-start space-x-4">
          <img src="${d.avatarUrl}" alt="${d.author}" class="w-12 h-12 rounded-full object-cover" />
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">${d.title}</h3>
              ${hotBadge}
            </div>
            <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div class="flex items-center space-x-1">
                <span class="h-4 w-4">👤</span>
                <span>${d.author}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="h-4 w-4">⏰</span>
                <span>${timeAgo(d.createdAt)}</span>
              </div>
              <span class="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">${TOPIC_DISPLAY[d.topic]}</span>
            </div>
            <p class="text-gray-700 mb-4">${d.content}</p>
            <div class="flex items-center space-x-6">
              <button data-id="${d.id}" class="likeBtn flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <span class="h-4 w-4">👍</span>
                <span>${d.likes}</span>
              </button>
              <button class="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                <span class="h-4 w-4">💬</span>
                <span>回覆（示範用）</span>
              </button>
            </div>
          </div>
        </div>
      `;
      discussionListEl.appendChild(wrapper);
    });
  
    document.querySelectorAll(".likeBtn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const res = await fetch(`/api/discussions/${id}/like`, { method: "POST" });
        if (res.ok) {
          loadDiscussions();
          loadTopics(); // 讚數影響熱門徽章，順便刷新主題數量
        }
      });
    });
  }
  
  newPostForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    const topic = topicSelect.value;
  
    if(!title || !content){
      alert("標題與內容不可為空");
      return;
    }
  
    const res = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        topic,
        author: "匿名交易者"
      })
    });
    if(res.ok){
      titleInput.value = "";
      contentInput.value = "";
      currentTopic = "ALL";
      await loadTopics();
      await loadDiscussions();
    }else{
      const err = await res.json().catch(()=>({error:"發生錯誤"}));
      alert(err.error || "發生錯誤");
    }
  });
  
  (async function init(){
    await loadTopics();
    await loadDiscussions();
  })();
  