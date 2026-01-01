async function upload() {
  const fileInput = document.getElementById("pdf");

  if (!fileInput.files.length) {
    alert("Select a PDF first");
    return;
  }

  const formData = new FormData();
  formData.append("pdf", fileInput.files[0]);

  const res = await fetch("/upload", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    alert("Failed to generate PPT");
    return;
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "result.pptx";
  a.click();
}
