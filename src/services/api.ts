import axios from 'axios';

export const fetchVideo = async (videoID: string) => {
  try {
    const response = await axios.get(`http://10.33.9.30:8080/view/video/${videoID}`, {
      responseType: 'blob',
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch video');
    }
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
};

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
    const response = await axios.post('http://10.33.9.30:8080/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading files:', error);
    throw error;
  }
};

export const fetchSummaries = async () => {
  try {
    const response = await axios.get('http://10.33.9.30:8080/data/summaries');
    return response.data;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }
};

export const fetchAnalysisData = async (videoId: string) => {
  try {
    const apiUrl = `http://10.33.9.30:8080/data/${encodeURIComponent(videoId)}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis data:', error);
    throw error;
  }
};
