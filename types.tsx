export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Manual: undefined;
  Automático: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface Task {
  id: number;
  time: number;
  schedule: {
    type: number;
    occurrences: number;
    startDate: number | null;
    endDate: number | null;
  };
  enabled: boolean;
}
