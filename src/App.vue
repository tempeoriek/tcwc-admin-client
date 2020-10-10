<template>
  <div id="app">
    <Header />
    <SideBar />
    <router-view/>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.b-sidebar {
   width: 280px !important;
 }
.navbar {
   height: 75px !important;
 }
.nav-link {
  color: black !important;
}

/* BASE STANDART */
  .bs {
    border: 0.2vmin solid grey;
    border-radius: 1vmin;
  }

  .cb {
    display: flex;
  }
  .cb.all {
    justify-content: center;
    align-items: center;
  }
  .cb.vertical {
    align-items: center
  }
  .cb.horizontal {
    justify-content: center;
  }
  .cb.between {
    justify-content: space-between;
  }
  .cb.around {
    justify-content: space-around;
  }
  .cb.row {
    flex-direction: row;
  }
  .cb.top {
    align-items: flex-start;
  }
  .cb.bottom {
    align-items: flex-end;
  }
  .cb.left {
    justify-content: flex-start;
  }
  .cb.right {
    justify-content: flex-end;
  }
</style>
