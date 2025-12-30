// Prevent placeholder links from jumping to the top of the page.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href="#"]').forEach((anchor) => {
    // Skip the PDF download button
    if (anchor.id !== 'downloadPdf') {
      anchor.addEventListener("click", (event) => event.preventDefault());
    }
  });

  // PDF 다운로드 기능
  const downloadPdfBtn = document.getElementById('downloadPdf');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      
      try {
        // body 전체를 캡처하여 왼쪽이 잘리지 않도록
        const body = document.body;
        const page = document.querySelector('.page');
        
        // html2canvas로 body 전체를 이미지로 캡처 (보이는 그대로)
        const canvas = await html2canvas(body, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          backgroundColor: '#f7f6f3',
          width: body.scrollWidth,
          height: body.scrollHeight,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY
        });
        
        // 캔버스 크기를 mm로 변환 (1px = 0.264583mm)
        const imgWidth = canvas.width * 0.264583;
        const imgHeight = canvas.height * 0.264583;
        
        // PDF 생성 (이미지 크기에 정확히 맞춤, 여백 없음)
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          unit: 'mm',
          format: [imgWidth, imgHeight],
          compress: true
        });
        
        const imgData = canvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
        pdf.save('이승연_이력서.pdf');
      } catch (error) {
        console.error('PDF 생성 오류:', error);
        alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    });
  }
});



