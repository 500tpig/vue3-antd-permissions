<template>
  <div class="login" :style="{ backgroundImage: 'url(' + loginBg + ')' }">
    <div class="login-form-card">
      <div class="login-title">登录</div>
      <a-form :model="formState" name="loginForm" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.username" placeholder="用户名">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" placeholder="密码" autocomplete>
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="login-form-wrap">
          <a-form-item name="remember" no-style>
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a class="login-form-forgot" href="">Forgot password</a>
        </div>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">Log in</a-button>
          Or
          <a href="">register now!</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import loginBg from '@/assets/images/login-bg.png'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
const store = useStore()
const router = useRouter()
interface FormState {
  username: string
  password: string
  remember: boolean
}
defineComponent({ UserOutlined, LockOutlined })
const formState = reactive<FormState>({
  username: 'admin',
  password: '123456',
  remember: true
})

const onFinish = async (values: FormState) => {
  store
    .dispatch('user/login', { username: values.username, password: values.password })
    .then(() => {
      message.success('登录成功！')

      router.push('/')
    })
    .catch(() => {
      message.error('登录失败！请联系管理员')
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.username && formState.password)
})
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
  .login-form-card {
    width: 380px;
    height: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    position: absolute;
    right: 10%;
    top: 0;
    bottom: 0;
    margin: auto;
    .login-title {
      color: #3668ff;
      font-size: 26px;
      font-weight: 600;
      margin-bottom: 40px;
      margin-top: 30px;
    }
  }
  .login-form {
    width: 100%;
    padding: 0 30px;
    .site-form-item-icon {
      margin-right: 5px;
    }
    .login-form-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .login-form-forgot {
      margin-bottom: 24px;
    }
    .login-form-button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
