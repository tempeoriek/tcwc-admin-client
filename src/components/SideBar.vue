<template>
  <div>
    <b-sidebar id="sidebar-variant"  bg-variant="dark" text-variant="light" no-header shadow visible no-close-on-esc no-close-on-route-change>
      
      <div class="px-3 py-2 pb-5 text-center">
        <img class="logo-header" alt="Vue logo" src="../assets/logo.png">
      </div>

      <div v-for="(x, index) in menu" :key="index">
        <MenuSideBar :menu=x.menu :route=x.route :sub_menu=x.sub_menu />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import MenuSideBar from '@/components/MenuSideBar.vue'

import Model from '@/api/MenuApi'

export default {
  name: 'SideBar',
  components: {
    MenuSideBar
  },
  data () {
    return {
      menu: []
    }
  },
  created () {
    this.getMenuBar();
  },
  methods: {
    getMenuBar: async function () {
      let res = await Model.getAllData();

      if(res.data.status == 200 && res.data.data) {
        res.data.data.forEach((menu) => {
          this.menu.push({
            menu: menu.name,
            route: menu.route,
            sub_menu: (menu.sub_menu.length == 0) ? null : menu.sub_menu,
            order: menu.order
          })
        });
      }
    }
  }
}
</script>

<style scoped>
 .logo-header{
   height: 57px;
 }
</style>
