/* ========================= */
/* 🔥 USER SYSTEM */
/* ========================= */

function getUserId(){
  return localStorage.getItem("currentUserId");
}

/* ===== POINTS ===== */
function getPoints(){
  let id = getUserId();
  return parseInt(localStorage.getItem("coins_"+id) || 0);
}

function addPoints(value){
  let id = getUserId();
  let coins = getPoints();
  coins += value;
  localStorage.setItem("coins_"+id, coins);
}

/* ===== NOTIFICATIONS ===== */
function getNotifications(){
  let id = getUserId();
  return JSON.parse(localStorage.getItem("noti_"+id)) || [];
}

function saveNotifications(data){
  let id = getUserId();
  localStorage.setItem("noti_"+id, JSON.stringify(data));
}

function sendNotify(text,type="system"){
  let data = getNotifications();

  data.unshift({
    text:text,
    type:type,
    time:new Date().toLocaleTimeString(),
    read:false
  });

  saveNotifications(data);
  localStorage.setItem("notifyNow", text);
}