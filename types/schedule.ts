export type ScheduleItem = {
  id: string;
  type: string;
  title: string;
  duration: number;
  startTime: string;
  datetime_from: string;
  location?: string;
  lecturer?: string;
  presenters_rel?: Array<{
    presenter_rel?: {
      name: string;
    };
  }>;
  location_rel?: {
    title: string;
  };
};

export type ScheduleResponse = {
  data: {
    sessions: ScheduleItem[];
  };
  status: string;
};

export type SessionDetail = {
  id: string;
  type: string;
  title: string;
  duration: number;
  startTime: string;
  datetime_from: string;
  description?: string;
  presenters_rel?: Array<{
    presenter_rel?: {
      name: string;
    };
  }>;
  location_rel?: {
    title: string;
  };
};

export type SessionDetailResponse = {
  data: {
    session: SessionDetail;
  };
  status: string;
}; 