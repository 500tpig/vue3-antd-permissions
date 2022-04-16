import { App } from 'vue'
import { Button, message, Menu, Result, Layout, Breadcrumb, Avatar, Dropdown, Form, Input, Checkbox } from 'ant-design-vue'

export default function (app: App): void {
  const g = app.config.globalProperties

  app.use(Button).use(Menu).use(Breadcrumb).use(Dropdown).use(Result).use(Avatar).use(Layout).use(Form).use(Input).use(Checkbox)

  g.$message = message
}
