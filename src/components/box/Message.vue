<template>
  <div>
    <div v-for="(message, index) in messages" :key="index">
      <div v-if="getUserId != message.user.id">
        <div class="text-left mt-3 mb-3">
          {{ message.user.name }}
          <div>
            <img
              :src="message.user.avatar"
              class="rounded-circle"
              alt=""
              height="40px"
              width="40px"
            />
            <span class="border rounded p-2 ml-1">
              {{ message.message }}
            </span>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-right mt-3 mb-3">
          <div>
            <span class="border rounded p-2 ml-1">
              {{ message.message }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getUserId"]),
  },
  props: ["messages"],
};
</script>

