let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenendImg;
let windowWidth = window.innerWidth;

if (galleryImages) {
  galleryImages.forEach(function (image, index) {
    image.addEventListener("click", () => {
      let getCssElement = window.getComputedStyle(image);
      let getFullImageUrl = getCssElement.getPropertyValue("background-image");
      let getImageUrlPosition = getFullImageUrl.split("/img/thumbs/");
      let newImageUrl = getImageUrlPosition[1].replace('")', "");

      getLatestOpenendImg = index + 1;
      let container = document.body;
      let newImageWindow = document.createElement("div");
      container.append(newImageWindow);
      newImageWindow.setAttribute("class", "img-window");
      newImageWindow.addEventListener("click", () => {
        newImageWindow.remove();
      });

      let newImg = document.createElement("img");
      newImageWindow.appendChild(newImg);
      newImg.setAttribute("src", "img/" + newImageUrl);
      newImg.setAttribute("id", "current-img");
      newImg.onload = function () {
        let imgWidth = this.width;
        let calcImageWidth = windowWidth - imgWidth;
        let calcImage = calcImageWidth / 2 - 80;
        // next button
        let nextBtn = document.createElement("a");
        nextBtn.textContent = ">";
        container.appendChild(nextBtn);
        nextBtn.setAttribute("class", "img-btn-next");
        nextBtn.addEventListener("click", () => {
          document.querySelector("#current-img").remove();
          let getImageWindow = document.querySelector(".img-window");
          newImg = document.createElement("img");
          getImageWindow.appendChild(newImg);
          let calcNewImage;
          calcNewImage = getLatestOpenendImg + 1;
          if (calcNewImage > galleryImages.length) {
            calcNewImage = 1;
          }
          newImg.setAttribute("src", "img/img" + calcNewImage + ".jpg");
          newImg.setAttribute("id", "current-img");
          getLatestOpenendImg = calcNewImage;
        });
        nextBtn.style.cssText = "right: " + calcImage + "px;";
        // Previuos button
        let prevBtn = document.createElement("a");
        prevBtn.textContent = "<";
        container.appendChild(prevBtn);
        prevBtn.setAttribute("class", "img-btn-prev");
        prevBtn.addEventListener("click", () => {
          newImg.remove();
          let getImageWindow = document.querySelector(".img-window");
          newImg = document.createElement("img");
          getImageWindow.appendChild(newImg);
          let calcNewImage;
          calcNewImage = getLatestOpenendImg - 1;
          if (calcNewImage < 1) {
            calcNewImage = galleryImages.length;
          }
          newImg.setAttribute("src", "img/img" + calcNewImage + ".jpg");
          newImg.setAttribute("id", "current-img");
          getLatestOpenendImg = calcNewImage;
        });
        prevBtn.style.cssText = "left: " + calcImage + "px;";
        newImageWindow.addEventListener("click", () => {
          nextBtn.remove();
          prevBtn.remove();
        });
      };
    });
  });
}
