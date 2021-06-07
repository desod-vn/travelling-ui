<template>
  <div class="app"></div>
</template>

<script>
import axios from "../../utils";

export default {
    mounted() {
        axios
        .post("logout")
        .then((response) => {
            if(response.data.status)
            {
                localStorage.removeItem("token");
                this.$router.go();
            }
        })
        .catch(() => {
            this.$router.push({ name: "home" });
        });
    }
}
</script>

<style>
</style>