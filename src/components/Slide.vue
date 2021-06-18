<template>
  <div class="row bg-white">
    <div class="col-md-12">
      <img class="img-fluid" src="../assets/banner/1.jpg" alt="" />
    </div>
    <div class="col-md-4">
      <div class="ban">
        <div class="ban--icon">
          <b-icon icon="people-fill" />
        </div>
        <div class="ban--title">KẾT NỐI</div>
        <div class="ban--des">Kết nối dễ dàng thông qua trò chuyện</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="ban">
        <div class="ban--icon">
          <b-icon icon="calendar2-check-fill" />
        </div>
        <div class="ban--title">THỐNG NHẤT</div>
        <div class="ban--des">Lịch trình được quản lý rõ ràng, đầy đủ</div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="ban">
        <div class="ban--icon">
          <b-icon icon="heart-fill" />
        </div>
        <div class="ban--title">TIỆN LỢI</div>
        <div class="ban--des">Gặp gỡ những người cùng đam mê, sở thích</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.ban {
  background-color: #fff;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ban--icon {
  color: #f6993f;
  font-size: 1.5rem;
}
.ban--title {
  color: #000;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: bold;
}
.ban--des {
  color: #000;
  font-size: 0.8rem;
}
</style>