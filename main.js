$(document).ready(function  () {
  // إنشاء حساب جديد
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    let fullname = $("#fullname").val().trim();
    let email = $("#regEmail").val().trim();
    let password = $("#regPassword").val().trim();

    if (fullname === "" || email === "" || password === "") {
      alert("الرجاء إدخال جميع البيانات");
      return;
    }

    if (password.length < 6) {
      alert("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    // تخزين بيانات الحساب
    localStorage.setItem("userData", JSON.stringify({ fullname, email, password }));

    showUser(fullname);

    $("#registerModal").modal("hide");
    new bootstrap.Toast(document.getElementById("liveToast")).show();
  });

  // تسجيل الدخول
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    let email = $("#email").val().trim();
    let password = $("#password").val().trim();
    let storedUser = JSON.parse(localStorage.getItem("userData"));

    if (!storedUser) {
      alert("الرجاء إنشاء حساب أولاً");
      return;
    }

    if (storedUser.email === email && storedUser.password === password) {
      showUser(storedUser.fullname);
      $("#loginModal").modal("hide");
      new bootstrap.Toast(document.getElementById("liveToast")).show();
    } else {
      alert("بيانات الدخول غير صحيحة");
    }
  });

  // تسجيل الخروج
  $("#logoutBtn").on("click", function () {
    $("#user-area").addClass("d-none");
    $("#auth-buttons").removeClass("d-none");
  });

  // إذا المستخدم مسجل دخول مسبقًا
  let savedUser = JSON.parse(localStorage.getItem("userData"));
  if (savedUser) {
    showUser(savedUser.fullname);
  }

  function showUser(name) {
    $("#usernameDisplay").text(name);
    $("#user-area").removeClass("d-none");
    $("#auth-buttons").addClass("d-none");
  }
});