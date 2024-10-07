export const uploadVideos = async (videoInfo: {
    file: File;
    bedNumber: string;
    gpsFile: File | null;
    collectionDate: string;
  }[]) => {
    const formData = new FormData();
  
    videoInfo.forEach((info) => {
      formData.append('files', info.file);
      formData.append('bedNumbers', info.bedNumber);
      formData.append('collectionDates', info.collectionDate);
      if (info.gpsFile) {
        formData.append('gpsFiles', info.gpsFile);
      }
    });
  
    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Upload failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  