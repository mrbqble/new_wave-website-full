const Router = require('express');
const Event = require('../models/Event');
const router = new Router();

router.post('/events',
    async (req, res) => {
        try {
            const year = new Date();
            const event = await Event.find();
            return res.json(
                event?.filter(item => {
                    date = item.date.split("-");
                    if (year.getFullYear() <= date[0] || (year.getMonth() + 1) <= date[1] && year.getDate() <= date[2]){
                        console.log(item);
                    }
                    return year.getFullYear() <= date[0] || (year.getMonth() + 1) <= date[1] && year.getDate() <= date[2];
                }))
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/allEvents',
    async (req, res) => {
        try {
            const event = await Event.find();
            return res.json(event);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post("/createEvent",
    async (req, res) => {
        try {
            const event = new Event(req.body.item);
            const events = await Event.find();
            event.number = events.length + 1;
            event.attended = [];
            event.status = "New";
            await event.save();
            return res.json({message: "Event was created"});
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/attend',
    async (req, res) => {
        try {
            const {email, _id} = req.body;
            const event = await Event.findOne({_id});
            event.attended = [...event.attended, email];
            await event.save();
            return res.json({message: 'User attended'});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
);

router.post('/leave',
    async (req, res) => {
        try {
            const {email, _id} = req.body;
            const event = await Event.findOne({_id});
            event.attended = event.attended.filter(item => item.email !== email);
            await event.save();
            return res.json({message: 'User left'});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
);

module.exports = router;