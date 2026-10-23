import { site } from '@/config/site/site.constants';
import { NotFoundScreen } from '@/features/not-found/not-found-screen/not-found-screen.view';

export const metadata = {
  title: `Not found · ${site.name}`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundScreen />;
}
