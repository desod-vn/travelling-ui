<template>
    <div id="home">
        <Header />
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <form class="avatar-content animate" @submit.prevent="handle()">
                        <div class="container-avatar">
                            <label><b>Ảnh đại diện</b></label>

                            <input
                                type="file"
                                name="image"
                                class="form-control-file"
                                @change="onFile"
                                required
                            />
                            <br />
                            <button type="submit" class="btn btn-success">Thay đổi</button>
                        </div>
                        <em>Vui lòng chọn ảnh có dung lượng nhỏ hơn 1MB.</em>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../../components/layouts/Header'

import { mapGetters } from 'vuex'
import axios from '../../utils'

export default {
    data() {
        return {
            avatar: '',
        }
    },
    computed: {
        ...mapGetters(['getUserSlug' ,'getUserId'])
    },
    methods: {
        onFile (e) {
            this.avatar = e.target.files[0];
        },
        handle () {
            let data = new FormData();
            data.append("image", this.avatar);
            const config = {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
            axios
            .post(`user/avatar/${this.getUserId}`, data, config)
            .then(response => {
                if(response.data.status){
                    this.$router.push({ name: "user", params: { id: this.getUserId, slug: this.getUserSlug} })
                }
            })
        }
    },
    mounted() {
    },
    components: {
        Header,
    }
}
</script>
<style scoped>

</style>