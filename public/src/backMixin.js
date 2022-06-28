import NavBarBack from "./NavBarBack.vue";

export const backMixin = {

    components: {
 
        NavBarBack,
      
      },

    methods: {
        saludar(){
            return 'Este MIXIN es local, hay que importarlo'
        },
    }
}