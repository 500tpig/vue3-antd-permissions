<template>
  <a-layout-header class="header">
    <div class="header-left">
      <slot name="headerLeft"></slot>
      <BreadCrumb />
    </div>
    <div class="header-right">
      <a-dropdown>
        <span class="header-right-item">
          <a-avatar src="https://img0.baidu.com/it/u=1967997459,1022958762&fm=26&fmt=auto"></a-avatar>
        </span>
        <template #overlay>
          <a-menu>
            <!-- <a-menu-item>
              <router-link to="/setting">{{ $t('system.setting') }}</router-link>
            </a-menu-item> -->
            <a-menu-item @click="handleLoginOut">退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue'
// import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'
import { defineComponent } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// const store = useStore()
// const router = useRouter()
defineComponent({ BreadCrumb })
const router = useRouter()
const store = useStore()
const handleLoginOut = () => {
  store.dispatch('user/logout')
  router.replace('/login')
}
</script>

<style scope lang="scss">
.header {
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: space-between;

  .header-left {
    display: flex;
  }

  .header-right {
    margin: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-right-item {
      margin: 0 6px;
      cursor: pointer;

      &:hover {
        color: #1890ff;
      }
    }

    .anticon {
      font-size: 20px;
    }
  }
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
