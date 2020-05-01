const dataModel = require('../../../models/lead_model');
const apiController = {};
apiController.getLeadById = (req, res)=>{
    console.log("getLeadById Called");
    let leadId = req.params.lead_id;
    leadId = leadId.replace(/^[^\d]+/, "");
    if (leadId == "") leadId = "1";
    dataModel.findOne({lead_id: leadId}, (err, data)=>{
        if (err){
            return res.status(400).send(
                {
                    "status": "failure",
                    "reason": err
                }
            );
        } else {
            if (data === null){
                return res.status(404).send({});
            }
            return res.status(200).send({
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "mobile": data.mobile,
                    "email": data.email,
                    "location_type": data.location_type,
                    "location_string": data.location_string,
                    "status": data.status
            });
        }
    });
}

apiController.createLead = (req, res) =>{
    console.log("createLead Called");
    const data = req.body;
    console.log(data);
    data.status = "Created";
    dataModel.findOne({}).sort([['lead_id', -1]]).exec((err, response)=>{
        if (response == null){
            data["lead_id"] = 1;
        } else {
            data["lead_id"] = response.lead_id + 1;
        }
        const document = new dataModel(data);
        document.save((err, resp)=>{
            if (err) {
                return res.status(400).send({
                        "status": "failure",
                        "reason": err
                });
            } else {
                delete data["lead_id"];
                return res.status(201).send(data);
            }
        });
    });
    
}

apiController.updateLead = (req, res) =>{
    console.log("updateLead Called");
    const data = req.body;
    let leadId = req.params.lead_id;
    leadId = leadId.replace(/^[^\d]+/, "");
    if (leadId == "") leadId = "1";
    console.log(data);
    data.status = "Created";
    dataModel.findOneAndUpdate({lead_id: leadId}, data, (err, resp)=>{
        if (err) {
            return res.status(400).send({
                "status": "failure",
                "reason": "explanation" 
            });
        } else {
            return res.status(202).send({
                "status": "success"
            });
        }
    });
}

apiController.removeLead = (req, res) => {
    console.log("removeLead Called");
    let leadId = req.params.lead_id;
    leadId = leadId.replace(/^[^\d]+/, "");
    if (leadId == "") leadId = "1";
    dataModel.deleteOne({lead_id: leadId}, (err, resp)=>{
        if (err){
            return res.status(400).send({
                    "status": "failure",
                    "reason": err
            });
        } else {
            return res.status(204).send({
                "status": "success"
            });
        }
    });
}

apiController.markLead = (req, res) => {
    console.log("markLead Called");
    const commObject = req.body;
    let leadId = req.params.lead_id;
    leadId = leadId.replace(/^[^\d]+/, "");
    if (leadId == "") leadId = "1";
    dataModel.findOne({lead_id: leadId}, (err, resp)=>{
        if (err) {
            return res.status(400).send({
                "status": "failure",
                "reason": "explanation" 
            });
        } else {
            if (resp === null){
                return res.status(400).send({
                    "status": "failure",
                    "reason": "explanation" 
                });
            }
            resp.status = "Contacted";
            resp.communication = commObject.communication;
            dataModel.updateOne({lead_id: leadId}, resp, (err, data)=>{
                if (err) {
                    return res.status(400).send({
                        "status": "failure",
                        "reason": "explanation" 
                    });
                } else {
                    return res.status(202).send({
                        "status": "success"
                    });
                }
            })
        }
    });
}
module.exports = apiController;