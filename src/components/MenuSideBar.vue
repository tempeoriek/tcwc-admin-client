<template>
  <div>
    <div class="px-3 py-2">
      
      <p v-b-toggle="menu" block class="menu-title">
        <a class="title-style">
          <span @click="reload">{{menu}}</span>
        </a>
      </p>

      <b-collapse :id=menu class="mt-2"  accordion="my-accordion">
        <p v-for="(sub_menu, index) in sub_menu" :key="index" class="sub-menu-title">
          <a class="title-style">
            <span @click="reload_submenu">{{sub_menu.title}}</span>
          </a>
        </p>
      </b-collapse>
    
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSideBar',
  props: {
    menu: String,
    route: String,
    sub_menu: Array
  },
  methods: {
    reload() {
      this.$router.push(this.route)
      location.reload()
    },
    reload_submenu() {
      this.$router.push(this.sub_menu.route)
      location.reload()
    }
  }
}
</script>

<style scoped>
  .menu-title {
    margin-left: 30px;
  }
  .sub-menu-title {
    margin-left: 40px;
  }
  .title-style {
    color: white;
    text-decoration: none !important;
  }
</style>