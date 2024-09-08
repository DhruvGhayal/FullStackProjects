const express = require('express');
const httpStatusCode = require('http-status-codes')
const router = express.Router();
const user = require('../models/user.model')

router.get('/', (req, resp)=>{
            user.find().then(docs=>{
                resp.send(docs)
            }).catch(err=>{
                resp.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
            })
        })
        .get('/:id', (req, resp)=>{
            let id = req.params.id;
            user.findById(id).then(docs=>{
                resp.send(docs)
            }).catch(err=>{
                resp.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
            })
        })
        .post('/', (req, resp)=>{
            const obj = req.body;
            user.create(obj).then(docs=>{
                resp.status(httpStatusCode.CREATED).send(docs)
            }).catch(err=>{
                resp.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
            })
        })
        .put('/:id', (req, resp)=>{
            let id = req.params.id
            const obj = req.body;
            user.findByIdAndUpdate(id,
                {
                name:obj.anme,
                contact:obj.contact,
                address:obj.address
                }
                ).then(docs=>{
                resp.status(httpStatusCode.CREATED).send(docs)
            }).catch(err=>{
                resp.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
            })
        })
        .delete('/:id', (req, resp)=>{
            let id = req.params.id;
            user.findByIdAndDelete(id).then(docs=>{
                resp.status(httpStatusCode.OK).send(docs)
            }).catch(err=>{
                resp.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(err);
            })
        })
    


module.exports = router;
