const express = require("express");
const mysql = require("mysql");
const path = require('path');
const moment = require('moment');
const multer = require('multer');

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


//configurar multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
        const uniqueFileName = `${req.params.id}_${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

const upload = multer({ storage: storage });

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
                    let query = "SELECT * FROM `user_data` WHERE id_data = ?";
                    conexion.query(query, [idUser], function (error, result) {
                        if (error) throw error;
                        result[0].birthdate = moment(result[0].birthdate).format('DD/MM/YYYY');

                        res.render('perfil', { user: result[0], email: email });
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
app.get('/approveRequest/:id', function (req, res) {
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
app.get('/denyRequest/:id', function (req, res) {
    const requestId = req.params.id;

    const query = 'DELETE FROM access_requests WHERE id = ?';
    conexion.query(query, [requestId], function (err) {
        if (err) throw err;
        res.redirect('/admin');
    });
});

// aprobar solicitud de baja
app.get('/approveUnsubscribe/:id', function (req, res) {

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
    let valores = [nombre, apellido, comision, true];

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

// render profesores
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
app.post('/createGroup', function (req, res) {
    const email = req.query.email;
    let { id_student1, id_student2, id_student3, id_student4, commission } = req.body;

    id_student1 = id_student1 || null;
    id_student2 = id_student2 || null;
    id_student3 = id_student3 || null;
    id_student4 = id_student4 || null;

    let query = "INSERT INTO `student_groups`(`commission`, `id_student1`, `id_student2`, `id_student3`, `id_student4`) VALUES (?, ?, ?, ?, ?)";
    conexion.query(query, [commission, id_student1, id_student2, id_student3, id_student4], function (err, result) {
        if (err) {
            throw err;
        } else {

            const selectedStudents = [id_student1, id_student2, id_student3, id_student4].filter(id => id !== null);

            if (selectedStudents.length > 0) {
                let updateQuery = "UPDATE `user_data` SET `onGroup` = true WHERE id_data IN (?)";
                conexion.query(updateQuery, [selectedStudents], function (err) {
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

//render grupos
app.get('/alumnos', (req, res) => {
    const query = `
        SELECT sg.*, 
               ud1.name as student1_name, ud1.surname as student1_surname, ud1.photo as student1_photo,
               ud2.name as student2_name, ud2.surname as student2_surname, ud2.photo as student2_photo,
               ud3.name as student3_name, ud3.surname as student3_surname, ud3.photo as student3_photo,
               ud4.name as student4_name, ud4.surname as student4_surname, ud4.photo as student4_photo
        FROM student_groups sg
        LEFT JOIN user_data ud1 ON sg.id_student1 = ud1.id_data
        LEFT JOIN user_data ud2 ON sg.id_student2 = ud2.id_data
        LEFT JOIN user_data ud3 ON sg.id_student3 = ud3.id_data
        LEFT JOIN user_data ud4 ON sg.id_student4 = ud4.id_data
    `;

    conexion.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.render('alumnos', { studentGroups: results });
    });
});

// render editar perfil
app.get('/editPerfil/:id', function (req, res) {
    const requestId = req.params.id;

    let search = "SELECT * FROM `user` WHERE `id_data`=?";
    conexion.query(search, [requestId], function (error, rows) {
        if (error) {
            throw error;
        } else {
            let query = "SELECT * FROM `user_data` WHERE id_data = ?";
            conexion.query(query, [requestId], function (error, result) {
                if (error) throw error;
                result[0].birthdate = moment(result[0].birthdate).format('YYYY-MM-DD');

                res.render('editPerfil', { userData: result[0], user: rows[0] });
            });
        }
    });
});

// Ruta para actualizar datos del perfil y cambiar imagen de perfil
app.post('/updatePerfil/:id', upload.single('fotoPerfil'), function (req, res) {
    const requestId = req.params.id;
    const { nombre, apellido, nacimiento, estudios, comision, password } = req.body;
    const email = req.body.email;

    let picName = "SELECT `photo` FROM `user_data` WHERE `id_data` = ?";
    conexion.query(picName, [requestId], function (error, rows) {
        if (error) {
            throw error;
        } else {
            let photo = rows[0].photo;

            let updateData = "UPDATE `user_data` SET `name`=?, `surname`=?, `birthdate`=?, `schooling`=?, `commission`=? WHERE `id_data`=?";
            let valores = [nombre, apellido, nacimiento, estudios, comision, requestId];

            conexion.query(updateData, valores, function (error) {
                if (error) {
                    throw error;
                } else {
                    let updateValues = [];

                    if (req.file) {
                        // Si se subió una nueva imagen
                        updateValues.push(req.file.filename);
                    } else {
                        // Si no se subió ninguna imagen, usar la imagen predeterminada
                        updateValues.push(photo);
                    }

                    updateValues.push(requestId);

                    let updatePhoto = "UPDATE `user_data` SET `photo`=? WHERE `id_data`=?";
                    conexion.query(updatePhoto, updateValues, function (error) {
                        if (error) {
                            throw error;
                        }
                        console.log('Foto de perfil actualizada en la base de datos');
                    });

                    let updatePassword = "UPDATE `user` SET `pass`=? WHERE `id_data`=?";
                    conexion.query(updatePassword, [password, requestId], function (error) {
                        if (error) {
                            throw error;
                        } else {
                            res.redirect(`/perfil?email=${email}`);
                        }
                    });
                }
            });
        }
    });

});

// render mi grupo
app.get('/myGroup', (req, res) => {
    const email = req.query.email;

    const queryIdData = 'SELECT `id_data` FROM `user` WHERE email = ?';
    conexion.query(queryIdData, [email], (err, result) => {
        if (err) {
            throw err;
        }

        const idData = result[0]?.id_data;
        if (!idData) {
            return res.redirect(`/registro?email=${email}`);
        }
        const queryOnGroup = 'SELECT `onGroup` FROM `user_data` WHERE `id_data` = ?';
        conexion.query(queryOnGroup, [idData], (err, result) => {
            if (err) {
                throw err;
            }

            const onGroup = result[0]?.onGroup;
            if (!onGroup) {
                res.send(`<script>alert('No se encuentra en un grupo'); window.location.href='/index.html';</script>`);
                return;
            }

            const queryGroup = `
                SELECT sg.*, 
                       ud1.name as student1_name, ud1.surname as student1_surname, ud1.photo as student1_photo,
                       ud2.name as student2_name, ud2.surname as student2_surname, ud2.photo as student2_photo,
                       ud3.name as student3_name, ud3.surname as student3_surname, ud3.photo as student3_photo,
                       ud4.name as student4_name, ud4.surname as student4_surname, ud4.photo as student4_photo
                FROM student_groups sg
                LEFT JOIN user_data ud1 ON sg.id_student1 = ud1.id_data
                LEFT JOIN user_data ud2 ON sg.id_student2 = ud2.id_data
                LEFT JOIN user_data ud3 ON sg.id_student3 = ud3.id_data
                LEFT JOIN user_data ud4 ON sg.id_student4 = ud4.id_data
                WHERE sg.id_student1 = ? OR sg.id_student2 = ? OR sg.id_student3 = ? OR sg.id_student4 = ?;
            `;
            conexion.query(queryGroup, [idData, idData, idData, idData], (err, results) => {
                if (err) {
                    throw err;
                }

                if (results.length === 0) {
                    res.send(`<script>alert('No se encontró un grupo asociado'); window.location.href='/index.html';</script>`);
                    return;
                }

                res.render('myGroup', { group: results[0], email: email });
            });
        });
    });
});

// actualizar datos del grupo
app.post('/updateGroup', (req, res) => {
    const { id_group, name_group, repos, info, email } = req.body;

    const queryUpdate = `UPDATE student_groups SET name_group = ?, repos = ?, info = ? WHERE id_group = ?`;
    conexion.query(queryUpdate, [name_group, repos, info, id_group], (err, result) => {
        if (err) {
            throw err;
        }

        res.redirect(`/myGroup?email=${email}`);
    });
});


// configuración del puerto para el servidor
app.listen(3000, function () {
    console.log("El servidor está corriendo en http://localhost:3000");
});
