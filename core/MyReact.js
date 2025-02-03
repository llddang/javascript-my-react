export default function MyReact() {
  let _root = null;
  let _rootComponent = null;
  let _hooks = [],
    _currentHookIdx = 0;

  /**
   * React 컴포넌트를 렌더링하기 위한 루트를 생성
   * @param {HTMLElement} root - 렌더링할 DOM 요소
   * @returns {Object} render 메서드를 포함한 객체 반환
   */
  function createRoot(root) {
    _root = root;
    return { render };
  }

  /**
   * 컴포넌트를 루트 요소에 렌더링
   * @param {Function} Component - 렌더링할 컴포넌트
   */
  function render(Component) {
    _rootComponent = Component;
    _render();
  }

  /**
   * 실제 DOM 업데이트를 처리하는 내부 렌더링 함수
   * 렌더링 후 훅 인덱스를 초기화
   */
  function _render() {
    const comp = _rootComponent();
    _root.innerHTML = comp;
    _currentHookIdx = 0;
  }

  /**
   * useState 훅 구현
   * @param {any} initialValue - 초기 상태값 또는 초기값을 반환하는 함수
   * @returns {Array} 현재 상태와 상태 변경 함수를 포함하는 배열
   */
  function useState(initialValue) {
    _hooks[_currentHookIdx] =
      _hooks[_currentHookIdx] ??
      (typeof initialValue === "function" ? initialValue() : initialValue);

    const hookIdx = _currentHookIdx;
    function setState(newValue) {
      if (typeof newValue === "function")
        _hooks[hookIdx] = newValue(_hooks[hookIdx]);
      else _hooks[hookIdx] = newValue;
      _render();
    }

    return [_hooks[_currentHookIdx++], setState];
  }

  /**
   * useEffect 훅 구현
   * @param {Function} callback - 실행될 효과 콜백 함수
   * @param {Array} depArray - 의존성 배열
   */
  const useEffect = (callback, depArray) => {
    const hasNoDeps = !depArray;
    const prevDeps = _hooks[_currentHookIdx]?.deps;
    const prevCleanUp = _hooks[_currentHookIdx]?.cleanUp;

    const hasChangedDeps = prevDeps
      ? !depArray.every((el, i) => el === prevDeps[i])
      : true;

    if (hasNoDeps || hasChangedDeps) {
      if (prevCleanUp) prevCleanUp();
      const cleanUp = callback();
      _hooks[_currentHookIdx] = { deps: depArray, cleanUp };
    }
    _currentHookIdx++;
  };

  return { createRoot, render, useState, useEffect };
}

export const { createRoot, render, useState, useEffect } = MyReact();
