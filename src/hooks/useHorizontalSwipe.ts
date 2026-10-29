"use client";

import { useCallback, useRef, type MouseEvent, type TouchEvent } from "react";

const SWIPE_THRESHOLD = 48;

export function useHorizontalSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  const onSwipeLeftRef = useRef(onSwipeLeft);
  const onSwipeRightRef = useRef(onSwipeRight);
  onSwipeLeftRef.current = onSwipeLeft;
  onSwipeRightRef.current = onSwipeRight;

  const onTouchStart = useCallback((event: TouchEvent) => {
    swiped.current = false;
    if (event.touches.length !== 1) {
      start.current = null;
      return;
    }
    const touch = event.touches[0];
    start.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback((event: TouchEvent) => {
    if (!start.current) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.current.x;
    const dy = touch.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    swiped.current = true;
    if (dx < 0) onSwipeLeftRef.current();
    else onSwipeRightRef.current();
  }, []);

  const onClickCapture = useCallback((event: MouseEvent) => {
    if (!swiped.current) return;
    event.preventDefault();
    event.stopPropagation();
    swiped.current = false;
  }, []);

  return { onTouchStart, onTouchEnd, onClickCapture };
}
