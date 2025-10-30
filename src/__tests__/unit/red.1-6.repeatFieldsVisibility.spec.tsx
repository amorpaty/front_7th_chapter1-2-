import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'

// Red test: 반복(Repeat) 관련 필드의 가시성
// - 초기 상태에서는 반복 관련 입력(반복 주기, 횟수/종료일 등)이 보이지 않아야 함
// - 사용자가 반복을 활성화하면 해당 입력들이 화면에 보여야 함

describe('red 1-6: 반복 필드 가시성', () => {
  it('초기에는 반복 필드가 보이지 않고, 반복 활성화 시 보인다', async () => {
    render(<App />)
    const user = userEvent.setup()

    // 반복을 토글하는 컨트롤을 찾는다. 구현에 따라 checkbox 또는 select가 될 수 있음.
    // 우선 라벨 텍스트 '반복'을 기준으로 찾는다.
    const repeatToggle = screen.queryByLabelText(/반복/i)

    // 반복 토글이 화면에 존재하는지 확인 (필수 컨트롤)
    expect(repeatToggle).toBeInTheDocument()

    // 반복이 비활성화된 초기 상태에서는 반복 관련 필드들이 보이지 않아야 함
    // 반복 유형(예: '반복 유형', '반복 주기' 등) 라벨을 찾아 존재하지 않음을 확인
    expect(screen.queryByLabelText(/반복 유형|반복 타입|반복 주기/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/간격|횟수|종료일/i)).not.toBeInTheDocument()

    // 사용자가 반복을 활성화한다.
    // 만약 toggle이 checkbox라면 클릭, select라면 change를 시도
    if (repeatToggle?.getAttribute('type') === 'checkbox') {
      await user.click(repeatToggle)
    } else {
      // fallback: 트리거로 엔터를 보내거나 마우스 클릭 시뮬레이션
      await user.click(repeatToggle!)
    }

    // 이제 반복 관련 필드들이 보여야 한다.
    expect(screen.getByLabelText(/반복 유형|반복 타입|반복 주기/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/간격|횟수|종료일/i)).toBeInTheDocument()
  })
})
