const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // inserir dados

    proffyValue = {
        name: "Vinicius Lopes",
        avatar: "https://scontent.fcgh3-1.fna.fbcdn.net/v/t1.0-9/80852352_1479826952184808_3610188967435042816_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_eui2=AeG73GYd1MwFcQGfAwzh4Oq8PCPDSN1dz2g8I8NI3V3PaFHt_TjB8uHGVLROQZt7p6zkLaoWBZPcxBe0sJnz2Ye6&_nc_ohc=2iXsUaHmTcgAX99853R&_nc_ht=scontent.fcgh3-1.fna&oh=c8ec8715d2bd9c0c27991ba4b0d243e9&oe=5F5330A6",
        whatsapp: "11966821775",
        bio: "Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: 1, 
        cost: "20" 
        //o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        // class_id virá pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN  classes on (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesAndProffys)

    // o horario que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horario do time_from (8H) precisa ser menor ou igual ao horario solicitado
    // o time_ precisa ser acima
    const SelectClassesSchedules = await db.all(`
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = 1
            AND  class_schedule.weekday = "0"
            AND class_schedule.time_from <= "1300"
            AND class_schedule.time_to > "1300"
    `)

    // console.log(SelectClassesSchedules)
})