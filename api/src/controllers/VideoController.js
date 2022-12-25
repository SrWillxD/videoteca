const {response}=require("express");
const {v4 : uuid} =require("uuid")
const Video = require("../models/Video");

module.exports = {
    async index(request, response){
        try{
            const videos= await Video.find();
            return response.status(200).json({videos});
        }catch(error){
            response.status(500).json({error: error.message});
        }
    },

    async store(request, response){
        const {tittle, link}=request.body;
        if(!tittle || !link){
            return response.status(400).json({error:"Missing tittle or link!"});
        }
        const video = new Video({
            _id : uuid(),
            tittle,
            link,
            liked: false
        })
        try{
            await video.save();
            return response.status(201).json({message:"Video added succesfully!"})
        }catch(error){
            response.status(400).json({error: error.message})
        }
    },

    async update(request,response){
        const {tittle,link}=request.body;

        if(!tittle && !link){
            return response.status(400).json({error: "You must inform a new tittle or a new link!"})
        }

        if(tittle){
            response.video.tittle = tittle;
        }

        if(link){
            response.video.link = link;
        }

        try{
            await response.video.save();
            return response.status(200).json({message: "Video updated successfully!"})
        }catch(error){
            response.status(500).json({error: error.message})
        }
    },

    async delete(request,response){
        try{
            await response.video.remove();
            return response.status(200).json({message: "Video deleted successfully!"})
        }catch(error){
            return response.status(500).json({error: error.message});
        }
    },

    async updateLike(request, response){
        response.video.liked = !response.video.liked;
        try{
            await response.video.save();
            return response.status(200).json({message: `Video ${response.video.liked ? "Liked":"unliked"} successfully!`})
        }catch(error){
            return response.status(400).json({error: error.message});
        }
    }
};