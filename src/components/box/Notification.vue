<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Thời gian</th>
          <th scope="col">Hoạt động</th>
          <th scope="col">Ghi chú</th>
          <th v-if="getUserId == box.user.id">
            <b-button v-b-modal.add @click="show = true" variant="success"
              >Thêm</b-button
            >
            <b-modal v-if="show" id="add" title="Thêm lịch trình" ok-only>
              <label for="date">Ngày:</label>
              <b-form-input type="date" id="date" v-model="date"></b-form-input>

              <label for="time">Giờ:</label>
              <b-form-input type="time" id="time" v-model="time"></b-form-input>

              <label for="action">Hoạt động:</label>
              <b-form-input
                type="text"
                id="action"
                v-model="notification.action"
              ></b-form-input>

              <label for="note">Ghi chú:</label>
              <b-form-input
                type="text"
                id="note"
                v-model="notification.note"
              ></b-form-input>
              <br />
              <button class="btn btn-danger" @click="add()">Thêm</button>
            </b-modal>
          </th>
        </tr>
      </thead>
      <tbody>
        <div class="d-none">
        </div>
        <tr v-for="(notification, index) in box.notifications" :key="index">
          <td>{{ notification.time }}</td>
          <td>{{ notification.action }}</td>
          <td>{{ notification.note }}</td>
          <td v-if="getUserId == box.user.id">
            <div class="btn-group">
              <span
                class="btn btn-danger"
                @click.prevent="deleteN(notification.id)"
              >
                Xóa
              </span>
              <span
                class="btn btn-primary"
                @click.prevent="
                  edit(
                    notification.id,
                    notification.time,
                    notification.action,
                    notification.note,
                    notification.box_id
                  )
                "
              >
                Sửa
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <b-alert show>
      <h5>Thông báo</h5>
      <hr />
      {{ box.content }}
    </b-alert>
    <b-list-group>
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
        <b-icon icon="people" /> Số lượng:
        <strong>{{ box.people }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="bicycle" /> Phương tiện:
        <strong>{{ box.vehicle }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="cash" /> Kinh phí:
        <strong>{{ box.fee }}</strong>
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="star" /> Trạng thái:
        <strong>{{ box.status }}</strong>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../../utils";

export default {
  data() {
    return {
      show: false,
      date: "",
      time: "",
      notification: {
        time: "",
        action: "",
        note: "",
        box_id: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserId"]),
  },
  props: ["box"],
  methods: {
    add() {
      this.notification.box_id = this.box.id;
      this.notification.time = this.date + " - " + this.time;
      console.log(this.notification);
      axios
        .post(`notification`, this.notification)
        .then((response) => {
          if (response.data.status) {
            this.show = false;
            this.$parent.getBox();
            this.$parent.success("Lịch trình", "tạo mới");
            this.notification.time = "";
            this.notification.action = "";
            this.notification.note = "";
            this.date = "";
            this.time = "";
          }
        })
        .catch((error) => {
          this.$parent.failure(error.response.data);
        });
    },

    deleteN(notification) {
      let choose = confirm("Bạn có thực sự muốn xóa lịch trình này không ?");
      if (choose == true)
        axios.delete(`notification/${notification}`).then((response) => {
          if (response.data.status) {
            this.$parent.getBox();
            this.success("Chuyên mục", "xóa");
          }
        });
    },

    edit(id, time, action, note, box) {
	let editTime = prompt("Vui lòng nhập mốc thời gian muốn sửa", time);
      let editAction = prompt("Vui lòng nhập tên hoạt động muốn sửa", action);
      let editNote = prompt("Vui lòng nhập ghi chú cho muốn sửa", note == "null" ? '' : note);
      let notification = {
        time: editTime,
        action: editAction,
        note: editNote,
        box_id: box,
      };
      if (notification != null) {
        axios
          .put(`notification/${id}`, notification)
          .then((response) => {
            if (response.data.status) {
              this.$parent.getBox();
              this.$parent.success("Lịch trình", "cập nhật");
            }
          })
          .catch((error) => {
            this.$parent.failure(error.response.data);
          });
      }
    },
  },
};
</script>