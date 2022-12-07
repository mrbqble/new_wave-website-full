const Router = require('express');
const User = require('../models/User');
const Event = require('../models/Event');
const Report = require('../models/Report');
const Country = require('../models/Country');
const University = require('../models/University');
const router = new Router();

router.post('/reports',
    async (req, res) => {
        try {
            const report = await Report.find({});
            return res.json(report);
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

router.post('/report', 
    async (req, res) => {
        try {
            const {eventID, attended} = req.body;
            const candidate = await Report.findOne({eventID});
            const _id = eventID;
            const event = await Event.findOne({_id});

            if (candidate) {
                return res.json({message: `Report with id ${eventID} already exist`});
            };
            
            attended.map(async (item) => {
                const _id = item;
                const user = await User.findOne({_id});
                if(user) {
                    user.volunteeringHours += parseInt(event.duration);
                }
                console.log(user);
                await user.save();
            });

            const report = new Report(req.body);
            await report.save();

            return res.json({message: "Report was created"});
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
)

router.post('/university',
    async (req, res) => {
        try {
            const uni = new University(req.body)
            await uni.save();
            return res.json({message: "University was created"})
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
);

router.post('/addEdu',
    async (req, res) => {
        try {
            const {name, city, school, college} = req.body;
            let country = await Country.findOne({name});
            if (!country) {
                country = new Country(req.body);
            }
            if (city && !country.cities.find(item => item.name === city)) {
                country.cities = [...country.cities, {name: city, schools: []}];
            }
            if (school && !country.cities.find(item => item.name === city).schools.find(item => item === school)) {
                country.cities.find(item => item.name === city).schools = [school, ...country.cities.find(item => item.name === city).schools];
            }
            if (college && !country.colleges.find(item => item === college)) {
                country.colleges = [college, ...country.colleges];
            }
            await country.save();
            return res.json({message: "Education was added"})
        } catch (error) {
            res.send({message: 'Server error'});
        }
    }
);

router.post('/education',
    async (req, res) => {
        try {
            const education = await Country.find();
            const university = await University.find();
            return res.json({countries: education, universities: university});
        } catch (error) {
            res.send({message: 'Server error'});
        };
});

module.exports = router;