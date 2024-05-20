<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap">
    <div class="totalBlock">
        <div class="header">
            <button class="switchButton" style="margin-left: 20px;" @click="$emit('changePage', 'systemConfig')">用户管理</button>
            <button class="switchButton" style="margin-left: 70px;" @click="$emit('changePage', 'systemConfig')">系统设置</button>
        </div>
        <div class="setDiv">
            <div style="margin-top: 20px; width: 100%; display: flex; flex-direction: column;">
                <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                    模型类型</p>
                <select v-model="modelType" id="modelType" style="margin-left: 40px;">
                    <option value="GPT-4">GPT-4</option>
                    <option value="ChatGLM-4">ChatGLM-4</option>
                </select>
            </div>

            <div style="margin-top: 20px; width: 100%; display: flex; flex-direction: column;">
              <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                Temperature</p>
              <div class="temperature-control">
                <input class="temperature-slider" type="range" min="0" max="1" step="0.01" v-model="temperature">
                <span class="temperature-value font-style">{{ temperature }}</span>
              </div>
            </div>

            <div style="margin-top: 15px; width: 100%; display: flex; flex-direction: column;">
              <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                Top p</p>
              <div class="temperature-control">
                <input class="temperature-slider" type="range" min="0" max="1" step="0.01" v-model="topp">
                <span class="temperature-value font-style">{{ topp }}</span>
              </div>
            </div>

            <div style="margin-top: 15px; width: 100%; display: flex; flex-direction: column;">
              <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                Max tokens</p>
              <div class="temperature-control">
                <input class="temperature-slider" type="range" min="1024" max="8192" step="1" v-model="tokens">
                <span class="temperature-value font-style">{{ tokens }}</span>
              </div>
            </div>

        </div>
    </div>
</template>
  
  <script>
  export default {
    name: 'UserManagement',
    data() {
      return {
        temperature: 0.5,
        topp: 0.5,
        tokens: 4096
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

.setDiv{
    top: 111px; 
    border-radius: 10px; 
    border: 1px solid var(--color-light-grey-3, #DFE1E6); 
    width: 544px; 
    height: 536px; 
    display: flex; 
    flex-direction: column; 
    padding: 30px; 
    background-color: linear-gradient(0deg, var(--color-lightest-grey, rgba(250, 251, 252, 0.82)) 0%, var(--color-lightest-grey, rgba(250, 251, 252, 0.82)) 100%), var(--color-white, #FFF); 
    margin: 0 auto;
}
.font-style {
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.72px;
}
.temperature-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;

  .temperature-slider {
      width: 60%;
      height: 8px;
      -webkit-appearance: none;
      appearance: none;
      background: #ddd;
      outline: none;
      border-radius: 4px;
      margin: 0 30px;
      margin-right: 30px;
  }

  .temperature-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #0056b3;
      border: none;
      border-radius: 50%;
      cursor: pointer;
  }

  .temperature-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background-color: #0056b3;
      border: none;
      border-radius: 50%;
      cursor: pointer;
  }

  .temperature-value {
      min-width: 50px;
  }
}
/* 基本样式重置 */
select {
    width: 50%; /* 设置下拉框的宽度 */
    padding: 8px 12px; /* 内边距 */
    border: 2px solid #172B4D; /* 边框颜色 */
    border-radius: 5px; /* 边框圆角 */
    background-color: #fff; /* 背景色 */
    color: #172B4D; /* 字体颜色 */
    font-size: 16px; /* 字体大小 */
    cursor: pointer; /* 鼠标样式 */
    outline: none; /* 去除焦点时的轮廓线 */
}

select:hover {
    border-color: #0056b3; /* 悬停时边框颜色 */
}

select:focus {
    border-color: #004085; /* 聚焦时边框颜色 */
    box-shadow: 0 0 8px rgba(0, 64, 133, 0.6); /* 添加聚焦时的阴影效果 */
}
</style>