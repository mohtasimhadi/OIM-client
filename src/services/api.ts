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
      const response = await fetch('http://10.33.9.30:8080/upload/', {
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
  
export const fetchSummaries = async () => {
  try {
    const response = await fetch('http://10.33.9.30:8080/data/summaries');
    if (!response.ok) {
      throw new Error('Error fetching summaries');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchAnalysisData = async (videoId: string) => {
  try {
    const apiUrl = `http://10.33.9.30:8080/data/${encodeURIComponent(videoId)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching analysis data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
