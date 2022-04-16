<template>
  <a-layout class="layout">
    <Sidebar :collapsed="collapsed"></Sidebar>
    <a-layout>
      <Header class="layout-header">
        <template #headerLeft>
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </template>
      </Header>
      <Content />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import Sidebar from './components/Slider.vue'
import Header from './components/Header.vue'
import Content from './components/Content.vue'
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    Sidebar,
    Header,
    Content
  },
  setup() {
    const collapsed = ref(false)

    return {
      collapsed
    }
  }
})
</script>
<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
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
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .site-layout-background {
    background: #fff;
  }
  .layout-header {
    background: #fff;
    padding: 0;
  }
  .layout-content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }
}
</style>
