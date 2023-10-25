import express from "express";
import { Book } from '../models/bookModel.js';

const router = express.Router();

// ----------------- route for Save a new book -----------------

router.post('/', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Please provide all required fields: title, author, year published"
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// ----------------- Route to Get All Books from DB -----------------
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

// ----------------- Route to Get ONE Book from DB by id -----------------
router.get('/:id', async (request, response) => {
    try {
        
        const { id } = request.params;
        const book = await Book.findById(id);
        
        return response.status(200).json(book);
    }   
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
}); 

// ----------------- route for UPDATE/PUT Book -----------------

router.put('/:id', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Please provide all required fields: title, author, year published"
            });
        } 

        const { id } = request.params;
         
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({message: "book not found"});
        }
        return response.status(200).send({message: "Success! Your book was updated."})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
}); 

// ----------------- route for DELETE Book -----------------
router.delete('/:id', async (request, response) => {
    try {
        
        const { id } = request.params;
        const results = await Book.findByIdAndDelete(id);
        
        if(!results){
            return response.status(404).json({message: "Book not found"});
        }
        return response.status(200).send({message: "You have deleted that book."});
    }   
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

export default router;
