<%@ page contentType="text/html; charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>社群聊天-AI智能期權交易助手</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .hover\:shadow-xl:hover { box-shadow: 0px 8px 16px rgba(0,0,0,.1); }
  </style>
</head>
<body class="bg-gray-100">

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">社群聊天</h1>
      <p class="text-gray-600">與其他交易者分享經驗和討論市場動態</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <!-- Topics Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">討論主題</h2>
          <div id="topicList" class="space-y-2">
            <!-- 動態填入 -->
          </div>

          <div class="mt-8 p-4 bg-blue-50 rounded-lg">
            <div class="flex items-center space-x-2 mb-2">
              <span class="h-5 w-5 text-blue-600">👥</span>
              <span class="font-medium text-blue-900">在線用戶</span>
            </div>
            <p class="text-2xl font-bold text-blue-600"><c:out value="${onlineUsers}" /></p>
            <p class="text-sm text-blue-700">位交易者正在討論</p>
          </div>
        </div>
      </div>

      <!-- Discussion Content -->
      <div class="lg:col-span-3">
        <!-- New Post -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div class="flex items-center space-x-3 mb-4">
            <span class="h-5 w-5 text-blue-600">💬</span>
            <h3 class="text-lg font-semibold text-gray-900">發表新討論</h3>
          </div>
          <form id="newPostForm" class="space-y-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input id="titleInput" placeholder="標題（例如：台指期觀察）"
                     class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <select id="topicSelect"
                      class="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="FUTURES">期貨交易</option>
                <option value="OPTIONS">選擇權策略</option>
                <option value="TA">技術分析</option>
                <option value="MARKET">市場動態</option>
              </select>
            </div>
            <textarea id="contentInput"
              placeholder="分享您的市場觀點或交易心得..."
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"></textarea>
            <div class="flex justify-end">
              <button type="submit"
                class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <span class="h-4 w-4">✉️</span>
                <span>發送</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Discussions -->
        <div id="discussionList" class="space-y-4">
          <!-- 動態填入 -->
        </div>
      </div>
    </div>
  </div>

  <script src="/static/main.js"></script>
</body>
</html>
