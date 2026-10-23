'use client';

import { revealStyles } from '@/components/motion/reveal/reveal.styles';
import { Screen } from '@/components/screens/screen/screen.view';
import { ScreenLabel } from '@/components/screens/screen-head/screen-head.view';
import { buttonStyles } from '@/components/ui/button/button.styles';
import { Icon } from '@/components/ui/icon/icon.view';
import { contact } from '@/config/profile/profile.constants';
import { site } from '@/config/site/site.constants';
import type { HomeScreenProps } from '@/features/home/home-screen/home-screen.types';
import { track } from '@/lib/analytics/analytics.service';
import { cn } from '@/utils/cn/cn.helpers';

import { SOCIALS } from './contact-screen.constants';
import { useCopyEmail, useSpotlight } from './contact-screen.hooks';
import { contactScreenStyles as s } from './contact-screen.styles';

/** 11 · Contact: what I'm interested in, copy or send an email, and my profiles. */
export function ContactScreen({ id }: HomeScreenProps) {
  const { status, copy, address } = useCopyEmail(site.email);
  const card = useSpotlight();
  const message =
    status === 'copied'
      ? 'Copied to clipboard'
      : status === 'manual'
        ? 'Press ⌘/Ctrl + C to copy'
        : '';

  return (
    <Screen id={id} labelledBy="ct-title">
      <div className={cn(s.wrap(), revealStyles.root())}>
        <span className={s.shine()} aria-hidden="true" />
        <div ref={card} className={s.card()}>
          <span className={s.spotlight()} aria-hidden="true" />
          <div className={s.top()}>
            <div>
              <p className={s.label()}>
                <ScreenLabel screenId={id} title={contact.title} />
              </p>
              <h2 className={s.heading()} id="ct-title">
                {contact.heading}
              </h2>
              <p className={s.sub()}>{contact.sub}</p>
            </div>
            <span className={s.monogram()} aria-hidden="true">
              {site.initials}
            </span>
          </div>
          <div className={s.actions()}>
            <button
              type="button"
              className={cn(buttonStyles.root({ tone: 'paper' }), s.action())}
              onClick={copy}
            >
              <Icon name="copy" />
              <span className={s.copyLabel()}>
                {status === 'idle' ? (
                  <>
                    <span className={s.long()}>
                      {contact.copyLabel} <span ref={address}>{site.email}</span>
                    </span>
                    <span className={s.short()}>{contact.copyShort}</span>
                  </>
                ) : status === 'manual' ? (
                  <span ref={address}>{site.email}</span>
                ) : (
                  message
                )}
              </span>
            </button>
            <a
              className={cn(buttonStyles.root({ tone: 'paper-ghost' }), s.action())}
              href={`mailto:${site.email}`}
            >
              {contact.sendLabel} <Icon name="ne" />
            </a>
            <span className={s.live()} role="status" aria-live="polite">
              {message}
            </span>
          </div>
          <div className={s.foot()}>
            <span className={s.status()}>
              <Icon name="peak" className={s.statusIcon()} />
              {contact.status}
            </span>
            <div className={s.socials()}>
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  className={s.social()}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={social.name}
                  onClick={() => track({ name: 'outbound', props: { target: social.name } })}
                >
                  <Icon name={social.icon} size={15} className={s.socialIcon()} />
                  <span className={s.socialLabel()} aria-hidden="true">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
