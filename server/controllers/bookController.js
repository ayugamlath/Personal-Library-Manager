const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.saveBook = async (req, res) => {
  const { googleBookId, title, authors, thumbnail, description } = req.body;
  try {
    let book = await Book.findOne({ user: req.user.userId, googleBookId });
    if (book)
      return res.status(400).json({ message: "Book already in library" });

    book = new Book({
      user: req.user.userId,
      googleBookId,
      title,
      authors,
      thumbnail,
      description,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await book.deleteOne();
    res.json({ message: "Book removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBook = async (req, res) => {
  const { personalReview, status } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (personalReview !== undefined) book.personalReview = personalReview;
    if (status !== undefined) book.status = status;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};
