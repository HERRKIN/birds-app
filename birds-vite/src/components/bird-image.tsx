
import { useEffect, useRef, useState } from "react";

const watermarkCache = new Map<string, string>();

export const WatermarkedBirdImage = ({
  src,
  alt,
  className,
  loadingText,
}: {
  src: string;
  alt: string;
  className?: string;
  loadingText?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [waterrkedSrc, setWaterrkedSrc] = useState(src);

  useEffect(() => {
      const watermark = async (source: string) => {
    try {
        if (watermarkCache.has(source)) {
            setWaterrkedSrc(watermarkCache.get(source) || "");
        return;
      }
      const originalImage = await fetch(source);
      if (!originalImage.ok) {
        setIsError(true);
        return;
      }
      const imageBlob = await originalImage.blob();
      const watermarkResponse = await fetch(
        "https://us-central1-copilot-take-home.cloudfunctions.net/watermark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
          },
          body: imageBlob,
        }
      );
      if (!watermarkResponse.ok) {
        console.error("error", { watermarkResponse });
        setIsError(true);
        return;
      }
      const watermarkBlob = await watermarkResponse.blob();
      const url = URL.createObjectURL(watermarkBlob);
      watermarkCache.set(src, url);
      setWaterrkedSrc(url);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
    void watermark(src);
  }, [src]);


  if (isLoading) {
    return (
      <div className="w-full aspect-[168/95] object-cover rounded-md bg-gray-200 animate-pulse flex items-center justify-center relative">
        <span className="text-xl opacity-30">
          {loadingText ? loadingText : "Loading..."} 
        </span> 
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full aspect-[168/95] object-cover rounded-md bg-gray-200 flex items-center justify-center text-red-950 font-bold ">
        <span className="text-xl opacity-30">Image Error</span>
      </div>
    );
  }
  const classNames = className ? className : "aspect-[168/95]";
  return (
    <img
      src={waterrkedSrc}
      alt={alt}
      className={`w-full object-cover rounded-md  ${classNames}`}
    />
  );
};

export const BirdImage = ({
  src,
  alt,
  loadingText,
  className,
}: {
  src: string;
  alt: string;
  loadingText?: string;
  className?: string;
}) => {
  const [visible, setVisible] = useState(false);
  const placeholder = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (placeholder.current) {
      const observer = new IntersectionObserver(([entry], observer) => {
        if(entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
    {
      rootMargin: "500px",
      root: document.getElementById("scrollable-container"),
    });
      observer.observe(placeholder.current);
      return () => observer.disconnect();
    }
  }, [placeholder]);

  const classNames = className ? className : "aspect-[168/95]";

  return (
    <div
      ref={placeholder}
      className={`w-full  object-cover rounded-md bg-gray-200 ${classNames}`}
    >
      {visible ? (
        <WatermarkedBirdImage
          src={src}
          alt={alt}
          className={classNames}
          loadingText={loadingText}
        />
      ) : (
        <div className="w-full aspect-[168/95] object-cover rounded-md bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
};
