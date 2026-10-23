import { describe, expect, it } from 'vitest';

import {
  hasArrived,
  indexOf,
  keyTarget,
  neighbours,
  screenCount,
  screenNumber,
  stepIndex,
} from './screen-deck.helpers';

const screens = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

describe('screen deck', () => {
  it('numbers screens from 01', () => {
    expect(screenNumber(0)).toBe('01');
    expect(screenCount(1, 11)).toBe('02 / 11');
  });

  it('finds the neighbours, with none past either end', () => {
    expect(neighbours(screens, 0)).toEqual({ prev: undefined, next: screens[1] });
    expect(neighbours(screens, 1)).toEqual({ prev: screens[0], next: screens[2] });
    expect(neighbours(screens, 2)).toEqual({ prev: screens[1], next: undefined });
  });

  it('steps within the deck, treating "not measured yet" as the first screen', () => {
    expect(stepIndex(0, -1, 3)).toBe(0);
    expect(stepIndex(-1, 1, 3)).toBe(1);
    expect(stepIndex(2, 1, 3)).toBe(2);
    expect(stepIndex(0, 1, 0)).toBe(0);
  });

  it('finds a screen by id', () => {
    expect(indexOf(screens, 'about')).toBe(1);
    expect(indexOf(screens, 'nope')).toBe(-1);
  });

  it('adds quick key presses up from where a navigation is heading', () => {
    expect(keyTarget(1, null, 1, 11)).toBe(2);
    expect(keyTarget(1, 2, 1, 11)).toBe(3);
    expect(keyTarget(1, 2, -1, 11)).toBe(1);
    expect(keyTarget(10, 10, 1, 11)).toBe(10);
  });

  it('counts a screen as arrived within the tolerance', () => {
    expect(hasArrived(101, 100, 2)).toBe(true);
    expect(hasArrived(97, 100, 2)).toBe(false);
  });
});
