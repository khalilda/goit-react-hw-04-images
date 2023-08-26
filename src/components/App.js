import { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import s from './App.module.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchHitsByQuery } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';      


export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const onSubmit = query => {

    setQuery(query.target.setSearch);
    setIsLoading(true);
    setImages([]);
    setPage(1);
  };

  const onNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onModalClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  useEffect(() => {
    if (!query) return;

    const fetchGallery = async searchQuery => {
        try {
          const response = await fetchHitsByQuery(searchQuery, page);
   if (response.length === 0) {
            Notify.failure('No matches found!');
  return
          }
          setImages(prevState => [...prevState, ...response]);
   setShowBtn(response.length >= 12);
  
         
         
        } catch (error) {
          console.log('Error');
        } finally {
          setIsLoading(false);
        }
      };
    fetchGallery(query, page);
  }, [page, query]);

  return (
    <div className={s.App}>
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} onClickImage={onClickImage} />
      {isLoading && <Loader />}
      {showBtn && <Button onNextPage={onNextPage} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onModalClose={onModalClose} />
      )}
    </div>
  );
};
