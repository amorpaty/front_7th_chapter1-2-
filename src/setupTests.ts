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

// 테스트 환경에서 MUI의 Select는 복잡한 내부 구현(포탈, 메뉴 등) 때문에
// testing-library에서 .value를 직접 읽기 어렵습니다. App 컴포넌트에
// NODE_ENV 분기를 두는 대신 여기에서 Select를 테스트 친화적인 wrapper로
// 모킹해 둡니다. 실제 환경에서는 원래 모듈을 그대로 사용합니다.
vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  const React = await import('react');

  const MockSelect = ({ value, onChange, children, ...rest }: any) => {
    return React.createElement(
      'select',
      {
        'data-mock-select': 'true',
        value,
        onChange: (e: any) => onChange && onChange({ target: { value: e.target.value } }),
        ...rest,
      },
      React.Children.map(children, (child: any) => {
        // MenuItem으로 전달된 경우도 포함해 value/children를 option으로 렌더
        const props = (child as any)?.props;
        if (React.isValidElement(child) && props && 'value' in props) {
          return React.createElement('option', { value: props.value }, props.children);
        }
        return child;
      })
    );
  };

  return {
    ...actual,
    Select: MockSelect,
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
