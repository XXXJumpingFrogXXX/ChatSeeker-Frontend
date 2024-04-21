<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,700&display=swap">
  <div class='totalBlock'>
    <div class="topPanel" @click="this.$router.push('/');" style="position: absolute; top: 0px;">
      <div style="display: flex; flex-direction: row; justify-content: flex-start; margin-left: 20px; margin-top: 20px;">
        <img :src="CpiiLogo" alt="CPII Logo" style="display: inline-block; height: 30px; width: 28.125px; margin-top: -1px;">
        <p style="color: #091E42; font-family: Inter; font-size: 18px; font-style: normal; font-weight: 400; line-height: 28px; letter-spacing: 0.72px; width: 156px; margin-left: 10px;">CPII Tool Store</p>
      </div>
    </div>

    <div style="top: 111px; border-radius: 10px; border: 1px solid var(--color-light-grey-3, #DFE1E6); width: 544px; height: 600px; display: flex; flex-direction: column; padding: 30px; background-color: linear-gradient(0deg, var(--color-lightest-grey, rgba(250, 251, 252, 0.82)) 0%, var(--color-lightest-grey, rgba(250, 251, 252, 0.82)) 100%), var(--color-white, #FFF); margin: 0 auto;">
      <div class="signUpTitle">
        <p style="padding-left: 15px; padding-top: 40px; font-weight: bolder; color: var(--color-default, #172B4D); font-family: Inter; font-size: 32px; font-style: normal; font-weight: 700; line-height: 40px;">Sign up</p>
        <p style="padding-left: 195px; padding-top: 20px; height: 24px; color: var(--color-brand, #0052CC); text-align: right; font-family: Inter; font-size: 16px; font-style: normal; font-weight: 400; line-height: 24px; letter-spacing: 0.32px; text-decoration: underline;" @click="this.$router.push('/LoginPage')">I have an account</p>
      </div>
      <div class="signUpField">
        <input class="input" placeholder="E-mail" style="margin-bottom: 15px;" v-model="email" type="email" @keydown.enter="handleEnter" :style="{ color: email === '' ? colors['grey'] : colors['black'] }">
        <input class="input" placeholder="Password" style="margin-bottom: 15px;" v-model="password" type="password" @keydown.enter='handleEnter' :style="{ color: password === '' ? colors['grey'] : colors['black'] }">
        <input class="input" placeholder="Confirm Password" style="margin-bottom: 15px;" v-model="confirmPassword" type="password" @keydown.enter='handleEnter' :style="{ color: confirmPassword === '' ? colors['grey'] : colors['black'] }">
        <input class="input" placeholder="Organization Code" v-model="organizationCode" @keydown.enter='register' :style="{ color: password === '' ? colors['grey'] : colors['black'] }">
        <button class="registerBtn" style="margin-top: 40px;" @click="register">Get Started</button>
      </div>
    </div>
  </div>
</template>

<script>
import {request} from "../js/requestConfig";
import {mapActions} from "vuex";

export default {
  name: "RegisterPage",
  created() {
    this.$store.commit('hideSidenav')
  },
  mounted(){
    if(localStorage.getItem('token')){
      request('post', '/mongodb/check_login_status', {}, {
        token: localStorage.getItem('token'),
      }).then((res) => {
        if(res.data.success){
          this.$router.push('/HomePage');
        }else{
          console.log('Token is expired.');
          this.$store.commit('hideSidenav');
          this.$store.state.isLogIn = false;
          this.$store.state.userId = '';
          localStorage.removeItem('token');
          localStorage.setItem('isRefreshed', 'false');
          localStorage.removeItem('userStatus');
          localStorage.removeItem('tools');
          clearInterval(this.$store.state.checkTokenInterval);
        }
      })
    }
  },
  data(){
    return{
      email:'',
      password:'',
      confirmPassword:'',
      organizationCode:'',

      colors: {
        'grey': '#C1C7D0',
        'black': '#000000'
      },
    }
  },
  methods:{
    ...mapActions(["updateWorkspaceProjects"]),

    async register() {
      if (this.email === '') {
        this.$toast({ message: 'Email cannot be null!', position: "top" });
        return;
      }
      if (this.password === '') {
        this.$toast({ message: 'Password cannot be null!', position: "top" });
        return;
      }
      if (this.password.length < 8) {
        this.$toast({ message: 'Please input a password that is 8 characters or longer', position: "top" });
        return;
      }
      if (this.organizationCode === '') {
        this.$toast({ message: 'Org Code cannot be null!', position: "top" });
        return;
      }
      if(!this.isValidEmail(this.email)){
        this.$toast({ message: 'Please input a valid E-mail!', position: "top" });
        return;
      }
      if(this.password!==this.confirmPassword){
        this.$toast({ message: 'Please input the same password in two password fields!', position: "top" });
        return;
      }
      try {
        const orgCheckResponse = await request('post', '/mongodb/check_orgs', {}, {
          organization_code: this.organizationCode
        });

        if (!orgCheckResponse.data.success) {
          this.$toast({ message: 'Please input a valid organization code!', position: "top" });
          return;
        }

        request('post', '/mongodb/register', {}, {
          email: this.email,
          password: this.password,
          organization_code: this.organizationCode
        }).then((res) => {
          if (res.data.success) {
            localStorage.setItem('token', res.data.response.token);
            localStorage.setItem('isRefreshed', 'false');
            this.$store.state.isLogIn = true;
            let isAdmin = res.data.response.is_admin;
            request('get', '/mongodb/get_id_from_token', {
              token: localStorage.getItem('token')
            }, {}).then((res1) =>{
              if(res1.data.success){
                this.$store.state.userId = res1.data.response.user_id;
                request('get', '/mongodb/get_tools', {
                  'user_id': this.$store.state.userId
                }, {}).then((res2) => {
                  localStorage.setItem('tools', res2.data.response);
                  if(isAdmin){
                    localStorage.setItem('userStatus', 'admin');
                    this.$router.push('/AdminPage');
                  }else{
                    localStorage.setItem('userStatus', 'user');
                    this.$router.push('/HomePage');
                  }
                })
              }else{
                this.$store.commit('hideSidenav');
                this.$store.state.isLogIn = false;
                this.$store.state.userId = '';
                localStorage.removeItem('token');
                localStorage.setItem('isRefreshed', 'false');
                localStorage.removeItem('userStatus');
                localStorage.removeItem('tools');
                clearInterval(this.$store.state.checkTokenInterval);
                this.$toast({ message: 'There is an error in obtaining id from token.', position: "top" });
                return
              }
            })
          }
        })
      } catch (error) {
        console.error('There is an error in the registering process', error);
      }
    },

    handleEnter(event) {
      event.preventDefault();
      var currentTextarea = event.target;
      this.email = this.email.replace(/[\r\n]+/g, "")
      this.password = this.password.replace(/[\r\n]+/g, "")
      this.organizationCode = this.organizationCode.replace(/[\r\n]+/g, "")
      var nextTextarea = this.getNextTextarea(currentTextarea);
      if (nextTextarea) {
        nextTextarea.focus();
      }
    },
    getNextTextarea(currentTextarea) {
      var textareas = document.getElementsByTagName("input");
      var currentFound = false;
      for (var i = 0; i < textareas.length; i++) {
        if (textareas[i] === currentTextarea) {
          currentFound = true;
        } else if (currentFound && textareas[i].offsetParent !== null) {
          return textareas[i];
        }
      }
      return null;
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
  }
}
</script>

<style scoped>
.totalBlock{
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
}
.topPanel{
    display: flex;
    flex-direction: row;
    height: 66px;
    width: 100%;
    padding: 16px 30px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    vertical-align: middle;
}
.signUpTitle{
  align-items: center;
  display: flex; 
  flex-direction: row; 
  width: 100%;
}
.signUpField{
  margin-top: 42px; 
  margin-left: 20px; 
  display: flex; 
  flex-direction: column; 
  width: 100%;
}
.input{
  display: flex;
  padding: 15px 20px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  border: 0.5px solid var(--cpii-tool-store-dark-grey-4, #979eaa);
  width: 448px; 
  height: 58px;
}
.registerBtn{
  width: 448px;
  height: 58px;
  border-radius: 5px; 
  text-transform: none; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center; 
  background: #0052CC; 
  color: var(--color-white, #FFF); 
  font-family: Inter; 
  font-size: 18px; 
  font-style: normal; 
  font-weight: 700; 
  line-height: 28px; 
  letter-spacing: 0.72px;
  border: none;
  cursor: pointer; 
  padding: 15px 60px;
  gap: 10px;
}
.registerBtn:hover {
  background: #0747A6;
}
.registerBtn:active {
  background: #172B4D;
}
</style>
