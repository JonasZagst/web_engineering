/** JS File for /productDetailPreviewPage */
document.addEventListener("DOMContentLoaded", showProductData());

/** Displays the data for a product. */
function showProductData() {
    const previewString = window.sessionStorage.getItem("previewObject");
    const previewArray = previewString.split(',');
    const imageData = window.sessionStorage.getItem("imageData");
    // console.log(imageData);
    // console.log(previewArray);

    document.getElementById("productDetailPreviewName").innerText = previewArray[0];
    document.getElementById("productDetailPreviewPrice").innerText = previewArray[2];
    document.getElementById("productDetailPreviewOS").innerText = previewArray[5];
    document.getElementById("productDetailPreviewamountRAM").innerText = previewArray[6];
    document.getElementById("productDetailPreviewColor").innerText = previewArray[4];
    document.getElementById("productDetailPreviewTypeCPU").innerText = previewArray[7];
    document.getElementById("productDetailPreviewTypeGPU").innerText = previewArray[8];

    document.getElementById("productDetailPreviewDescriptionText").innerText = previewArray[1];

    document.getElementById("productDetailPreviewImage").src = imageData;

    document.getElementById("productDetailPreviewTitleName").innerText = previewArray[0];

}
