"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrushCleaningIcon } from "lucide-react";

type SignatureInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  strokeWidth?: number;
  className?: string;
};

const DEFAULT_HEIGHT = 160;
const DEFAULT_PEN_COLOR = "#0f172a";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const DEFAULT_STROKE_WIDTH = 2;

export const SignatureInput = ({
  value = "",
  onChange,
  disabled = false,
  height = DEFAULT_HEIGHT,
  penColor = DEFAULT_PEN_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
}: SignatureInputProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = React.useRef(false);
  const activePointerId = React.useRef<number | null>(null);
  const lastSizeRef = React.useRef({ width: 0, height: 0 });

  const getContext = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const clearCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;

    const { width, height } = lastSizeRef.current;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(
      window.devicePixelRatio || 1,
      0,
      0,
      window.devicePixelRatio || 1,
      0,
      0,
    );
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }, [backgroundColor, getContext]);

  const drawImageFromValue = React.useCallback(
    (nextValue: string) => {
      const canvas = canvasRef.current;
      const ctx = getContext();
      if (!canvas || !ctx) return;

      clearCanvas();

      if (!nextValue) return;

      const image = new Image();
      image.onload = () => {
        const { width, height } = lastSizeRef.current;
        ctx.drawImage(image, 0, 0, width, height);
      };
      image.src = nextValue;
    },
    [clearCanvas, getContext],
  );

  const resizeCanvas = React.useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!container || !canvas || !ctx) return;

    const width = Math.max(1, Math.floor(container.clientWidth));
    const heightPx = Math.max(1, Math.floor(height));
    const dpr = window.devicePixelRatio || 1;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(heightPx * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${heightPx}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    lastSizeRef.current = { width, height: heightPx };
    drawImageFromValue(value);
  }, [drawImageFromValue, getContext, height, value]);

  React.useEffect(() => {
    resizeCanvas();

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => resizeCanvas());
    observer.observe(container);

    return () => observer.disconnect();
  }, [resizeCanvas]);

  React.useEffect(() => {
    drawImageFromValue(value);
  }, [drawImageFromValue, value]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    if (event.button !== 0) return;
    const canvas = canvasRef.current;
    const ctx = getContext();
    if (!canvas || !ctx) return;

    const { x, y } = getPoint(event);
    activePointerId.current = event.pointerId;
    isDrawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || event.pointerId !== activePointerId.current) {
      return;
    }

    const ctx = getContext();
    if (!ctx) return;

    const { x, y } = getPoint(event);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const finishStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || event.pointerId !== activePointerId.current) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    isDrawingRef.current = false;
    activePointerId.current = null;
    canvas.releasePointerCapture(event.pointerId);
    onChange?.(canvas.toDataURL("image/png"));
  };

  const handleClear = () => {
    if (disabled) return;
    clearCanvas();
    onChange?.("");
  };

  return (
    <div className={cn(className)}>
      <div
        ref={containerRef}
        className={cn(
          "rounded-md border bg-background relative",
          disabled && "opacity-60",
        )}
      >
        <canvas
          ref={canvasRef}
          className={cn(
            "block w-full rounded-md",
            disabled ? "cursor-not-allowed" : "cursor-crosshair",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
        />
        <div className="absolute right-2 bottom-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={handleClear}
            disabled={disabled}
          >
            <BrushCleaningIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
