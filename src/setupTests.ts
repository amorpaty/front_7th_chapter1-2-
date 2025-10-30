import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

// 전역 MUI 아이콘 목(Mock)
// 목적: Windows에서 많은 아이콘 파일을 열며 발생하는 EMFILE(too many open files)
// 문제를 완화하고 테스트 실행 안정성을 높입니다.
vi.mock('@mui/icons-material', async () => {
  const React = await import('react');
  const IconStub = (props: any) => React.createElement('span', props, null);
  return {
    Notifications: IconStub,
    ChevronLeft: IconStub,
    ChevronRight: IconStub,
    Delete: IconStub,
    Edit: IconStub,
    Close: IconStub,
  };
});

import { handlers } from './__mocks__/handlers';

// ! Hard 여기 제공 안함
/* msw */
export const server = setupServer(...handlers);

vi.stubEnv('TZ', 'UTC');

beforeAll(() => {
  server.listen();
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

beforeEach(() => {
  expect.hasAssertions(); // ? Med: 이걸 왜 써야하는지 물어보자

  vi.setSystemTime(new Date('2025-10-01')); // ? Med: 이걸 왜 써야하는지 물어보자
});

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});

afterAll(() => {
  vi.resetAllMocks();
  vi.useRealTimers();
  server.close();
});
