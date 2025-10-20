export interface AppStageResponse {
  code: string;
  message: string;
  data: {
    app_stage: string;
    app_url: string;
  };
} 