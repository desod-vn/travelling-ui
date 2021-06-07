<template>
    <div id="home">
        <Header />
        <div class="container">
            <Create />
            <Place :places="places" />
        </div>
    </div>
</template>
<script>
import Header from '../components/layouts/Header'
import Place from '../components/place/Place'
import Create from '../components/place/Create'

import { mapGetters } from 'vuex'
import axios from '../utils'

export default {
    data() {
        return {
            places: [],
        }
    },
    updated() {
        if(!this.getUserRole)
            this.$router.push({ name: "home" });
    },
    computed: {
		...mapGetters(['getUserRole']),
	},
    methods: {
        getPlaces (name = '') {
            axios
            .get(`place?search=${name}`)
            .then(response => {
                if(response.data.status){
                    this.places = response.data.data
                }
            })
        },
        
    },
    components: {
        Header,
        Place,
        Create,
    },
    mounted() {
        this.getPlaces()
    }
}
</script>
<style scoped>

</style>