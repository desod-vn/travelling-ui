<template>
    <div id="home">
        <Header />
        <div class="container border p-3">
        <form class="mx-auto" @submit.prevent="handle()">
            <div class="form-group">
                <label class="form-control-label">Mốc thời gian: </label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                />
            </div>

  <div class="form-group">
    <label for="exampleFormControlFile1">Hoạt động: </label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
  </div>

<div class="row">
    <div class="col">
      <label class="form-control-label">Phương tiện: </label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                />
    </div>
    <div class="col">
       <label class="form-control-label">Số người: </label>
                <input
                    type="number"
                    name="name"
                    class="form-control"
                />
    </div>
     <div class="col">
       <label class="form-control-label">Chi phí: </label>
                <input
                    type="number"
                    name="name"
                    class="form-control"
                />
    </div>
  </div>

            <div class="form-group">
                <label class="form-control-label">Trạng thái nhóm: </label>
                <input
                    type="text"
                    name="name"
                    class="form-control"
                />
            </div>

<div class="form-group">
    <label for="exampleFormControlTextarea1">Thông tin chung</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>


            <div class="form-group">
                <label class="form-control-label">Địa điểm: </label>
                <select class="form-control">
                    <option>Danh sách địa danh</option>
                </select>
            </div>
<div class="row">
    <div class="col">
      <label class="form-control-label">Ngày bắt đầu: </label>
                <input
                    type="date"
                    name="name"
                    class="form-control"
                />
    </div>
    <div class="col">
       <label class="form-control-label">Ngày kết thúc: </label>
                <input
                    type="date"
                    name="name"
                    class="form-control"
                />
    </div>
  </div>
            <div class="d-flex align-items-center">
                <button type="submit" class="mt-2 btn btn-info">Tạo ngay</button>
            </div>
        </form>
    </div>       
    </div>
</template>
<script>
import Header from '../../components/layouts/Header'
export default {
    components: {
        Header
    }
}
</script>
<style scoped>

</style>
