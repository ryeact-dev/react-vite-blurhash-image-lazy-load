import { useState } from 'react';
import { Blurhash } from 'react-blurhash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import style from './style.module.css';

export default function ImageContainer({ image }) {
  const [isLoaded, setLoaded] = useState(false);

  const imgSrc = `http://localhost:4000/${image.name}`;

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className={style.image_container}>
      <LazyLoadImage
        key={imgSrc}
        src={imgSrc}
        height={500}
        width={320}
        onLoad={handleLoad}
      />
      {!isLoaded && (
        <div className={!isLoaded ? style.image_loading : style.image_loaded}>
          <Blurhash
            hash={image.blurhash}
            width={320}
            height={500}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
    </div>
  );
}
