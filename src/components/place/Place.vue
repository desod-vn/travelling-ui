<template>
    <div class="row">
        <div class="col-lg-6">        
            <div class="mt-3 h3">
                <b-icon icon="signpost"></b-icon>
                Danh sách địa danh
            </div>

            <div class="border p-3">
                <div class="input-group mt-3 mb-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text"><b-icon icon="search" /></span>
                    </div>
                    <input
                        type="text"
                        class="form-control"
                        v-model="place"
                        @change="getPlaces(place)"
                    />
                </div>

                <div class="pt-3 pb-3">
                    <span v-for="(place, index) in places" :key="index">
                        <span
                            @click="infor(place.id, place.name, place.image)"
                            class="btn btn-outline-dark rounded-pill m-1"
                        >
                            {{ place.name }}
                        </span>
                    </span>
                </div>

            </div>
        </div>
        <div class="col-lg-6">
            <Edit :editPlace="editPlace" />
        </div>
    </div>
</template>
<script>
import Edit from './Edit'

export default {
    data() {
        return {
            place: '',
            editPlace: {
                id: '',
                name: '',
                image: '',
                urlImage: '',
                status: false,
            },
        }
    },
    components: {
        Edit,
    },
    props: ["places"],
    methods: {
        getPlaces (name) {
            this.$parent.getPlaces(name)
        },

        infor (id, name, image) {
            this.editPlace.urlImage = ''
            this.editPlace.status = true
            this.editPlace.id = id
            this.editPlace.name = name
            this.editPlace.image = image
        },
    }
};
</script>

<style scoped>
</style>