document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("photo");
  const customLabel = document.querySelector(".custom-file-label");
  const previewImg = document.querySelector(".preview-img");

  fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      customLabel.textContent = file.name;

      const reader = new FileReader();
      reader.onload = function (e) {
        previewImg.src = e.target.result;
        previewImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      customLabel.textContent = "Choisir une photo";
      previewImg.style.display = "none";
      previewImg.src = "";
    }
  });
});
