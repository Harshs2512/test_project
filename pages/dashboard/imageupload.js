import axios from 'axios';
import { CldImage } from 'next-cloudinary';
import { useState } from 'react';
import { getCldOgImageUrl } from 'next-cloudinary';
import { Form } from 'react-bootstrap';

export default function UploadForm() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleChangeThumbnail = (e) => {
        setImage(e.target.files[0]);
    };
    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'gas10okj');

        setLoading(true);
        const res = await axios.post('/api/uploadimage', data);
        const file = await res.data;
        console.log(file.url);
        setLoading(false);
    };

    getCldOgImageUrl({
        src: 'v1710075945',
        overlays: [
            {
                publicId: 'v1710075945',
                position: {
                    x: 0,
                    y: 0,
                    gravity: 'north_east',
                },
                effects: [
                    {
                        crop: 'fill',
                        gravity: 'auto',
                        width: '0.33',
                        height: '1.0'
                    }
                ],
                flags: ['relative']
            },
            {
                width: 700,
                crop: 'fit',
                text: {
                    color: 'black',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 80,
                    fontWeight: 'bold',
                    text: '<Your Text>'
                },
                position: {
                    x: 50,
                    y: -50,
                    gravity: 'west',
                },
            },
            {
                width: 700,
                crop: 'fit',
                text: {
                    color: 'black',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 40,
                    text: '<Your Text>'
                },
                position: {
                    x: 50,
                    y: 50,
                    gravity: 'west',
                },
            },
        ]
    });

    return (
        <div>
            <Form.Group className="mb-5">
                <Form.Label htmlFor="postTitle">Thumbnail</Form.Label>
                <Form.Control
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChangeThumbnail}
                    autoFocus
                />
            </Form.Group>
            <button onClick={uploadImage}>
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            <CldImage
                width="960"
                height="600"
                src="v1710075818/logo_uwghu5.jpg"
                sizes="100vw"
                alt="Description of my image"
            />
            <CldImage
                width="960"
                height="600"
                src="v1710075945/course-grunt_nrd6uq.jpg"
                sizes="100vw"
                alt="Description of my image"
            />
            <CldImage
                width="960"
                height="600"
                src="v1710075945/course-grunt_nrd6uq.jpg"
                sizes="100vw"
                alt="Description of my image"
            />
        </div>
    );
}
