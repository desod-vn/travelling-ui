<template>
  <b-list-group>
    <b-card header="Thông tin">
      <b-list-group-item>
        <b-icon icon="capslock" /> Địa điểm:
        <strong>{{ box.place.name }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="shield-lock" /> Tổ chức:
        <strong>
          <router-link
            :to="{
              name: 'user',
              params: { id: box.user.id, slug: box.user.slug },
            }"
          >
            {{ box.user.name }}
          </router-link>
        </strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="clock" />
        <strong> {{ box.start }} đến {{ box.end }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="people" /> Số lượng:
        <strong>{{ box.people }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="bicycle" /> Phương tiện:
        <strong>{{ box.vehicle }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="cash" /> Chi phí:
        <strong>{{ box.fee }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="star" /> Trạng thái:
        <strong>{{ box.status }}</strong>
      </b-list-group-item>
    </b-card>
    <Member :box="box" :joined="joined" :member="member" />
  </b-list-group>
</template>
<script>
import Member from "../box/Member";

export default {
  components: {
    Member,
  },
  props: ["box", "member", "joined"],
  methods: {
    getBox() {
      this.$parent.getBox();
    },
  },
};
</script>