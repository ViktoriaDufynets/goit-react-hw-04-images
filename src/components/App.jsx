import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';

import ModalR from './ModalR/ModalR';

export const App = () => {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalR, setShowModalR] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageDescription, setCurrentImageDescription] = useState(null);

 useEffect(() => {
  if (query === '') {
    return;
  };
  const KEY = "34461243-d0245d06d5a649c5dc9c3b27c";
  const BASE_URL = "https://pixabay.com/api/"
  const FILTER = "&image_type=photo&orientation=horizontal&safesearch=true&per_page=12";
  const URL = `${BASE_URL}?key=${KEY}&q=${query}${FILTER}&page=${page}`;

  setTimeout(() => {
    fetch(URL).then(res => res.json()).then(({ hits, totalHits }) => {
      const totalImages = totalHits;
      const images = hits.map(hit => ({
        id: hit.id,
        description: hit.tags,
        smallImage: hit.webformatURL,
        largeImage: hit.largeImageURL,
      }));
      console.log(hits);
      setImages(images);
      setTotalImages(totalImages);
      imagesOnPage = setImagesOnPage(images.length);
    }).catch(error => ( error ))
    .finally(setIsLoading(false));
  }, 3000)


    setIsLoading(true);
 }, [query, page])


  const getSearchRequest = query => {
    setQuery(query);
  };

  const onNextFetch = () => {
    setPage(prevState => prevState + 1);
    setImages(prevState => [...prevState, ...images]);
    setImagesOnPage(imagesOnPage + images.length);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };
  const toggleModalR = () => {
    setShowModalR(prevShowModalR => !prevShowModalR);
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
        {images && <ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}
        {imagesOnPage >= 12 && imagesOnPage < totalImages && !isLoading &&(
          <Button  onNextFetch={onNextFetch} />
        )}
 {/* onClick={notify} */}
        {showModal && (
          <Modal
            onClose={toggleModal}
            currentImageUrl={currentImageUrl}
            currentImageDescription={currentImageDescription}
          />
        )}
        {imagesOnPage === 0 && !isLoading && query.length > 0 &&(
          <ModalR
            onClose={toggleModalR}
          />
        )}
          <ToastContainer />
      </div>
    );
  }


