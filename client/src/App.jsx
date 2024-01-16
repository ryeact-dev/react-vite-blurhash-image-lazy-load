import { useEffect, useState } from 'react';
import ImageContainer from './components/Image';
import style from './App.module.css';

export default function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch('http://localhost:4000/images');
      const data = await response.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  return (
    <main className={style.container}>
      <h1>Blur Image Lazy Loading </h1>
      <div className={style.image_wrapper}>
        {images.map((image) => (
          <ImageContainer key={image.name} image={image} />
        ))}
      </div>
    </main>
  );
}
