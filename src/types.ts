export interface VideoInfo {
  file: File;
  bedNumber: string;
  gpsFile: File | null;
  collectionDate: string;
}

export interface UploadModalProps {
  files: File[];
  onClose: () => void;
  onSubmit: (videoInfo: VideoInfo[]) => void;
}

export interface AnalysisCardProps {
  plantName: string,
  bedNumber: string;
  collectionDate: string;
  onClick: () => void;
}

export interface CircularProgressProps {
  value: number;
  label: string;
  size?: 'small' | 'large';
}

export interface CircularityEccentricityProps {
  data: any;
}

export interface AreaPerimeterProps {
  data: any;
  graph: string;
}

export interface TotalOverViewProps {
  title: string;
  value: number | string;
  color: string;
}

export interface UploadProps{
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

export interface DockProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string; // Add searchTerm
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // Add setSearchTerm
}


export interface FilterProps {
  filters: any;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRangeChange: (name: string, min: number, max: number) => void;
}

export interface PlantDetailCardProps {
  track_id: string;
  image: string;
  circularity: number;
  eccentricity: number;
  area: number;
  perimeter: number;
  confidence: number;
  appearance: string;
  rating: string;
}

export interface QualityChartProps {
  value: number;
}

export interface UserMenuProps {
  darkMode: boolean;
}

export interface VideoCardProps {
  title: string;
  videoID: string;
}

export interface Plant {
  track_id: string;
  image: string;
  circularity: number;
  eccentricity: number;
  area: number;
  perimeter: number;
  confidence: number;
  appearance: string;
  rating: string;
}

export interface Summary {
  video_id: string;
  bed_number: string;
  collection_date: string;
  plants: string[];
}

export interface AnalysisData {
  video_id: string;
  analysis: {
    track_data: Plant[];
    above_threshold: number;
    video_id: string;
  };
  collection_date: string;
  plants: string[];
  bed_number: string;
}