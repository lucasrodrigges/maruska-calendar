import React, { useContext, useState, useEffect } from 'react';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import {
  ref, uploadBytes, listAll, getDownloadURL,
} from 'firebase/storage';

import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { EMAIL_RGX } from '../helpers/data';
import { app, storage } from '../services/firebase';
import { UserContext } from '../context/UserProvider';

export default function ProfileEdit() {
  const {
    userEdit,
    setUserEdit,
    toUpdateProfile, setUpdateProfile,
  } = useContext(UserContext);

  const [urlList, setUrlList] = useState([]);

  const navigate = useNavigate();

  const auth = getAuth(app);
  const imagesListRef = ref(storage, 'userImages/');

  useEffect(() => {}, [userEdit]);

  useEffect(() => {
    if (urlList.length) {
      const userURL = urlList.find((url) => url.includes(userEdit.uid));
      updateProfile(auth.currentUser, { photoURL: userURL })
        .then(() => setUserEdit({
          ...userEdit,
          photoURL: userURL,
        }));
    }
  }, [urlList]);

  function handleChange({ target: { name, value } }) {
    if (name === 'email' && EMAIL_RGX.test(value)) {
      setUserEdit({
        ...userEdit,
        [name]: value,
      });
    } if (name !== 'email') {
      setUserEdit({
        ...userEdit,
        [name]: value,
      });
    }
  }

  function getImage({ target: { files } }) {
    const imageRef = ref(storage, `userImages/${userEdit.uid + v4()}`);
    uploadBytes(imageRef, files[0])
      .then(() => {
        listAll(imagesListRef).then((res) => {
          res.items.forEach((item) => {
            getDownloadURL(item).then((url) => {
              setUrlList([...urlList, url]);
            });
          });
        });
      });
  }

  function delProfileImage() {
    updateProfile(auth.currentUser, { photoURL: '' })
      .then(() => setUserEdit({
        ...userEdit,
        photoURL: '',
      }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { displayName, email, photoURL } = userEdit;

    if (displayName) {
      updateProfile(auth.currentUser, {
        displayName,
      }).then();
    } if (email) {
      updateEmail(auth.currentUser, email).then();
    } if (photoURL) {
      const imageRef = ref(storage, `userImages/${userEdit.uid}`);
      uploadBytes(imageRef, photoURL)
        .then(() => {
          listAll(imagesListRef).then((res) => {
            res.items.forEach((item) => {
              getDownloadURL(item).then((url) => {
                setUrlList([...urlList, url]);
              });
            });
          });
        });
    }
    setUpdateProfile(!toUpdateProfile);
    navigate(-1);
  }

  return (
    <div>
      <Header />

      <form action="profileEdit" onSubmit={handleSubmit}>
        {userEdit?.photoURL && (
          <div>
            <img src={userEdit.photoURL} alt="Foto do usuário" width="100px" />
            <button type="button" onClick={delProfileImage}>Remover foto</button>
          </div>
        )}
        <input
          type="file"
          name="photoURL"
          onChange={getImage}
        />
        <input
          className="input-1"
          type="text"
          name="displayName"
          placeholder={userEdit?.displayName || 'Nome'}
          onChange={handleChange}
        />
        <input
          className="input-1"
          type="text"
          name="email"
          placeholder={userEdit?.email || 'Email'}
          onChange={handleChange}
        />
        <button
          className="button-1"
          type="submit"
        >
          Editar
        </button>
      </form>
      <Footer />
    </div>
  );
}
