import Image from 'next/image';

import f1 from '@/assets/art/f1.webp';
import route from '@/assets/art/route.webp';
import trackDark from '@/assets/art/track-dark.webp';
import trackLight from '@/assets/art/track-light.webp';
import { cn } from '@/utils/cn/cn.helpers';

import { roleArtStyles as s } from './role-art.styles';
import type { RoleArtProps } from './role-art.types';

/** FanCode: a race-track map and an F1 cutaway. LogiNext: a delivery route map. Decorative only. */
export function RoleArt({ company }: RoleArtProps) {
  return (
    <>
      {company === 'fancode' ? (
        <>
          <Image className={cn(s.art(), s.trackLight())} src={trackLight} alt="" sizes="48vw" />
          <Image className={cn(s.art(), s.trackDark())} src={trackDark} alt="" sizes="30vw" />
          <Image className={cn(s.art(), s.f1())} src={f1} alt="" sizes="64vw" />
        </>
      ) : (
        <Image className={cn(s.art(), s.route())} src={route} alt="" sizes="130vw" />
      )}
      <div className={s.fade({ edge: 'top' })} />
      <div className={s.fade({ edge: 'bottom' })} />
    </>
  );
}
