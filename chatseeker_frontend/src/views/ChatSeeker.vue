<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap">
  <div class="totalBlock">
      <div style="width: 100%; display: flex; flex-direction: row;">
          <div class="leftPart">
            <div class="topBar">
                <p style="margin-top: 20px; color: var(--cpii-tool-store-dark-grey-4, #172B4D);" class="font-style">Chat Seeker</p>
                <div style="display: flex; justify-content: flex-end; align-items: center; flex-shrink: 0;">
                    <img :src="NKULogo" alt="NKU Logo"
                    style="width: 55px; height: 55px; background: transparent">
                </div>
            </div>

            <div class="chatWindow">
                <div class="message s-font-style" v-for="(message, index) in this.messages" :key="index" :class="{'user-message': message.isUser, 'bot-message': !message.isUser}">
                  <div class="message-content">{{ message.text }}</div>
                  <div v-if="message.ref_list && message.ref_list.length > 0">
                    <div v-for="(ref_content, refIndex) in message.ref_list" :key="refIndex" style="display: flex; flex-direction: row;">
                      <img :src="LinkIcon" alt="Link Icon" 
                      style="width: 30px; height: 30px; margin-top: 14px; margin-right: 5px; background: transparent">
                      <p class="s-font-style" style="width: 85px; margin-right: 5px;">参考内容{{ refIndex + 1 }}: </p>
                      <a :href="ref_content.link" target="_blank" rel="noopener noreferrer" style="word-wrap: break-word; overflow-wrap: break-word;  margin-top: 16px; ">{{ ref_content.title }}</a>
                    </div>
                  </div>
                  <img :src="PlayIcon" alt="Play Icon"
                      style="width: 40px; height: 40px; margin-top: 15px; background: transparent" v-if="!message.isUser" @click="textToSpeech(message.text)">
                </div>
                <audio style="width: 0; height: 0;" id="audioPlayer" controls></audio>
                <div v-if="this.isGenerating" class="message s-font-style bot-message">
                  <div class="message-content">正在思考...</div>
                </div>
                <div v-if="this.isStreamingGenerated" class="message s-font-style bot-message">
                  <div class="message-content">{{ this.streamingReply }}</div>
                </div>
            </div>

            <div class="inputArea">
                <img :src="CleanIcon" alt="Clean Logo" class="clean-icon" @click="scrollToRecord">
                <div class="input-send">
                    <textarea v-model="this.query" class="input" :placeholder="placeholder"
                    @keydown.enter.prevent="generate()"></textarea>
                    <img :src="SendIcon" alt="Send Logo" class="sendBtn" @click="generate()">
                </div>
            </div>
          </div>

          <div class="rightPart">
            <p class="noto-serif-sc-regular" style="font-size: 28px; margin-left: 20px; margin-top: 15px;">聊天机器人设置</p>

            <div style="width: 50%; display: flex; flex-direction: row; align-items: center;">
              <img :src="InfoIcon" alt="Info Icon" style="margin-left: 30px; width: 15px; height: 15px; margin-top: 0.5px;" @click="scrollToRecord" class="info-icon" title="多轮对话是机器人根据上下文内容，进行连续的人机对话。">
              <p class="noto-serif-sc-regular" style="font-size: 16px; margin-right: 0; margin-left: 5px;">多轮对话</p>
              <div class="toggle-switch" :class="{ 'active': this.isMulti }" @click="toggleMulti" style="margin-left: 10px; margin-top: 5px;">
                <div class="toggle-circle"></div>
              </div>
            </div>

            <div style="margin-top: 50px; width: 50%; display: flex; flex-direction: row; align-items: center;">
              <img :src="InfoIcon" alt="Info Icon" style="margin-left: 30px; width: 15px; height: 15px; margin-top: 0.5px;" @click="scrollToRecord">
              <p class="noto-serif-sc-regular" style="font-size: 16px; margin-left: 5px; margin-right: 0;">流式输出</p>
              <div class="toggle-switch" :class="{ 'active': this.isStreaming }" @click="toggleStreaming" style="margin-left: 10px; margin-top: 5px;">
                <div class="toggle-circle"></div>
              </div>
            </div>
            
            <div style="margin-top: 50px; width: 100%; display: flex; flex-direction: row; align-items: center;">
              <img :src="InfoIcon" alt="Info Icon" style="margin-left: 30px; width: 15px; height: 15px; margin-top: 0.5px;" @click="scrollToRecord">
              <p class="noto-serif-sc-regular" style="font-size: 16px; margin-left: 5px; margin-right: 0;">实时搜索</p>
              <div class="toggle-switch" :class="{ 'active': this.isRealTime }" @click="toggleRealTime" style="margin-left: 10px; margin-top: 5px;">
                <div class="toggle-circle"></div>
              </div>
            </div>

            <div v-if="this.isRealTime" style="margin-top: 30px; width: 100%; display: flex; flex-direction: column;">
              <p class="noto-serif-sc-regular" style="font-size: 16px; margin-left: 40px; margin-right: 0;">实时搜索权重分配</p>

              <div class="searchEngineBox">
                <div style="display: flex; flex-direction: row;">
                  <img :src="GoogleLogo" alt="Google Logo"
                    style="width: 25px; height: 25px; margin-top: 2px; background: transparent">
                  <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-left: 10px; margin-top: 0px; width: 80px;" class="font-style">Google</p>
                  <div class="search-control" style="margin-top: -15px;">
                    <input class="search-slider" type="range" min="0" max="1" step="0.01" v-model.number="googlePower">
                    <input class="search-value s-font-style" v-model.number="googlePower">
                  </div>
                </div>
              </div>

              <div class="searchEngineBox">
                <div style="display: flex; flex-direction: row;">
                  <img :src="BingLogo" alt="Bing Logo"
                    style="width: 25px; height: 25px; margin-top: 2px; background: transparent">
                  <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-left: 10px; margin-top: 0px; width: 80px;" class="font-style">Bing</p>
                  <div class="search-control" style="margin-top: -15px;">
                    <input class="search-slider" type="range" min="0" max="1" step="0.01" v-model.number="bingPower">
                    <input class="search-value s-font-style" v-model.number="bingPower">
                  </div>
                </div>
              </div>

              <div class="searchEngineBox">
                <div style="display: flex; flex-direction: row;">
                  <img :src="BaiduLogo" alt="Baidu Logo"
                    style="width: 25px; height: 25px; margin-top: 2px; background: transparent">
                  <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-left: 10px; margin-top: 0px; width: 80px;" class="font-style">Baidu</p>
                  <div class="search-control" style="margin-top: -15px;">
                    <input class="search-slider" type="range" min="0" max="1" step="0.01" v-model.number="baiduPower">
                    <input class="search-value s-font-style" v-model.number="baiduPower">
                  </div>
                </div>
              </div>

              <div class="searchEngineBox">
                <div style="display: flex; flex-direction: row;">
                  <img :src="YahooLogo" alt="Yahoo Logo"
                    style="width: 25px; height: 25px; margin-top: 2px; background: transparent">
                  <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-left: 10px; margin-top: 0px; width: 80px;" class="font-style">Yahoo</p>
                  <div class="search-control" style="margin-top: -15px;">
                    <input class="search-slider" type="range" min="0" max="1" step="0.01" v-model.number="yahooPower">
                    <input class="search-value s-font-style" v-model.number="yahooPower">
                  </div>
                </div>
              </div>

              <div class="searchEngineBox">
                <div style="display: flex; flex-direction: row;">
                  <img :src="DuckDuckGoLogo" alt="DuckDuckGo Logo"
                    style="width: 25px; height: 25px; margin-top: 2px; background: transparent">
                  <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-left: 10px; margin-top: 0px; width: 80px;" class="font-style">DDG</p>
                  <div class="search-control" style="margin-top: -15px;">
                    <input class="search-slider" type="range" min="0" max="1" step="0.01" v-model.number="ddgPower">
                    <input class="search-value s-font-style" v-model.number="ddgPower">
                  </div>
                </div>
              </div>
            </div>

            <!-- <div style="margin-top: 20px; width: 100%; display: flex; flex-direction: column;">
              <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                Temperature</p>
              <div class="temperature-control">
                <input class="temperature-slider" type="range" min="0" max="1" step="0.01" v-model="temperature">
                <span class="temperature-value font-style">{{ temperature }}</span>
              </div>
            </div>

            <div style="margin-top: 15px; width: 100%; display: flex; flex-direction: column;">
              <p style="color: var(--cpii-tool-store-dark-grey-4, #172B4D); margin-bottom: 8px; margin-left: 40px;" class="font-style">
                Top_p</p>
              <div class="temperature-control">
                <input class="temperature-slider" type="range" min="0" max="1" step="0.01" v-model="topp">
                <span class="temperature-value font-style">{{ topp }}</span>
              </div>
            </div> -->
          </div>
      </div>
  </div>
</template>

<script>
// import { ref } from 'vue';
import { request } from "../js/requestConfig";
import NKULogo from "@/assets/img/NKU_Logo.png";
import LinkIcon from "@/assets/img/link_icon.png";
import PlayIcon from "@/assets/img/play_icon.png";
import CleanIcon from "@/assets/img/clean_icon.svg";
import SendIcon from "@/assets/img/send_icon.svg";
import InfoIcon from "@/assets/img/info.png";
import GoogleLogo from "@/assets/img/Google_Logo.png";
import BingLogo from "@/assets/img/Bing_Logo.png";
import BaiduLogo from "@/assets/img/Baidu_Logo.png";
import YahooLogo from "@/assets/img/Yahoo_Logo.png";
import DuckDuckGoLogo from "@/assets/img/DuckDuckGo_Logo.png";

export default {
  name: "ChatSeeker",

  data: () => {
    return {
      NKULogo,
      LinkIcon,
      PlayIcon,
      CleanIcon,
      SendIcon,
      InfoIcon,
      GoogleLogo,
      BingLogo,
      BaiduLogo,
      YahooLogo,
      DuckDuckGoLogo,
      messages: [],
      placeholder: 'Type a message...',
      isRealTime: false,
      isStreaming: false,
      isStreamingGenerated: false,
      isMulti: false,
      isGenerating: false,
      isSoundPlaying: false,
      query: '',
      streamingReply: '',
      temperature: 0.5,
      topp: 0.5,
      googlePower: 0,
      bingPower: 0,
      baiduPower: 0,
      yahooPower: 0,
      ddgPower: 0,
    }
  },

  methods: {
    toggleMulti() {
      this.isMulti = !this.isMulti;
      this.$emit('change', this.isMulti);
    },
    toggleStreaming() {
      this.isStreaming = !this.isStreaming;
      this.$emit('change', this.isStreaming);
    },
    toggleRealTime() {
      this.isRealTime = !this.isRealTime;
      this.$emit('change', this.isRealTime);
    },

    async textToSpeech(text){
      if(!this.isSoundPlaying){
        this.isSoundPlaying = false;
        const response = await fetch(`http://127.0.0.1/chat-seeker-backend/audio_gen/text_to_speech`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ reply: text })
        });

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = audioUrl;
            audioPlayer.play();
            this.isSoundPlaying = true;
            audioPlayer.onended = () => {
                this.isSoundPlaying = false;
            };
        } else {
            console.error('请求语音转换失败');
        }
      } else {
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.pause();
        this.isSoundPlaying = false;
      }
    },
    async generate(){
      if(this.isRealTime){
        const total = this.googlePower + this.bingPower + this.baiduPower + this.yahooPower + this.ddgPower;
        if (total !== 1) {
            alert("请你仔细阅读使用事项，各搜索引擎权重总和必须为1！");
            return;
        }
        const zeros = [this.googlePower, this.bingPower, this.baiduPower, this.yahooPower, this.ddgPower].filter(weight => weight === 0).length;
        if (zeros < 2) {
            alert("请你仔细阅读使用事项，一次最多只能使用三个搜索引擎，请至少设置两个权重参数为0!");
        }
      }

      this.messages.push({ text: this.query, isUser: true });
      const temporaryQuery = this.query;
      this.query = "";

      if(!this.isRealTime && !this.isStreaming){
        this.isGenerating = true;
        await request('post', '/text_gen/generate_not_real_time_answer', {}, {
          query: temporaryQuery
        }).then(async (res) => {
          if (res.data.success) {
            this.isGenerating = false;
            this.messages.push({ text: res.data.response.result, ref_list: [], isUser: false });
            return;
          } else {
            return;
          }
        })
      }

      else if(!this.isRealTime && this.isStreaming){
        this.isStreamingGenerated = true;
        await fetch(`http://127.0.0.1/chat-seeker-backend/text_gen/generate_not_real_time_answer_streaming?query=${temporaryQuery}`).then(response => {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          const that = this;
          that.query = "";
          function processChunk({ done, value }) {
            if (done) {
              that.messages.push({ text: that.streamingReply, isUser: false });
              that.streamingReply = "";
              that.isStreamingGenerated = false;
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            that.streamingReply += chunk;
            reader.read().then(processChunk);
          }
          reader.read().then(processChunk);
        })
      }

      else if(this.isRealTime && !this.isStreaming){
        this.isGenerating = true;
        await request('post', '/text_gen/generate_real_time_answer', {}, {
          query: temporaryQuery,
          google_power: this.googlePower,
          bing_power: this.bingPower,
          baidu_power: this.baiduPower,
          yahoo_power: this.yahooPower,
          ddg_power: this.ddgPower,
        }).then(async (res) => {
          if (res.data.success) {
            this.isGenerating = false;
            this.messages.push({ text: res.data.response.result, ref_list: res.data.response.reference_data, isUser: false });
            return;
          } else {
            return;
          }
        })
      }

    },
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

.leftPart{
width: 80%; 
display: flex; 
flex-direction: column;
}

.rightPart{
width: 20%; 
display: flex; 
flex-direction: column;
border-left: 1px solid #DFE1E6;
background: #F6F7F8;

.toggle-switch {
  display: flex;
  align-items: center;
  width: 60px; /* Width of the long bar */
  height: 25px; /* Height of the long bar */
  background-color: #ccc; /* Grey background */
  border-radius: 15px; /* Half of the height to make it round */
  cursor: pointer;
  transition: background-color 0.2s; /* Smooth transition for background color */
  position: relative;
}

.toggle-circle {
  width: 25px; /* Width of the circle */
  height: 25px; /* Height of the circle */
  background-color: white;
  border-radius: 50%; /* Fully round shape */
  transition: transform 0.2s; /* Smooth transition for moving the circle */
  position: absolute;
  left: 0; /* Start from the left side */
}

.toggle-switch.active {
  background-color: #4CAF50; /* Green background for active state */
}

.toggle-switch.active .toggle-circle {
  transform: translateX(35px); /* Move the circle to the right; (100px - 30px) */
}

.input {
  display: flex;
  width: 100%;
  padding: 10px 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 15px;
  background: var(--cpii-tool-store-grey-2, #F6F7F8) !important;
  border: #F6F7F8;
}

.input:focus {
  background: white !important;
}

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
    /* width: 400px; */
    max-width: 600px;
    width: fit-content;
    margin-bottom: 10px;
    border-radius: 15px;
    display: flex;
    gap: 10px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    flex-direction: column;
  }

  .user-message {
    margin-left: auto;
    background-color: var(--color-brand, #0052CC);
    padding: 10px 20px;
    color: var(--color-white, #FFF);
    align-self: flex-end;
  }
  
  .bot-message {
    background-color: var(--color-light-grey2, #EBECF0);;
    padding: 16px 20px;
    color: #172B4D;
    align-self: flex-start;
  }
  
  .message-content {
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word; /* Ensures breaking of long words and overflow */
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

.searchEngineBox{
display: flex;
flex-direction: column;
padding-left: 45px;
padding-top: 15px;
}

.search-control {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 8px;

  .search-slider {
      width: 30%;
      height: 8px;
      -webkit-appearance: none;
      appearance: none;
      background: #ddd;
      outline: none;
      border-radius: 4px;
      margin: 0 30px;
      margin-right: 30px;
  }

  .search-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #0056b3;
      border: none;
      border-radius: 50%;
      cursor: pointer;
  }

  .search-slider::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background-color: #0056b3;
      border: none;
      border-radius: 50%;
      cursor: pointer;
  }
}

.search-value {
  width: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  padding: 10px 20px;
  gap: 16px;
  border-radius: 15px;
  background: var(--cpii-tool-store-grey-2, #F6F7F8) !important;
  border: var(--cpii-tool-store-grey-2, #F6F7F8) !important;
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

.font-style {
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 28px;
letter-spacing: 0.72px;
}
.s-font-style {
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 24px;
letter-spacing: 0.32px;
}
.noto-serif-sc-regular {
font-family: "Noto Serif SC", serif;
font-weight: 400;
font-style: normal;
}
.ma-shan-zheng-regular {
font-family: "Ma Shan Zheng", cursive;
font-weight: 400;
font-style: normal;
}

.tooltip {
    transition: visibility 0.2s, opacity 0.2s linear;
    opacity: 0;
}

.info-icon:hover + .tooltip {
    visibility: visible;
}

</style>