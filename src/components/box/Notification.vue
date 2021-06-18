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
              <label for="date">Ngày: <b class="text-danger">*</b></label>
              <b-form-input type="date" id="date" v-model="date"></b-form-input>

              <label for="time">Giờ: <b class="text-danger">*</b></label>
              <b-form-input type="time" id="time" v-model="time"></b-form-input>

              <label for="action"
                >Hoạt động: <b class="text-danger">*</b></label
              >
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
              <template #modal-footer>
                <div></div>
              </template>
            </b-modal>
          </th>
        </tr>
      </thead>
      <tbody>
        <div class="d-none"></div>
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
              <b-button
                v-b-modal.edit
                @click="
                  change(
                    notification.id,
                    notification.time,
                    notification.action,
                    notification.note,
                    notification.box_id
                  )
                "
                variant="info"
                >Sửa</b-button
              >
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal v-if="editStatus" id="edit" title="Sửa lịch trình" ok-only>
      <label for="date">Ngày - Giờ: <b class="text-danger">*</b></label>
      <b-form-input type="text" id="date" v-model="editDate"></b-form-input>

      <label for="action">Hoạt động: <b class="text-danger">*</b></label>
      <b-form-input type="text" id="action" v-model="editAction"></b-form-input>

      <label for="note">Ghi chú:</label>
      <b-form-input type="text" id="note" v-model="editNote"></b-form-input>
      <br />
      <button class="btn btn-info" @click="edit()">Cập nhật</button>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "../../utils";

export default {
  data() {
    return {
      show: false,
      editStatus: false,
      date: "",
      time: "",
      editBox: "",
      editDateTime: "",
      editDate: "",
      editTime: "",
      editAction: "",
      editNote: "",
      editId: "",
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
            this.success("Lịch trình", "tạo mới");
            this.notification.time = "";
            this.notification.action = "";
            this.notification.note = "";
            this.date = "";
            this.time = "";
          }
        })
        .catch((error) => {
          this.failure(error.response.data);
        });
    },
    change(id, time, action, note, box) {
      this.editStatus = true;
      this.editId = id;
      this.editBox = box;
      this.editDate = time;
      this.editAction = action;
      this.editNote = note;
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

    success(name, action) {
      this.$bvToast.toast(`${name} đã được ${action} thành công.`, {
        title: "Thông báo",
        variant: "success",
        solid: true,
      });
    },

    failure(error) {
      let err = "";
      for (const property in error.errors) {
        err += `${error.errors[property]}`;
      }

      this.$bvToast.toast(`${err}`, {
        title: `Có lỗi vui lòng thử lại`,
        variant: "danger",
        solid: true,
      });
    },

    edit() {
      let notification = {
        time: this.editDate,
        action: this.editAction,
        note: this.editNote,
        box_id: this.editBox,
      };
      if (notification != null) {
        axios
          .put(`notification/${this.editId}`, notification)
          .then((response) => {
            if (response.data.status) {
              this.editStatus = false;
              this.$parent.getBox();
              this.success("Lịch trình", "cập nhật");
            }
          })
          .catch((error) => {
            this.failure(error.response.data);
          });
      }
    },
  },
};
</script>