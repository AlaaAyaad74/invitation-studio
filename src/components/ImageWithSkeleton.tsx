"use client";

import Image, { type ImageProps } from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type SyntheticEvent,
} from "react";

type SharedProps = {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  skeletonClassName?: string;
  cover?: boolean;
  wrapperProps?: HTMLAttributes<HTMLSpanElement>;
};

type NextImageWithSkeletonProps = SharedProps &
  Omit<ImageProps, "src" | "alt" | "className"> & {
    native?: false;
  };

type NativeImageWithSkeletonProps = SharedProps & {
  native: true;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  draggable?: boolean;
  style?: CSSProperties;
};

export type ImageWithSkeletonProps =
  | NextImageWithSkeletonProps
  | NativeImageWithSkeletonProps;

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`image-skeleton block ${className}`} />;
}

export default function ImageWithSkeleton(props: ImageWithSkeletonProps) {
  const {
    src,
    alt,
    className = "",
    wrapperClassName = "",
    skeletonClassName = "",
    cover = false,
    wrapperProps,
  } = props;

  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fill = !props.native && "fill" in props && Boolean(props.fill);
  const isCover = fill || cover;

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    const image = imgRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const markLoaded = (event?: SyntheticEvent<HTMLImageElement, Event>) => {
    setLoaded(true);
    if (!props.native && "onLoad" in props && props.onLoad && event) {
      props.onLoad(event);
    }
  };

  const imageClassName = [
    "transition-opacity duration-500 motion-reduce:transition-none",
    loaded ? "opacity-100" : "opacity-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      {...wrapperProps}
      className={[
        "overflow-hidden",
        isCover ? "block size-full" : "relative block",
        wrapperClassName,
        wrapperProps?.className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={!loaded}
    >
      {loaded ? null : (
        <span
          aria-hidden
          className={[
            "image-skeleton pointer-events-none absolute inset-0 z-[1]",
            isCover ? "" : "min-h-48",
            skeletonClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      )}

      {props.native ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={imageClassName}
          width={props.width}
          height={props.height}
          loading={props.loading}
          fetchPriority={props.fetchPriority}
          draggable={props.draggable}
          style={props.style}
          onLoad={() => markLoaded()}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          className={imageClassName}
          onLoad={markLoaded}
          {...(fill
            ? {
                fill: true as const,
                sizes: props.sizes,
                priority: props.priority,
                unoptimized: props.unoptimized,
                quality: props.quality,
                style: props.style,
              }
            : {
                width: props.width,
                height: props.height,
                sizes: props.sizes,
                priority: props.priority,
                unoptimized: props.unoptimized,
                quality: props.quality,
                style: props.style,
              })}
        />
      )}
    </span>
  );
}
