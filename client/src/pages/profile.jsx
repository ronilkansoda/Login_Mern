import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase'

export default function profile() {
  const fileRef = useRef(null)
  const { currentUser } = useSelector(state => state.user)

  const [image, setImage] = useState(undefined)
  const [imageProgress, setImagePercent] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [formData, setFormData] = useState({})
  useEffect(() => {
    if (image) {
      handleFileUpload(image)
    }
  }, [image])

  console.log(formData)
  const handleFileUpload = async (image) => {
    // console.log(image)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, image)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`);
        setImagePercent(Math.round(progress))
      });
    (error) => {
      setImageError(true)
      console.error('Upload failed:', error);
    }
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setFormData((prevFormData) => ({
          ...prevFormData,
          profilePhoto: downloadURL
        }));
        console.log('Updated formData:', formData)
      });
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <img src={formData.profilePhoto || currentUser.profilePhoto} alt="Profile" className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2" onClick={() => fileRef.current.click()} />

        <p className="text-sm text-center">
          {imageError ? (
            <span className="text-red-700"> Error uploading image (file size must be less than 2 MB)</span>
          ) : imageProgress > 0 && imageProgress < 100 ? (
            <span className="text-slate-700">{`Uloading : ${imageProgress} %`}</span>
          ) : imageProgress === 100 ? (
            <span className="text-green-700">Image Uploaded successfully</span>
          ) : ('')

          }
        </p>

        <input defaultValue={currentUser.username} type="text" id="username" placeholder="username " className="bg-slate-100 rounded-lg p-3" />

        <input defaultValue={currentUser.email} type="email" id="email" placeholder="email " className="bg-slate-100 rounded-lg p-3" />

        <input type="password" id="password" placeholder="password " className="bg-slate-100 rounded-lg p-3" />

        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Update</button>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer" >Delete Account</span>
          <span className="text-red-700 cursor-pointer" >Sign Out</span>
        </div>
      </form>
    </div>
  )
}
