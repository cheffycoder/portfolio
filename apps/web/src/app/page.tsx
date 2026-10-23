import { SkipLink } from '@/components/layout/skip-link/skip-link.view';
import { ScreenDeck } from '@/components/screens/screen-deck/screen-deck.view';
import { projects, roles } from '@/config/profile/profile.constants';
import { homeScreenOrder, homeScreens as screens, site } from '@/config/site/site.constants';
import { AboutScreen } from '@/features/home/about-screen/about-screen.view';
import { CodeWindow } from '@/features/home/code-window/code-window.view';
import { ContactScreen } from '@/features/home/contact-screen/contact-screen.view';
import { IntroScreen } from '@/features/home/intro-screen/intro-screen.view';
import { NumbersScreen } from '@/features/home/numbers-screen/numbers-screen.view';
import { PlatformsScreen } from '@/features/home/platforms-screen/platforms-screen.view';
import { ProjectScreen } from '@/features/home/project-screen/project-screen.view';
import { RoleScreen } from '@/features/home/role-screen/role-screen.view';
import { ShareLifecycle } from '@/features/home/share-lifecycle/share-lifecycle.view';
import { SkillsScreen } from '@/features/home/skills-screen/skills-screen.view';
import { WritingScreen } from '@/features/home/writing-screen/writing-screen.view';
import { JsonLd } from '@/lib/seo/json-ld/json-ld.view';
import {
  pageMetadata,
  personJsonLd,
  profilePageJsonLd,
  websiteJsonLd,
} from '@/lib/seo/seo.helpers';

export const metadata = pageMetadata({ description: site.description, path: '/' });

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personJsonLd(), profilePageJsonLd(), websiteJsonLd()]} />
      <SkipLink href={`#${screens.about.id}`} />
      <ScreenDeck screens={homeScreenOrder}>
        <IntroScreen id={screens.intro.id} />
        <AboutScreen id={screens.about.id} />
        <NumbersScreen id={screens.numbers.id} />
        <RoleScreen id={screens.fancode.id} role={roles.fancode} />
        <RoleScreen id={screens.loginext.id} role={roles.loginext} />
        <PlatformsScreen id={screens.platforms.id} />
        <ProjectScreen
          id={screens.coDevelop.id}
          project={projects.coDevelop}
          position={{ index: 0, total: 2 }}
          stage={<CodeWindow />}
        />
        <ProjectScreen
          id={screens.shareOn.id}
          project={projects.shareOn}
          position={{ index: 1, total: 2 }}
          stage={<ShareLifecycle screenId={screens.shareOn.id} />}
        />
        <SkillsScreen id={screens.skills.id} />
        <WritingScreen id={screens.writing.id} />
        <ContactScreen id={screens.contact.id} />
      </ScreenDeck>
    </>
  );
}
