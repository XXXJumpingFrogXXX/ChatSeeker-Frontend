<template>
    <div class="totalBlock">
        <div class="header">
            <button class="switchButton" style="margin-left: 20px;" @click="$emit('changePage', 'systemConfig')">用户管理</button>
            <button class="switchButton" style="margin-left: 70px;" @click="$emit('changePage', 'systemConfig')">系统设置</button>
        </div>
        <table class="UserTable">
            <thead style="width: 100%;">
                <tr>
                    <th style="width: 25%;">用户邮箱</th>
                    <th style="width: 25%;">用户状态</th>
                    <th style="width: 25%;">用户异常行为</th>
                    <th style="width: 25%;">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.email">
                    <td>{{ user.email }}</td>
                    <td>{{ user.status }}</td>
                    <td>{{ user.abnormal }}</td>
                    <td style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                        <button class="opButton" @click="banUser(user.email)">解禁</button>
                        <button class="opButton" @click="banUser(user.email)" style="margin-left: 50px;">封禁</button>
                    </td>
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
          { email: 'user1@test.com', status: '离线', abnormal: '无' },
          { email: 'user2@test.com', status: '在线', abnormal: '输入问题过长' },
          { email: 'user2@test.com', status: '封禁', abnormal: '输入敏感内容' },
          { email: 'user3@test.com', status: '在线', abnormal: '无' },
          { email: 'user4@test.com', status: '封禁', abnormal: '输入敏感内容' },
          { email: 'user5@test.com', status: '离线', abnormal: '无' },
          { email: 'user6@test.com', status: '离线', abnormal: '无' },
          { email: 'user7@test.com', status: '封禁', abnormal: '无' },
          { email: 'user8@test.com', status: '离线', abnormal: '无' },
          { email: 'user9@test.com', status: '离线', abnormal: '无' },
          { email: 'user10@test.com', status: '在线', abnormal: '无' },
          { email: 'user11@test.com', status: '离线', abnormal: '无' },
          { email: 'user12@test.com', status: '在线', abnormal: '无' },
          { email: 'user13@test.com', status: '离线', abnormal: '无' },
          { email: 'user14@test.com', status: '离线', abnormal: '无' },
          { email: 'user15@test.com', status: '在线', abnormal: '无' },
          { email: 'user16@test.com', status: '离线', abnormal: '无' },
          { email: 'user9@test.com', status: 'Inactive', abnormal: 'Spam' },
          { email: 'user10@test.com', status: 'Active', abnormal: 'None' },
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
.totalBlock{
    background-color: #F6F7F8;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.switchButton{
    border-radius: 5px;
    text-transform: none; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    font-family: Inter; 
    font-size: 18px; 
    font-weight: 700; 
    height: 48px; 
    line-height: 28px; 
    letter-spacing: 0.72px; 
    width: 180px;
    background: #0052CC; 
    border: none; 
    color: white;
    cursor: pointer;
}

.opButton{
    border-radius: 5px;
    text-transform: none; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    gap: 10px; 
    font-family: Inter; 
    font-size: 16px; 
    font-weight: 500; 
    height: 28px; 
    line-height: 28px; 
    letter-spacing: 0.72px; 
    width: 90px;
    background: #0052CC; 
    border: none; 
    color: white;
    cursor: pointer;
}

.header {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 50px;
    margin-top: 20px;
}

.UserTable{
    width: 95%;
    border-collapse: collapse;
    margin-left: 50px;
}

td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    background-color: #0052CC;
    color: white;
}
</style>