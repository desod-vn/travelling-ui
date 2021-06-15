<template>
<div>
	<div class="row">
		<div class="col">
		<h1>ĐỊA ĐIỂM THÁNG</h1>
		</div>
		<div class="col">
			<select class="form-control">
				<option>Chọn tháng</option>
			</select>
		</div>
	</div>
	<div class="row">
		<div class="col-3">
			<div id="container">
			<img id="image" src="https://dulichviet.com.vn/thumbs/0/358x294/images/bandidau/2019-NOI-DIA/du-lich-binh-dinh-he-2019-620x510.jpg" />
			<p id="text">
				Quy Nhơn
			</p>
			</div>
		</div>
		<div class="col-3">
			<div id="container">
			<img id="image" src="https://dulichviet.com.vn/thumbs/0/358x294/images/bandidau/2019-NOI-DIA/MIEN-BAC/DU-LICH-SAPA/tua-du-lich-sapa-gia-tot-du-lich-viet.jpg" />
			<p id="text">
				Sapa
			</p>
			</div>
		</div>
		<div class="col-3">
			<div id="container">
			<img id="image" src="https://dulichviet.com.vn/thumbs/0/358x294/images/bandidau/2019-NOI-DIA/Mi%E1%BB%81n%20B%E1%BA%AFc/620%20x%20510/tourhagiang.jpg" />
			<p id="text">
				Hà Giang
			</p>
			</div>
		</div>
		<div class="col-3">
			<div id="container">
			<img id="image" src="https://dulichviet.com.vn/thumbs/0/358x294/images/bandidau/2019-NOI-DIA/Mi%E1%BB%81n%20B%E1%BA%AFc/du%20l%E1%BB%8Bch%20H%E1%BA%A1%20Long/cao-bang.jpg" />
			<p id="text">
				Cao Bằng
			</p>
			</div>
		</div>
	</div>
</div>
</template>
<style scoped>
#container {
  height: 200px;
  padding: 5px;
  position: relative;
}
#image {
  position: absolute;
  left: 0;
  max-width: 100%;
  top: 0;
}
#text {
  z-index: 100;
  position: absolute;
  color: white;
  font-size: 24px;
  font-weight: bold;
bottom: 0;
text-shadow: 2px 2px 5px #000;
	left: 1;
}
</style>
<script>
  export default {
   
  }
</script>