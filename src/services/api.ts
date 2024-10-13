import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_URL;
const CDN_URL = process.env.REACT_APP_CDN_URL;

export const fetchImage = async (imageID: string) => {
  try {
    const response = await axios.get(`${CDN_URL}/image/view/${imageID}`, {
      responseType: 'blob',
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch image');
    }
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}

export const fetchVideo = async (videoID: string) => {
  try {
    const response = await axios.get(`${CDN_URL}/video/view/${videoID}`, {
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
    const response = await axios.post(`${API_BASE_URL}/upload/`, formData, {
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
    console.log('API Base URL:', process.env.API_GATEWAY_URL, 'API:', API_BASE_URL);
    const response = await axios.get(`${API_BASE_URL}/data/summaries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summaries:', error);
    throw error;
  }
};

export const fetchAnalysisData = async (videoId: string) => {
  try {
    const apiUrl = `${API_BASE_URL}/data/${encodeURIComponent(videoId)}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis data:', error);
    throw error;
  }
};

export const deleteAnalysis = async (videoID: string) => {
  try {
    const apiUrl = `${API_BASE_URL}/delete/${encodeURIComponent(videoID)}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error deleting analysis.', error)
    throw error;
  }
}

export const downloadXLSX = async (selectedAnalysis: any, filename: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/view/xlsx`,
      selectedAnalysis,
      { responseType: 'blob' }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.xlsx`);
    document.body.appendChild(link);
    link.click();

    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  } catch (error) {
    console.error('Error downloading XLSX:', error);
  }
};
