var express = require('express');
var router = express.Router();

//var authentication_mdl = require('../middlewares/authentication'); 
var session_store;

router.get('/', /*authentication_mdl.is_login,*/ function(req, res, next){
    req.getConnection(function(err, connection){
        var query = connection.query('SELECT * FROM tb_event order by id desc', function(err, rows){
            if(err)
            var errornya = ("Error Selecting : %s ", err);
            req.flash('msg_error', errornya);
            res.render('todo/list', {title: "To Do", data: rows, session_store: req.session});
        });
    });
});
module.exports = router;

router.post('/add', /*authentication_mdl.is_login,*/ function(req, res, next){
    req.assert('event', 'Please fill the Item').notEmpty();
    var errors = req.validationErrors();
    if(!errors){
        v_event = req.sanitize('event').escape().trim();
        v_status = req.sanitize('status').escape().trim();
        v_dates = req.sanitize('dates').escape().trim();

        var todo = {
            event: v_event,
            status:v_status,
            dates: v_dates,
        }

        var insert_sql = 'INSERT INTO tb_event SET ?';
        req.getConnection(function(err, connection){
            var query = connection.query(insert_sql, todo, function(err, result){
                if(err){
                    var errors_detail = ("Error Insert : %s ", err);
                    req.flash('msg_error', errors_detail);
                    res.render('todo/list', {
                        event: req.param('event'),
                       
                    });
                } else{
                    req.flash('msg_info', 'Create Event success');
                    res.redirect('/todos');
                }
            });
        });
    } else{
        console.log(errors);
        errors_detail = "Sorry there are errors <ul>";
        for(i in errors) {
            error = errors[i];
            errors_detail += '<li>'+error.msg+'</li>';
        }
        errors_detail += "</ul>";
        req.flash('msg_error', errors_detail);
        res.render('todo/list', {
            event: req.param('event'),
           
        });
    }
});

router.put('/edit/(:id)', /*authentication_mdl.is_login,*/ function(req, res, next){
    var errors = req.validationErrors();
    if(!errors){
        v_event = req.sanitize('event').escape().trim();
        v_status = req.sanitize('status').escape().trim();
        v_dates = req.sanitize('dates').escape().trim();

        var todo = {
            event: v_event,
            status:v_status,
            dates: v_dates,
        }

        var update_sql = 'UPDATE tb_event SET ? WHERE id='+req.params.id;
        req.getConnection(function(err, connection){
            var query = connection.query(update_sql, todo, function(err, result){
                
                res.redirect('/todos');
                
            });
        });
    }
});

router.delete('/delete/(:id)', /*authentication_mdl.is_login,*/ function(req, res, next){
    req.getConnection(function(err, connection){
        var todo = {
            id: req.params.id,
        }

        var delete_sql = 'DELETE FROM tb_event WHERE ?';
        req.getConnection(function(err, connection){
            var query = connection.query(delete_sql, todo, function(err, result){
                
                res.redirect('/todos');
                
            });
        });
    });
});
router.delete('/clear', /*authentication_mdl.is_login,*/ function(req, res, next){
    req.getConnection(function(err, connection){

        var delete_sql = 'TRUNCATE tb_event';
        req.getConnection(function(err, connection){
            var query = connection.query(delete_sql, function(err, result){
            
                res.redirect('/todos');
                
            });
        });
    });
});
