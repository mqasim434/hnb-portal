import {
  buildUnsplashSrcSets,
  isUnsplashImageUrl,
} from '../../utils/unsplashResponsive'

/**
 * Responsive hero/marketing image: AVIF + WebP + JPEG from Unsplash, or plain &lt;img&gt; elsewhere.
 * @param {object} props
 * @param {string} props.src
 * @param {string} props.alt
 * @param {number} props.width — intrinsic width (CLS)
 * @param {number} props.height — intrinsic height (CLS)
 * @param {string} [props.sizes]
 * @param {string} [props.className] — on &lt;picture&gt; / wrapper
 * @param {string} [props.imgClassName] — on &lt;img&gt;
 * @param {boolean} [props.priority] — LCP / above the fold
 */
export default function ResponsivePicture({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  imgClassName,
  priority = false,
}) {
  const loading = priority ? 'eager' : 'lazy'

  if (!isUnsplashImageUrl(src)) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName ?? className}
        sizes={sizes}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    )
  }

  const { avifSrcSet, webpSrcSet, jpegSrcSet, fallbackSrc } =
    buildUnsplashSrcSets(src)

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <source type="image/jpeg" srcSet={jpegSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        srcSet={jpegSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  )
}
