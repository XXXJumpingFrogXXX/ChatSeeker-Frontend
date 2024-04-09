<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap">
    <div class="totalBlock">
        <div style="width: 100%; display: flex; flex-direction: column;">
            <div class="topBar">
                <p style="margin-top: 20px; color: var(--cpii-tool-store-dark-grey-4, #172B4D);" class="font-style">Chat Seeker</p>
                <div style="display: flex; justify-content: flex-end; align-items: center; flex-shrink: 0;">
                    <img :src="NKULogo" alt="NKU Logo"
                    style="width: 55px; height: 55px; background: transparent">
                </div>
            </div>

            <div class="chatWindow">
                <div class="message" v-for="(message, index) in messages" :key="index" :class="{'user-message': message.isUser, 'bot-message': !message.isUser}">
                    <div class="message-content">{{ message.text }}</div>
                </div>
            </div>

            <div class="inputArea">
            <!-- <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type a message..." />
            <button @click="sendMessage">Send</button> -->
                <img :src="CleanIcon" alt="Clean Logo" class="clean-icon" @click="scrollToRecord">
                <div class="input-send">
                    <textarea v-model="userInput" class="input" :placeholder="placeholder"
                    @keydown.enter.prevent="userQuestioning()"></textarea>
                    <img :src="SendIcon" alt="Send Logo" class="sendBtn" @click="sendMessage()">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import NKULogo from "@/assets/img/NKU_Logo.png";
import CleanIcon from "@/assets/img/clean_icon.svg";
import SendIcon from "@/assets/img/send_icon.svg";
  
  
export default {
    name: "ChatSeeker",
  
    data: () => {
      return {
        NKULogo,
        CleanIcon,
        SendIcon,
        placeholder: 'Type a message...',
      }
    },

    setup() {
      const userInput = ref('');
      const messages = ref([]);
  
      const sendMessage = () => {
        if (userInput.value.trim() !== '') {
          // Add user message
          messages.value.push({ text: userInput.value, isUser: true });
          
          // Simulate bot response
          setTimeout(() => {
            messages.value.push({ text: 'Yes!', isUser: false });
          }, 500);
  
          // Reset input field
          userInput.value = '';
        }
      };
  
      return { userInput, messages, sendMessage };
    },
};
</script>
  
<style>
.totalBlock{
    background: #F6F7F8;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
}

.topBar {
    display: flex;
    height: 68px;
    padding: 0px 40px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-shrink: 0;
    border-bottom: 1px solid var(--cpii-tool-store-grey-4, #DFE1E6);
    background: var(--cpii-tool-store-grey-1, #FAFBFD);
}

.chatWindow {
    box-sizing: border-box; /* 确保内边距不会增加总宽度 */
    flex-grow: 1;
    overflow-y: auto; /* 只保留这个滚动属性 */
    padding: 24px 40px 0px 40px;
    background: var(--cpii-tool-store-grey-1, #FAFBFD);
    border: 1px solid #ddd;
    margin-bottom: 10px;
    width: 100%; /* 宽度包括内边距和边框 */
    height: 80%;
    scrollbar-color: transparent transparent;
    margin-bottom: 10px;

    .message {
        max-width: 50%;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 20px;
    }
  
    .user-message {
        margin-left: auto;
        width: 50px;
        background-color: #dcf8c6;
    }
    
    .bot-message {
        background-color: #ffffff;
        width: 100px;
    }
    
    .message-content {
        word-wrap: break-word;
    }
  }

.inputArea{
    box-sizing: border-box; /* 确保内边距不会增加总宽度 */
    display: flex;
    width: 100%;
    height: 100px;
    padding: 24px 30px;
    align-items: center;
    gap: 20px;
    border-top: 1px solid var(--cpii-tool-store-grey-4, #DFE1E6);
    background: var(--cpii-tool-store-grey-2, #F6F7F8);
  
    .input-send {
      display: flex;
      padding: 15px 20px;
      align-items: center;
      gap: 10px;
      flex: 1 0 0;
      border-radius: 15px;
      border: 1px solid var(--cpii-tool-store-grey-4, #DFE1E6);
      background: var(--cpii-tool-store-grey-1, #FAFBFD);
  
      .input {
        border: none;
        background: transparent;
        flex: 1 0 0;
        resize: none;
        height: 48px;
        color: #000;
  
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.32px;
      }
  
      .input:focus {
        outline: none;
      }
  
      .sendBtn {
        cursor: pointer;
        width: 34px;
        height: 28px;
      }
    }
}




.font-style {
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0.72px;
}
</style>