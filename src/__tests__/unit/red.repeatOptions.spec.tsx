import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

const wrappedRender = (ui: React.ReactElement) =>
  render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );

/**
 * Red tests for 반복 유형 선택 (TDD RULES 기반)
 * - 1) 폼에 '반복 일정' 체크박스가 존재한다
 * - 2) 체크하면 '반복 유형' Select가 보여야 한다 (현재는 주석 처리되어 Red)
 * - 3) Select에 '매일','매주','매월','매년' 옵션이 있어야 한다 (Red)
 *
 * 이 파일은 TDD의 Red 단계(먼저 실패하는 테스트)를 의도합니다.
 */
describe('반복 유형 선택 - Red (세분화된 최소 테스트)', () => {

  it("체크하면 '반복 유형' Select가 표시되어야 한다 (Red)", async () => {
    const user = userEvent.setup();
    wrappedRender(<App />);

    const checkbox = screen.getByLabelText('반복 일정');
    await user.click(checkbox);

    // 기대: aria-label='반복 유형' Select가 렌더되어야 함
    const repeatSelect = screen.getByLabelText('반복 유형');
    expect(repeatSelect).toBeInTheDocument();
  });

  it("'반복 유형' Select에 매일/매주/매월/매년 옵션이 있어야 한다 (Red)", async () => {
    const user = userEvent.setup();
    wrappedRender(<App />);

    const checkbox = screen.getByLabelText('반복 일정');
    await user.click(checkbox);

    // 옵션 텍스트는 '매일','매주','매월','매년' 이어야 함
    expect(screen.getByRole('option', { name: '매일' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '매주' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '매월' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '매년' })).toBeInTheDocument();
  });
});
