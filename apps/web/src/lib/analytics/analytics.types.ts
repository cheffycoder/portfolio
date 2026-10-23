export type AnalyticsEvent =
  | { name: 'copy_email'; props?: undefined }
  | { name: 'outbound'; props: { target: string } }
  | { name: 'theme'; props: { mode: 'light' | 'dark' } };

/** The one contract every analytics provider implements. */
export type AnalyticsAdapter = {
  readonly name: string;
  track(event: AnalyticsEvent): void;
};
