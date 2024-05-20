<template>
  <div></div>
  <div class="user-management">
    <button @click="$emit('changePage', 'systemConfig')">切换到系统配置</button>
    <table>
      <thead>
        <tr>
          <th>用户邮箱</th>
          <th>用户状态</th>
          <th>用户异常行为</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.email">
          <td>{{ user.email }}</td>
          <td>{{ user.status }}</td>
          <td>{{ user.abnormal }}</td>
          <td><button @click="banUser(user.email)">封禁</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [
        { email: 'user1@example.com', status: 'Active', abnormal: 'None' },
        { email: 'user2@example.com', status: 'Inactive', abnormal: 'Spam' },
        // 添加更多用户数据
      ]
    };
  },
  methods: {
    banUser(email) {
      alert(`封禁用户：${email}`);
      // 在这里添加封禁逻辑
    }
  }
}
</script>

<style scoped>
.user-management {
  background-color: #F6F7F8;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>