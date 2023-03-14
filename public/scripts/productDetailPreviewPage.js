/** JS File for /productDetailPreviewPage */
document.addEventListener("DOMContentLoaded", showProductData());

/** Displays the data for a product. */
function showProductData() {
    console.log("moin");
    const previewString = window.sessionStorage.getItem("previewObject");
    const previewArray = previewString.split(',');
    const imageData = window.sessionStorage.getItem("imageData");
    
    document.getElementById("productDetailName").innerText = previewArray[0];
    document.getElementById("productDetailPrice").innerText = previewArray[2]+" €";
    document.getElementById("productDetailOS").innerText = previewArray[5];
    document.getElementById("productDetailamountRAM").innerText = previewArray[6];
    document.getElementById("productDetailColor").innerText = previewArray[4];
    document.getElementById("productDetailTypeCPU").innerText = previewArray[7];
    document.getElementById("productDetailTypeGPU").innerText = previewArray[8];

    document.getElementById("productDetailDescriptionText").innerText = previewArray[1];

    document.getElementById("productDetailImage").src = imageData;

    document.getElementById("productDetailTitleName").innerText = previewArray[0];
    document.getElementById("productDetailPriceText").innerText = previewArray[2]+" €";

}
