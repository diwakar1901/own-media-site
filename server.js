const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

let news = [];

app.get('/api/news', (req, res) => {
    res.json(news);
});

app.post('/api/upload', upload.fields([{ name: 'image' }, { name: 'audio' }, { name: 'video' }]), (req, res) => {
    const { title, content } = req.body;
    const image = req.files.image ? `/uploads/${req.files.image[0].filename}` : '';
    const audio = req.files.audio ? `/uploads/${req.files.audio[0].filename}` : '';
    const video = req.files.video ? `/uploads/${req.files.video[0].filename}` : '';

    news.push({ title, content, image, audio, video });
    res.status(201).send('News uploaded successfully');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
