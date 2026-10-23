'use client';

import Link from 'next/link';
import { createPortal } from 'react-dom';

import { useHydrated } from '@/components/motion/reduced-motion/reduced-motion.hooks';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { cn } from '@/utils/cn/cn.helpers';

import { flyoutMenuStyles } from './flyout-menu.styles';
import type { FlyoutMenuProps } from '../global-nav.types';

/** Full-screen menu for phones and small tablets. Closes on a link, the × button or Escape. */
export function FlyoutMenu({ open, links, onClose }: FlyoutMenuProps) {
  const mounted = useHydrated();
  if (!mounted) return null;
  return createPortal(
    <div
      className={flyoutMenuStyles.root()}
      id="flyout"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={!open}
      data-open={open ? '' : undefined}
      data-flyout
      onClick={(e) => {
        if ((e.target as Element).closest('a')) onClose();
      }}
    >
      <button
        type="button"
        className={cn(buttonStyles.icon(), flyoutMenuStyles.close())}
        data-menu-close
        aria-label="Close menu"
        onClick={onClose}
      >
        <Icon name="plus" size={15} className={flyoutMenuStyles.closeIcon()} />
      </button>
      <ul className={flyoutMenuStyles.list()}>
        {links.map((link, i) => (
          <li key={link.label}>
            <Link
              className={flyoutMenuStyles.link({ step: i === 0 ? 0 : 1 })}
              href={link.href}
              aria-current={link.current ? 'page' : undefined}
            >
              {link.label}
              {link.out ? (
                <Icon name="ne" size={18} className={buttonStyles.outLinkIcon()} />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
}
