function compressImage(file, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
            // 1/3
            canvas.width = img.width / 3;
            canvas.height = img.height / 3;
          
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Blob으로 압축된 이미지를 생성
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob); // Promise로 Blob을 반환
            } else {
              reject(new Error("Blob 생성 실패"));
            }
          }, 'image/jpeg', quality);
        };
      };
      
      reader.onerror = () => {
        reject(new Error("이미지를 읽을 수 없습니다."));
      };
    });
}

export default compressImage;