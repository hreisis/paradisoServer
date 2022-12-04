const express = require('express');
const Tea = require('../models/tea');
const authenticate = require('../authenticate');
const cors = require('./cors');

const teaRouter = express.Router();

const middleware = (req, res, next) => {
    console.log("Router test succeed!");
    next();
  };

teaRouter.route('/')

.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Tea.find()
    .populate('comments.author')
    .then(teas => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(teas);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tea.create(req.body)
    .then(tea => {
        console.log('Tea Created ', tea);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tea);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /teas');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tea.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

teaRouter.route('/:teaId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Tea.findById(req.params.teaId)
    .populate('comments.author')
    .then(tea => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tea);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /teas/${req.params.teaId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tea.findByIdAndUpdate(req.params.teaId, {
        $set: req.body
    }, { new: true })
    .then(tea => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tea);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Tea.findByIdAndDelete(req.params.teaId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = teaRouter;