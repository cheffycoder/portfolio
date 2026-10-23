import type { ReactNode } from 'react';

import type { Project } from '@/config/profile/profile.types';

export type ProjectScreenProps = {
  id: string;
  project: Project;
  /** "01 of 02" */
  position: { index: number; total: number };
  /** The project's mock, on the stage above the copy. */
  stage: ReactNode;
};
