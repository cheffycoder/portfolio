'use client';

import { useState } from 'react';

import { COMPANY_FILTER } from './numbers-screen.constants';

/** Which company's results stay bright ("all" keeps every tile bright). */
export function useCompanyFilter() {
  const [index, setIndex] = useState(0);
  return { index, setIndex, company: COMPANY_FILTER[index]?.value ?? 'all' };
}
