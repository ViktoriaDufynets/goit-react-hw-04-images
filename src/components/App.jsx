import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { imagesApi } from './serviceApi';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

import ModalR from './ModalR/ModalR';

export const App = () => {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalR, setShowModalR] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

  const maxPage = Math.ceil(totalImages / 12);
  const showButton = images.length > 0 && page < maxPage;

 useEffect(() => {
  if (query === '') {
    return;
  };
    async function newSearchRequestServer() {
      try {
        const response = await imagesApi({ query, page });
        const totalImages = response.data.totalHits;
        const images = response.data.hits.map(hit => ({
        id: hit.id,
        description: hit.tags,
        smallImage: hit.webformatURL,
        largeImage: hit.largeImageURL,
      }));
      setImages(prevState => [...prevState, ...images]);
      setTotalImages(totalImages);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  setIsLoading(true);
  newSearchRequestServer();

}, [query, page]);


  const getSearchRequest = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);

  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };
  const toggleModalR = () => {
    setShowModalR(prevShowModalR => !prevShowModalR);
    console.log(showModalR)
  };

  const openModal = e => {
    const currentImageUrl = e.target.dataset.large;
    const currentImageDescription = e.target.alt;

    if (e.target.nodeName === 'IMG') {
      setShowModal(( showModal ) => ({
        showModal: !showModal,
        currentImageUrl: setCurrentImageUrl(currentImageUrl),
        currentImageDescription: setCurrentImageDescription(currentImageDescription),
      }));
    }
  };

    return (
      <div className={css.App}>
        <Searchbar onSubmit={getSearchRequest} />
        {images  &&<ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}
        {showButton && <Button onNextFetch={onNextFetch} />}

        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        {totalImages===0 && query.length > 0 &&(
          <ModalR
            onClose={toggleModalR}
          />
        )}
          <ToastContainer />
      </div>
    );
  }


