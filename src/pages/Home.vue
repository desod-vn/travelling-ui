<template>
    <div id="home">
        <Header />
        <div class="container">
            <PlaceHot />
            <ListBox />
            <Slide />
        </div>
        <Footer />
    </div>
</template>
<script>
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'

import PlaceHot from '../components/PlaceHot'
import ListBox from '../components/ListBox'
import Slide from '../components/Slide'


export default {
    components: {
        Header,
        PlaceHot,
        ListBox,
        Slide,
        Footer
    }
}
</script>
<style scoped>

</style>
