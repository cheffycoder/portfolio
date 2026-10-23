export type UmamiWindow = Window & {
  umami?: { track: (name: string, data?: Record<string, unknown>) => void };
};
