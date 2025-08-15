<%@ page import="java.sql.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
    <title>討論區</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 p-6">

<%
    String url = "jdbc:postgresql://localhost:5432/yourdb";
    String user = "youruser";
    String password = "yourpassword";

    Class.forName("org.postgresql.Driver");
    Connection conn = DriverManager.getConnection(url, user, password);

    // 主題
    Statement stmtTopics = conn.createStatement();
    ResultSet rsTopics = stmtTopics.executeQuery("SELECT t.id, t.name, COUNT(d.id) as count FROM topics t LEFT JOIN discussions d ON t.name = d.category GROUP BY t.id, t.name ORDER BY t.id");

    // 討論
    Statement stmtDiscussions = conn.createStatement();
    ResultSet rsDiscussions = stmtDiscussions.executeQuery("SELECT d.*, u.name as author_name, u.avatar FROM discussions d JOIN \"User\" u ON d.author_id = u.id ORDER BY d.created_at DESC");
%>

<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- 主題區 -->
    <div class="md:col-span-1 bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-bold mb-4">主題</h2>
        <ul>
        <%
            while (rsTopics.next()) {
        %>
            <li class="flex justify-between py-2 border-b">
                <span><%= rsTopics.getString("name") %></span>
                <span class="text-gray-500"><%= rsTopics.getInt("count") %></span>
            </li>
        <%
            }
        %>
        </ul>
    </div>

    <!-- 討論區 -->
    <div class="md:col-span-3">
        <h2 class="text-lg font-bold mb-4">討論</h2>
        <div class="space-y-4">
        <%
            while (rsDiscussions.next()) {
        %>
            <div class="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
                <img src="<%= rsDiscussions.getString("avatar") %>" alt="avatar" class="w-12 h-12 rounded-full">
                <div class="flex-1">
                    <h3 class="font-semibold"><%= rsDiscussions.getString("title") %></h3>
                    <p class="text-gray-600 text-sm"><%= rsDiscussions.getString("author_name") %> ‧ <%= rsDiscussions.getTimestamp("created_at") %></p>
                    <p class="mt-2 text-gray-800"><%= rsDiscussions.getString("content") %></p>
                </div>
                <div class="text-right text-sm text-gray-500">
                    💬 <%= rsDiscussions.getInt("replies") %> ‧ 👍 <%= rsDiscussions.getInt("likes") %>
                </div>
            </div>
        <%
            }
            rsTopics.close();
            rsDiscussions.close();
            stmtTopics.close();
            stmtDiscussions.close();
            conn.close();
        %>
        </div>
    </div>
</div>

</body>
</html>
