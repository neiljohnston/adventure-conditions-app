<template>
    <v-app v-resize="onResize">
        <v-navigation-drawer fixed touchless stateless :permanent="stateless" :right="right" :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="toggleVariant">
                            <v-icon v-html="miniVariant ? 'chevron_left' : 'chevron_right'"></v-icon>
                        </v-btn>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ legend }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile value="true" v-for="(item, i) in items" :key="i" @click="linkto(item.linkpath)">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>
<script>

export default {
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                { icon: 'map', title: 'Map', linkpath: '/' },
                { icon: 'info', title: 'About', linkpath: '/about' },
            ],
            miniVariant: true,
            right: true,
            title: 'AdventureConditions.com',
            legend: 'Legend',
            status: false,
            stateless: true,
        }
    },

    mounted () {
      this.miniVariant = this.$vuetify.breakpoint.smAndDown;
      this.onResize();
    },

    methods: {
        linkto(pathname) {
            this.$router.push({ path: pathname })
        },

        toggleVariant() {
          this.miniVariant = !this.miniVariant;
          this.onResize();
        },
        
        onResize() {
          this.$bus.$emit('map-resize');
        }
    }
}

</script>

<style>
.content{
  -webkit-transition: none;
  transition: none;
}

.navigation-drawer {
  -webkit-transition: none;
  transition: none;
}
</style>
