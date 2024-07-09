const express = require("express");
const mysql = require("mysql");
const path = require('path');
const moment = require('moment');

const app = express();

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: "localhost",
    database: "proyectonode",
    user: "root",
    password: ""
});

// Configuración de EJS y middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// registro User
app.post("/registrar", function (req, res) {
    const { registroEmail, registroDni } = req.body;

    let search = "SELECT * FROM `user` WHERE email=?";
    conexion.query(search, [registroEmail], function (error, rows) {
        if (error) {
            throw error;
        } else {
            if (rows.length > 0) {
                console.log("El email ya está registrado.");
                res.redirect('/login?error=emailRegistrado');
            } else {
                let toRegister = "INSERT INTO `access_requests`(`email`, `dni`) VALUES (?, ?)";
                conexion.query(toRegister, [registroEmail, registroDni], function (error) {
                    if (error) {
                        throw error;
                    } else {
                        res.redirect('/login?success=registroExitoso');
                    }
                });
            }
        }
    });
});

// iniciar sesión
app.post("/iniciar", function (req, res) {
    const { email, password } = req.body;

    let search = "SELECT `email`, `pass`, `rol`, `id_data` FROM `user` WHERE email =?";
    conexion.query(search, [email], function (error, rows) {
        if (error) {
            throw error;
        } else {
            if (rows.length > 0) {
                if (password === rows[0].pass) {
                    res.render('login', { success: 'loginExitoso', email: rows[0].email, rol: rows[0].rol, error: null });
                } else {
                    res.render('login', { error: 'passIncorrecto', success: null });
                }
            } else {
                res.render('login', { error: 'usuarioNoEncontrado', success: null });
            }
        }
    });
});

// render login
app.get('/login', function (req, res) {
    const error = req.query.error;
    const success = req.query.success;
    res.render('login', { error, success });
});

// render Perfil o redireccionar a cargar datos de usuario
app.get('/perfil', function (req, res) {
    const email = req.query.email;

    let search = "SELECT `email`, `pass`, `rol`, `id_data` FROM `user` WHERE email = ?";
    conexion.query(search, [email], function (error, rows) {
        if (error) {
            throw error;
        } else {
            if (rows.length > 0) {
                let idUser = rows[0].id_data;
                if (idUser !== null) {
                    let query = "SELECT `name`, `surname`, `birthdate`, `schooling`, `commission`, `photo` FROM `user_data` WHERE id_data = ?";
                    conexion.query(query, [idUser], function (error, result) {
                        if (error) throw error;
                        result[0].birthdate = moment(result[0].birthdate).format('DD/MM/YYYY');

                        res.render('perfil', { user: result[0] });
                    });
                } else {
                    res.redirect(`/registro?email=${email}`);
                }
            } else {
                res.redirect('/registro');
            }
        }
    });
});

// render Registro
app.get('/registro', function (req, res) {
    const email = req.query.email;
    res.render('registro', { email });
});

// cargar los datos del usuario
app.post('/dataSave', function (req, res) {
    const email = req.query.email;
    const { nombre, apellido, nacimiento, estudios, comision } = req.body;

    let saveData = "INSERT INTO `user_data`(`name`, `surname`, `birthdate`, `schooling`, `commission`) VALUES (?, ?, ?, ?, ?)";
    let valores = [nombre, apellido, nacimiento, estudios, comision];

    conexion.query(saveData, valores, function (error, result) {
        if (error) {
            throw error;
        } else {
            let idData = result.insertId;
            let update = "UPDATE `user` SET `id_data`=? WHERE `email`=?";
            conexion.query(update, [idData, email], function (error) {
                if (error) {
                    throw error;
                } else {
                    res.redirect(`/perfil?email=${email}`);
                }
            });
        }
    });
});

// render admin
app.get('/admin', function (req, res) {
    
    const accessQuery = 'SELECT * FROM access_requests';
    conexion.query(accessQuery, function (err, accessRequests) {
        if (err) throw err;

        const unsubscribeQuery = 'SELECT * FROM unsubscribe_request';
        conexion.query(unsubscribeQuery, function (err, unsubscribeRequests) {
            if (err) throw err;

            res.render('admin', {
                requests: accessRequests,
                unsubscribeRequests: unsubscribeRequests
            });
        });
    });
});

// aprobar solicitud de alta
app.get('/approve-request/:id', function (req, res) {
    const requestId = req.params.id;

    let query = 'SELECT * FROM access_requests WHERE id = ?';
    conexion.query(query, [requestId], function (err, results) {
        if (err) throw err;

        const request = results[0];

        query = 'INSERT INTO user (email, pass, rol) VALUES (?, ?, ?)';
        conexion.query(query, [request.email, request.dni, 'Student'], function (err, result) {
            if (err) throw err;

            query = 'DELETE FROM access_requests WHERE id = ?';
            conexion.query(query, [requestId], function (err) {
                if (err) throw err;
                res.redirect('/admin');
            });
        });
    });
});

// negar solicitud de alta
app.get('/deny-request/:id', function (req, res) {
    const requestId = req.params.id;

    const query = 'DELETE FROM access_requests WHERE id = ?';
    conexion.query(query, [requestId], function (err) {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// aprobar solicitud de baja
app.get('/approve-unsubscribe/:id', function (req, res) {
    
    const requestId = req.params.id;

    let query = 'SELECT * FROM unsubscribe_request WHERE id_request = ?';
    conexion.query(query, [requestId], function (err, results) {
        if (err) throw err;

        const request = results[0];

        query = 'DELETE FROM unsubscribe_request WHERE id_request = ?';
        conexion.query(query, [requestId], function (err) {
            if (err) throw err;

            query = 'DELETE FROM user WHERE id_user = ?';
            conexion.query(query, [request.id_user], function (err) {
                if (err) throw err;

                query = 'DELETE FROM user_data WHERE id_data = ?';
                conexion.query(query, [request.id_data], function (err) {
                    if (err) throw err;

                    res.redirect('/admin');
                });
            });
        });
    });
});

// registrar profesor
app.post('/registerTeacher', function (req, res) {
    const { email, nombre, apellido, comision } = req.body;

    let dataUser = "INSERT INTO `user_data`(`name`, `surname`, `commission`,`onGroup`) VALUES (?, ?, ?)";
    let valores = [nombre, apellido, comision,true];

    conexion.query(dataUser, valores, function (error, result) {
        if (error) {
            throw error;
        } else {
            const idData = result.insertId;
            const user = "INSERT INTO `user`(`email`, `pass`, `rol`, `id_data`) VALUES (?, ?, ?, ?)";
            conexion.query(user, [email, 'cac2024', 'Teacher', idData], function (err) {
                if (err) throw err;
                res.redirect('/admin');
            });
        }
    });
});

// render armar grupos
app.get('/profesores', function (req, res) {
    const email = req.query.email;

    let search = "SELECT `id_data` FROM `user` WHERE email = ?";
    conexion.query(search, [email], function (error, rows) {
        if (error) {
            throw error;
        } else {
            if (rows.length > 0) {
                let idUser = rows[0].id_data;
                let commission = "SELECT `commission` FROM `user_data` WHERE id_data = ?";
                conexion.query(commission, [idUser], function (error, result) {
                    if (error) {
                        throw error;
                    } else {
                        let com = result[0].commission;
                        let query = "SELECT * FROM `user_data` WHERE `commission` = ? AND `onGroup` = FALSE";
                        conexion.query(query, [com], function (error, students) {
                            if (error) {
                                throw error;
                            } else {
                                students.forEach(student => {
                                    student.birthdate = moment(student.birthdate).format('DD/MM/YYYY');
                                });
                                res.render('profesores', {
                                    email: email,
                                    users: students
                                });
                            }
                        });
                    }
                });
            } else {
                res.redirect(`/registro?email=${email}`);
            }
        }
    });
});

// registar grupo
app.post('/create-group', function(req, res) {
    const email = req.query.email;
    let { id_student1, id_student2, id_student3, id_student4, commission } = req.body;

    // Asegúrate de que los IDs de estudiantes no seleccionados sean NULL
    id_student1 = id_student1 || null;
    id_student2 = id_student2 || null;
    id_student3 = id_student3 || null;
    id_student4 = id_student4 || null;

    // Inserta el grupo de estudiantes en la base de datos
    let query = "INSERT INTO `student_groups`(`commission`, `id_student1`, `id_student2`, `id_student3`, `id_student4`) VALUES (?, ?, ?, ?, ?)";
    conexion.query(query, [commission, id_student1, id_student2, id_student3, id_student4], function(err, result) {
        if (err) {
            throw err;
        } else {
            // Filtra los estudiantes seleccionados (no NULL)
            const selectedStudents = [id_student1, id_student2, id_student3, id_student4].filter(id => id !== null);
            
            // Actualiza el estado `onGroup` de los estudiantes seleccionados
            if (selectedStudents.length > 0) {
                let updateQuery = "UPDATE `user_data` SET `onGroup` = true WHERE id_data IN (?)";
                conexion.query(updateQuery, [selectedStudents], function(err) {
                    if (err) {
                        throw err;
                    } else {
                        res.redirect(`/profesores?email=${email}`);
                    }
                });
            } else {
                res.redirect(`/profesores?email=${email}`);
            }
        }
    });
});


// configuración del puerto para el servidor
app.listen(3000, function () {
    console.log("El servidor está corriendo en http://localhost:3000");
});
