<template>
  <div>
    <b-navbar toggleable="lg" type="secondary" variant="light">
      <div class="container">
        <b-navbar-nav>
          <b-nav-item href="#">Trang chủ</b-nav-item>
          <b-nav-item href="#">Nhóm của tôi</b-nav-item>
          <b-nav-item href="#">Địa điểm</b-nav-item>
          <b-nav-item href="#">Danh sách nhóm</b-nav-item>
          <b-nav-item href="#">Thông báo</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </div>
    </b-navbar>
  </div>
</template>