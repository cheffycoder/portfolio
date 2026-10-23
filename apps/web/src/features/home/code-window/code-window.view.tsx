import { MockWindow } from '@/features/home/mock-window/mock-window.view';

import { codeWindowStyles as s } from './code-window.styles';

/** Co-Develop's editor: joining a room and syncing code with a second person. */
export function CodeWindow() {
  return (
    <MockWindow
      label="Co-Develop editor: joining a room and syncing code with Elena"
      title="Editor.jsx"
      aside={
        <span className={s.peers()}>
          <i className={s.peerDot()} />2 in room
        </span>
      }
    >
      <div className={s.lines()} aria-hidden="true">
        <div>
          <span className={s.n()}>01</span>
          <span className={s.kw()}>const</span> socket = io(SERVER_URL);
        </div>
        <div>
          <span className={s.n()}>02</span>socket.emit(
          <span className={s.str()}>&apos;join-room&apos;</span>, {'{'} roomId, username {'}'});
          <span className={s.peerTag()}>Elena joined</span>
        </div>
        <div>
          <span className={s.n()}>03</span>socket.on(
          <span className={s.str()}>&apos;code-sync&apos;</span>, (code){' '}
          <span className={s.kw()}>=&gt;</span> setCode(code));
        </div>
        <div>
          <span className={s.n()}>04</span>socket.emit(
          <span className={s.str()}>&apos;code-change&apos;</span>, {'{'} roomId, code {'}'});
        </div>
      </div>
    </MockWindow>
  );
}
