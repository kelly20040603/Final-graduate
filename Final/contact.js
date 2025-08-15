// 完整台灣縣市與鄉鎮市區
const zipData = {
  "台北市": ["中正區","大同區","中山區","松山區","大安區","萬華區","信義區","士林區","北投區","內湖區","南港區","文山區"],
  "新北市": ["板橋區","新莊區","中和區","永和區","土城區","樹林區","鶯歌區","三重區","蘆洲區","五股區","泰山區","林口區","淡水區","金山區","萬里區","八里區","三芝區","石門區"],
  "基隆市": ["仁愛區","信義區","中正區","中山區","安樂區","暖暖區","七堵區"],
  "桃園市": ["桃園區","中壢區","平鎮區","八德區","楊梅區","蘆竹區","大園區","龜山區","觀音區","復興區"],
  "新竹市": ["東區","北區","香山區"],
  "新竹縣": ["竹北市","竹東鎮","新埔鎮","關西鎮","湖口鄉","新豐鄉","芎林鄉","寶山鄉","五峰鄉","橫山鄉","尖石鄉","北埔鄉","峨眉鄉"],
  "苗栗縣": ["苗栗市","頭份市","竹南鎮","後龍鎮","通霄鎮","苑裡鎮","卓蘭鎮","大湖鄉","公館鄉","銅鑼鄉","南庄鄉","頭屋鄉","三義鄉","西湖鄉","造橋鄉","三灣鄉","獅潭鄉","泰安鄉"],
  "台中市": ["中區","東區","南區","西區","北區","北屯區","西屯區","南屯區","太平區","大里區","霧峰區","烏日區","豐原區","后里區","石岡區","東勢區","和平區","新社區","潭子區","大雅區","神岡區","大肚區","沙鹿區","龍井區","梧棲區","清水區","大甲區","外埔區","大安區"],
  "彰化縣": ["彰化市","鹿港鎮","和美鎮","線西鄉","伸港鄉","福興鄉","秀水鄉","花壇鄉","芬園鄉","員林市","溪湖鎮","田中鎮","大村鄉","埔心鄉","永靖鄉","社頭鄉","二水鄉","北斗鎮","田尾鄉","埤頭鄉","溪州鄉","竹塘鄉","二林鎮","大城鄉","芳苑鄉"],
  "南投縣": ["南投市","埔里鎮","草屯鎮","竹山鎮","集集鎮","名間鄉","鹿谷鄉","中寮鄉","魚池鄉","國姓鄉","水里鄉","信義鄉","仁愛鄉"],
  "雲林縣": ["斗六市","斗南鎮","虎尾鎮","西螺鎮","土庫鎮","北港鎮","古坑鄉","大埤鄉","莿桐鄉","林內鄉","二崙鄉","崙背鄉","麥寮鄉","東勢鄉","褒忠鄉","台西鄉","元長鄉","四湖鄉","口湖鄉","水林鄉"],
  "嘉義市": ["東區","西區"],
  "嘉義縣": ["太保市","朴子市","布袋鎮","大林鎮","民雄鄉","溪口鄉","新港鄉","六腳鄉","東石鄉","義竹鄉","鹿草鄉","水上鄉","中埔鄉","竹崎鄉","梅山鄉","番路鄉","大埔鄉","阿里山鄉"],
  "台南市": ["中西區","東區","南區","北區","安平區","安南區","永康區","歸仁區","新化區","左鎮區","玉井區","楠西區","南化區","仁德區","關廟區","龍崎區","官田區","麻豆區","佳里區","西港區","七股區","將軍區","學甲區","北門區","新營區","後壁區","白河區","東山區","六甲區","下營區","柳營區","鹽水區","善化區","大內區","山上區","新市區","安定區"],
  "高雄市": ["新興區","前金區","苓雅區","鹽埕區","鼓山區","旗津區","前鎮區","三民區","楠梓區","小港區","左營區","仁武區","大社區","岡山區","路竹區","阿蓮區","田寮區","燕巢區","橋頭區","梓官區","彌陀區","永安區","湖內區","鳳山區","大寮區","林園區","鳥松區","大樹區","旗山區","美濃區","六龜區","內門區","杉林區","甲仙區","桃源區","那瑪夏區","茂林區","茄萣區"],
  "屏東縣": ["屏東市","潮州鎮","東港鎮","恆春鎮","萬丹鄉","長治鄉","麟洛鄉","九如鄉","里港鄉","鹽埔鄉","高樹鄉","萬巒鄉","內埔鄉","竹田鄉","新埤鄉","枋寮鄉","枋山鄉","春日鄉","獅子鄉","車城鄉","牡丹鄉","恆春鄉","滿州鄉"],
  "宜蘭縣": ["宜蘭市","羅東鎮","蘇澳鎮","頭城鎮","礁溪鄉","壯圍鄉","員山鄉","冬山鄉","五結鄉","三星鄉","大同鄉","南澳鄉"],
  "花蓮縣": ["花蓮市","鳳林鎮","玉里鎮","新城鄉","吉安鄉","壽豐鄉","秀林鄉","光復鄉","豐濱鄉","瑞穗鄉","萬榮鄉","富里鄉","卓溪鄉"],
  "台東縣": ["台東市","成功鎮","關山鎮","卑南鄉","鹿野鄉","池上鄉","東河鄉","長濱鄉","太麻里鄉","大武鄉","綠島鄉","海端鄉","延平鄉","金峰鄉","達仁鄉","蘭嶼鄉"],
  "澎湖縣": ["馬公市","西嶼鄉","望安鄉","七美鄉","白沙鄉","湖西鄉"],
  "金門縣": ["金沙鎮","金湖鎮","金寧鄉","金城鎮","烈嶼鄉","烏坵鄉"],
  "連江縣": ["南竿鄉","北竿鄉","莒光鄉","東引鄉"]
};

const citySelect = document.getElementById('city');
const districtSelect = document.getElementById('district');
const captchaImg = document.getElementById('captchaImg');

// 初始化縣市選單
Object.keys(zipData).forEach(city => {
  const opt = document.createElement('option');
  opt.value = city;
  opt.textContent = city;
  citySelect.appendChild(opt);
});

// 切換縣市時更新區域
citySelect.addEventListener('change', () => {
  districtSelect.innerHTML = '<option value="">請選擇區域</option>';
  if (zipData[citySelect.value]) {
    zipData[citySelect.value].forEach(dist => {
      const opt = document.createElement('option');
      opt.value = dist;
      opt.textContent = dist;
      districtSelect.appendChild(opt);
    });
  }
});

// 驗證碼載入
function loadCaptcha() {
  captchaImg.src = `/captcha/image?ts=${Date.now()}`;
}
captchaImg.addEventListener('click', loadCaptcha);
loadCaptcha();

// 表單驗證
function validateForm() {
  const errors = [];
  const name = document.getElementById('name').value.trim();
  const city = citySelect.value;
  const district = districtSelect.value;
  const address = document.getElementById('address').value.trim();
  const tel = document.getElementById('tel').value.trim();
  const mobile = document.getElementById('mobile').value.trim();
  const email = document.getElementById('email').value.trim();
  const issueType = document.getElementById('issueType').value;
  const message = document.getElementById('message').value.trim();
  const captcha = document.getElementById('captcha').value.trim();

  if (!name) errors.push("請輸入姓名");
  if (!city) errors.push("請選擇縣市");
  if (!district) errors.push("請選擇區域");
  if (!address) errors.push("請輸入地址");
  if (tel && !/^\d{2,3}-\d{6,8}$/.test(tel)) errors.push("市話格式錯誤（例：02-12345678）");
  if (!/^09\d{8}$/.test(mobile)) errors.push("手機格式錯誤（例：0912345678）");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Email 格式錯誤");
  if (!issueType) errors.push("請選擇問題類型");
  if (!message) errors.push("請輸入問題描述");
  if (!captcha) errors.push("請輸入驗證碼");

  return errors;
}

// 表單送出
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const errorBox = document.getElementById('errorMessages');
  const errorMessages = validateForm();

  if (errorMessages.length > 0) {
    errorBox.innerHTML = errorMessages.join('<br>');
    return;
  }

  // 驗證碼檢查
  const captchaCode = document.getElementById('captcha').value.trim();
  try {
    const captchaRes = await fetch('/captcha/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: captchaCode })
    });
    const captchaData = await captchaRes.json();

    if (!captchaData.valid) {
      errorBox.innerHTML = '驗證碼錯誤，請重新輸入';
      loadCaptcha();
      return;
    }
  } catch (err) {
    errorBox.innerHTML = '驗證碼檢查失敗，請稍後再試';
    return;
  }

  errorBox.innerHTML = '';

  const formData = {
    name: document.getElementById('name').value.trim(),
    city: citySelect.value,
    district: districtSelect.value,
    address: document.getElementById('address').value.trim(),
    tel: document.getElementById('tel').value.trim(),
    mobile: document.getElementById('mobile').value.trim(),
    email: document.getElementById('email').value.trim(),
    issueType: document.getElementById('issueType').value,
    message: document.getElementById('message').value.trim()
  };

  try {
    const res = await fetch('/contact/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      alert('表單已送出，感謝您的填寫！');
      e.target.reset();
      loadCaptcha();
    } else {
      alert('送出失敗，請稍後再試。');
    }
  } catch (err) {
    console.error(err);
    alert('發生錯誤，請檢查網路連線。');
  }
});
