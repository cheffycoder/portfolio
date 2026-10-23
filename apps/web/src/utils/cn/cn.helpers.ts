import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Joins class names, dropping falsy values and resolving Tailwind conflicts (last one wins). */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
